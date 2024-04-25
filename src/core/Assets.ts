import { getBaseName, getBasePath, makeExtension } from '@peach/utils';
import { TextureAtlas } from '@pixi-spine/base';
import { AtlasAttachmentLoader, SkeletonData, SkeletonJson } from '@pixi-spine/runtime-4.1';
import { BaseTexture, BitmapFont, TextStyle, Texture, XMLFormat } from 'pixi.js';

const ATLAS = 'atlas';

export type AssetsSkeletons = ReadonlyArray<[string, SkeletonData]>;
export type AssetsTextStyles = ReadonlyArray<[string, TextStyle]>;
export type AssetsTextures = ReadonlyArray<[string, Texture]>;
export type AssetsBitmapFonts = ReadonlyArray<string>;
export type AssetsWebFonts = ReadonlyArray<string>;

type AssetsCache = {
  readonly skeletons: AssetsSkeletons;
  readonly textures: AssetsTextures;
  readonly bitmapFonts: AssetsBitmapFonts;
  readonly webFonts: AssetsWebFonts;
  readonly textStyle: AssetsTextStyles;
};

const textStyleKeys = [
  'align',
  'dropShadow',
  'fill',
  'fillGradientStops',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'padding',
  'stroke',
];

function makeAtlasName(path: string): string {
  return getBasePath(path).concat(makeExtension(ATLAS));
}

function makeTextureName(path: string, name: string): string {
  return path.split('/').slice(0, -1).concat(name).join('/');
}

export function textStyleTest(json: Record<string, unknown>): boolean {
  return Object.keys(json).some((key) => textStyleKeys.includes(key));
}

interface LoaderInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
  readonly constructor: any & { readonly accept: ReadonlyArray<string> };
  loadFiles(fileList: FileList): Promise<void>;
  getJsons(): Record<string, Record<string, unknown>>;
  getTextures(): Record<string, BaseTexture>;
  getAtlases(): Record<string, string>;
  getXmls(): Record<string, XMLDocument>;
  getFonts(): Record<string, FontFace>;
}

export default class Assets {
  private cache: AssetsCache = {
    skeletons: [],
    textStyle: [],
    textures: [],
    bitmapFonts: [],
    webFonts: [],
  };

  private jsonSkeletonList = new Set<string>();

  private spineTextureList = new Set<string>();

  private bitmapTextureList = new Set<string>();

  constructor(private readonly loader: LoaderInterface) {}

  public async loadFiles(fileList: FileList): Promise<void> {
    await this.loader.loadFiles(fileList);
    await this.updateResources();
  }

  public async updateResources(): Promise<void> {
    this.jsonSkeletonList.clear();
    this.spineTextureList.clear();
    this.bitmapTextureList.clear();
    this.cache = {
      skeletons: await this.createSkeletonDatas(),
      bitmapFonts: this.createBitmapFonts(),
      textures: this.createTextures(),
      webFonts: this.createWebFonts(),
      textStyle: this.createTextStyles(),
    };
  }

  public getSkeletonDatas(): AssetsSkeletons {
    return this.cache.skeletons;
  }

  public getTextStyles(): AssetsTextStyles {
    return this.cache.textStyle;
  }

  public getTextures(): AssetsTextures {
    return this.cache.textures;
  }

  public getBitmapFonts(): AssetsBitmapFonts {
    return this.cache.bitmapFonts;
  }

  public getWebFonts(): AssetsWebFonts {
    return this.cache.webFonts;
  }

  private async createSkeletonDatas(): Promise<AssetsSkeletons> {
    const jsons = this.loader.getJsons();
    const textures = this.loader.getTextures();
    const atlases = this.loader.getAtlases();
    const queue = Object.entries(jsons)
      .filter(([, json]) => 'skeleton' in json && 'bones' in json)
      .map(
        ([path, json]) =>
          new Promise<[string, SkeletonData]>((resolve) => {
            this.jsonSkeletonList.add(path);
            const atlasName = makeAtlasName(path);
            new TextureAtlas().addSpineAtlas(
              atlases[atlasName] ?? '',
              (name, loaderFunction) => {
                const textureName = makeTextureName(path, name);
                this.spineTextureList.add(textureName);
                const baseTexture = textures[textureName];
                if (!baseTexture) throw new Error(`Texture ${name} not founf`);
                try {
                  loaderFunction(baseTexture);
                } catch (err) {
                  throw new Error(`Texture atlas ${name} error. ${String(err)}`);
                }
              },
              (textureAtlas) => {
                const atlasAttachmentLoader = new AtlasAttachmentLoader(textureAtlas);
                const skeletonJson = new SkeletonJson(atlasAttachmentLoader);
                resolve([getBaseName(path), skeletonJson.readSkeletonData(json)]);
              },
            );
          }),
      );
    return await Promise.all(queue);
  }

  private createTextStyles(): AssetsTextStyles {
    const jsons = this.loader.getJsons();
    return Object.entries(jsons)
      .filter(([path, json]) => !this.jsonSkeletonList.has(path) || !textStyleTest(json))
      .map(([name, json]) => [getBaseName(name), new TextStyle(json)]);
  }

  private createTextures(): AssetsTextures {
    const textures = this.loader.getTextures();
    return Object.entries(textures)
      .filter(([path]) => !this.spineTextureList.has(path) && !this.bitmapTextureList.has(path))
      .map(([path, texture]) => [getBaseName(path), new Texture(texture)]);
  }

  private createBitmapFonts(): AssetsBitmapFonts {
    const xmls = this.loader.getXmls();
    const baseTextures = this.loader.getTextures();
    return Object.entries(xmls)
      .filter(([, xml]) => XMLFormat.test(xml))
      .map(([path, xml]) => {
        const bitmapFontData = XMLFormat.parse(xml);
        const textures = bitmapFontData.page.reduce<Record<string, Texture>>((acc, { file }) => {
          const textureName = makeTextureName(path, file);
          this.bitmapTextureList.add(textureName);
          const assetsTexture = baseTextures[textureName];
          if (!assetsTexture) throw new Error(`Texture ${file} is not defined`);
          const texture = new Texture(assetsTexture);
          return { ...acc, [file]: texture };
        }, {});
        const { font } = BitmapFont.install(bitmapFontData, textures);
        return font;
      });
  }

  private createWebFonts(): AssetsWebFonts {
    const fonts = this.loader.getFonts();
    return Object.entries(fonts).map(([name, fontFace]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      if (!document.fonts.has(fontFace)) document.fonts.add(fontFace);
      return getBaseName(name);
    });
  }

  public getAccept(): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.loader.constructor.accept.join(',');
  }
}
