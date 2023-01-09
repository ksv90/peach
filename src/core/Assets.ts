import { getBaseName, makeAtlasName, textStyleTest } from '@peach/utils';
import { TextureAtlas } from '@pixi-spine/base';
import { AtlasAttachmentLoader, SkeletonData, SkeletonJson } from '@pixi-spine/runtime-4.1';
import { BaseTexture, BitmapFont, TextStyle, Texture, XMLFormat } from 'pixi.js';

export const enum ParserType {
  ApplicationXHTML_XML = 'application/xhtml+xml',
  ApplicationXML = 'application/xml',
  ImageSVG_XML = 'image/svg+xml',
  TextHTML = 'text/html',
  TextXML = 'text/xml',
}

const PARSER = new DOMParser();

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

type TextureData = Record<string, { readonly texture: BaseTexture; inUse?: boolean }>;
type AtlasData = Record<string, string>;
type JsonData = Record<string, { json: Record<string, unknown>; inUse?: boolean }>;
type XmlData = Record<string, Document>;
type FontData = Array<string>;

//! Конструктор BaseTexture выполняет работу с imageURL асинхронно, поэтому нужна обертка для удаления
async function createBaseTexture(blob: Blob): Promise<BaseTexture> {
  const imageURL = URL.createObjectURL(blob);
  return new Promise<BaseTexture>((resolve) => resolve(new BaseTexture(imageURL))).finally(() =>
    URL.revokeObjectURL(imageURL),
  );
}

export default class Assets {
  private textureData: TextureData = {};

  private atlasData: AtlasData = {};

  private jsonData: JsonData = {};

  private xmlData: XmlData = {};

  private fontData: FontData = [];

  private cache: AssetsCache = {
    skeletons: [],
    textStyle: [],
    textures: [],
    bitmapFonts: [],
    webFonts: [],
  };

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
      this.jsonData[name] = { json };
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

  public updateCache(): void {
    this.cache = {
      skeletons: this.createSkeletonDatas(),
      bitmapFonts: this.createBitmapFonts(),
      textures: this.createTextures(),
      webFonts: this.createWebFonts(),
      textStyle: this.createTextStyles(),
    };
  }

  private createSkeletonDatas(): AssetsSkeletons {
    return Object.entries(this.jsonData)
      .filter(([, assetsJson]) => 'skeleton' in assetsJson.json)
      .map(([name, assetsJson]) => {
        const atlas = this.atlasData[makeAtlasName(name)];
        const textureAtlas = new TextureAtlas(atlas, (textureName, loader) => {
          const assetsTexture = this.textureData[textureName];
          if (!assetsTexture) throw new Error(`Texture ${textureName} not loaded`);
          assetsTexture.inUse = true;
          loader(assetsTexture.texture);
        });
        const atlasAttachmentLoader = new AtlasAttachmentLoader(textureAtlas);
        const skeletonJson = new SkeletonJson(atlasAttachmentLoader);
        const skeletonData = skeletonJson.readSkeletonData(assetsJson.json);
        assetsJson.inUse = true;
        return [getBaseName(name), skeletonData];
      });
  }

  private createTextStyles(): AssetsTextStyles {
    return Object.entries(this.jsonData)
      .filter(([, assetsJson]) => !assetsJson.inUse && textStyleTest(assetsJson.json))
      .map(([name, assetsJson]) => [getBaseName(name), new TextStyle(assetsJson.json)]);
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

  private createWebFonts(): AssetsWebFonts {
    return [...this.fontData];
  }

  static parse(text: string, type: DOMParserSupportedType): Document {
    return PARSER.parseFromString(text, type);
  }
}
