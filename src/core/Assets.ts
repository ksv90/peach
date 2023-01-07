import { TextureAtlas } from '@pixi-spine/base';
import { AtlasAttachmentLoader, SkeletonData, SkeletonJson } from '@pixi-spine/runtime-4.1';
import { BaseTexture, BitmapFont, Texture, XMLFormat } from 'pixi.js';
import { getBaseName, makeAtlasName } from '../utils';

export const enum ParserType {
  ApplicationXHTML_XML = 'application/xhtml+xml',
  ApplicationXML = 'application/xml',
  ImageSVG_XML = 'image/svg+xml',
  TextHTML = 'text/html',
  TextXML = 'text/xml',
}

const PARSER = new DOMParser();

type AssetsSkeletons = ReadonlyArray<[string, SkeletonData]>;
type AssetsTextures = ReadonlyArray<[string, Texture]>;
type AssetsBitmapFonts = ReadonlyArray<string>;
type AssetsWebFonts = ReadonlyArray<string>;

type AssetsCache = {
  readonly skeletons: AssetsSkeletons;
  readonly textures: AssetsTextures;
  readonly bitmapFonts: AssetsBitmapFonts;
  readonly webFont: AssetsWebFonts;
};

//! Конструктор BaseTexture выполняет работу с imageURL асинхронно, поэтому нужна обертка для удаления
async function createBaseTexture(blob: Blob): Promise<BaseTexture> {
  const imageURL = URL.createObjectURL(blob);
  return new Promise<BaseTexture>((resolve) => resolve(new BaseTexture(imageURL))).finally(() =>
    URL.revokeObjectURL(imageURL),
  );
}

export default class Assets {
  private textureData: Record<string, { readonly texture: BaseTexture; inUse?: boolean }> = {};

  private atlasData: Record<string, string> = {};

  private jsonData: Record<string, Record<string, unknown>> = {};

  private xmlData: Record<string, Document> = {};

  private fontData: Array<string> = [];

  private cache: AssetsCache = { skeletons: [], textures: [], bitmapFonts: [], webFont: [] };

  public async setTexture(name: string, response: Response) {
    if (this.textureData[name]) return;
    try {
      const texture = await createBaseTexture(await response.blob());
      this.textureData[name] = { texture };
    } catch (err) {
      new Error(`File ${name} cannot be read as texture`);
    }
  }

  public async setAtlas(name: string, response: Response) {
    if (this.atlasData[name]) return;
    try {
      const atlas = await response.text();
      this.atlasData[name] = atlas;
    } catch (err) {
      new Error(`File ${name} cannot be read as atlas`);
    }
  }

  public async setJson(name: string, response: Response) {
    if (this.jsonData[name]) return;
    try {
      const json = await response.json();
      this.jsonData[name] = json;
    } catch (err) {
      new Error(`File ${name} cannot be read as json`);
    }
  }

  public async setXml(name: string, response: Response) {
    if (this.xmlData[name]) return;
    try {
      const xml = Assets.parse(await response.text(), ParserType.TextXML);
      this.xmlData[name] = xml;
    } catch (err) {
      new Error(`File ${name} cannot be read as xml`);
    }
  }

  public async setFont(name: string, response: Response, descriptors?: FontFaceDescriptors) {
    const font = getBaseName(name);
    if (this.fontData.includes(font)) return;
    try {
      const fontFace = new FontFace(font, await response.arrayBuffer(), descriptors);
      document.fonts.add(fontFace);
      this.fontData.push(font);
    } catch (err) {
      new Error(`File ${name} cannot be read as font`);
    }
  }

  public getSkeletonDatas(): AssetsSkeletons {
    return this.cache.skeletons;
  }

  public getTextures(): AssetsTextures {
    return this.cache.textures;
  }

  public getBitmapFonts(): AssetsBitmapFonts {
    return this.cache.bitmapFonts;
  }

  public getWebFont(): AssetsWebFonts {
    return this.cache.webFont;
  }

  public updateCache(): void {
    this.cache = {
      skeletons: this.createSkeletonDatas(),
      bitmapFonts: this.createBitmapFonts(),
      textures: this.createTextures(),
      webFont: this.createWebFont(),
    };
  }

  private createSkeletonDatas(): AssetsSkeletons {
    return Object.entries(this.jsonData)
      .filter(([, jsonData]) => 'skeleton' in jsonData)
      .map(([name, jsonData]) => {
        const atlas = this.atlasData[makeAtlasName(name)];
        const textureAtlas = new TextureAtlas(atlas, (textureName, loader) => {
          const assetsTexture = this.textureData[textureName];
          if (!assetsTexture) throw new Error(`Texture ${textureName} not loaded`);
          assetsTexture.inUse = true;
          loader(assetsTexture.texture);
        });
        const atlasAttachmentLoader = new AtlasAttachmentLoader(textureAtlas);
        const skeletonJson = new SkeletonJson(atlasAttachmentLoader);
        const skeletonData = skeletonJson.readSkeletonData(jsonData);
        return [getBaseName(name), skeletonData];
      });
  }

  private createTextures(): AssetsTextures {
    return Object.entries(this.textureData)
      .filter(([, assetsTexture]) => !assetsTexture.inUse)
      .map(([name, assetsTexture]) => [getBaseName(name), new Texture(assetsTexture.texture)]);
  }

  private createBitmapFonts(): AssetsBitmapFonts {
    return Object.values(this.xmlData)
      .filter((xml) => XMLFormat.test(xml))
      .map((xml) => {
        const bitmapFontData = XMLFormat.parse(xml);
        const textures = bitmapFontData.page.reduce<Record<string, Texture>>((acc, { file }) => {
          const assetsTexture = this.textureData[file];
          if (!assetsTexture) throw new Error(`Texture ${file} is not defined`);
          assetsTexture.inUse = true;
          const texture = new Texture(assetsTexture.texture);
          return { ...acc, [file]: texture };
        }, {});
        const { font } = BitmapFont.install(bitmapFontData, textures);
        return font;
      });
  }

  private createWebFont(): AssetsWebFonts {
    return [...this.fontData];
  }

  static parse(text: string, type: DOMParserSupportedType): Document {
    return PARSER.parseFromString(text, type);
  }
}
