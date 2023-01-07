import { TextureAtlas } from '@pixi-spine/base';
import { AtlasAttachmentLoader, SkeletonData, SkeletonJson } from '@pixi-spine/runtime-4.1';
import { BaseTexture, BitmapFont, Texture, XMLFormat } from 'pixi.js';
import { getBaseName, makeAtlasName } from './utils';

export const enum ParserType {
  ApplicationXHTML_XML = 'application/xhtml+xml',
  ApplicationXML = 'application/xml',
  ImageSVG_XML = 'image/svg+xml',
  TextHTML = 'text/html',
  TextXML = 'text/xml',
}

const PARSER = new DOMParser();

//! Конструктор BaseTexture выполняет работу с imageURL асинхронно, поэтому нужна обертка для удаления
async function createBaseTexture(blob: Blob): Promise<BaseTexture> {
  const imageURL = URL.createObjectURL(blob);
  return new Promise<BaseTexture>((resolve) => resolve(new BaseTexture(imageURL))).finally(() =>
    URL.revokeObjectURL(imageURL),
  );
}

export default class Assets {
  private textureData: Record<string, BaseTexture> = {};

  private atlasData: Record<string, string> = {};

  private jsonData: Record<string, Record<string, unknown>> = {};

  private xmlData: Record<string, Document> = {};

  private fontData: Array<string> = [];

  public async setTexture(name: string, response: Response) {
    if (this.textureData[name]) return;
    try {
      const texture = await createBaseTexture(await response.blob());
      this.textureData[name] = texture;
    } catch (err) {
      new Error(`File ${name} cannot be read as image`);
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
    const fontName = getBaseName(name);
    if (this.fontData.includes(fontName)) return;
    try {
      const font = new FontFace(fontName, await response.arrayBuffer(), descriptors);
      document.fonts.add(font);
      this.fontData.push(fontName);
    } catch (err) {
      new Error(`File ${name} cannot be read as font`);
    }
  }

  public getSkeletonDatas(): ReadonlyArray<[string, SkeletonData]> {
    return Object.entries(this.jsonData)
      .filter(([, jsonData]) => 'skeleton' in jsonData)
      .map(([name, jsonData]) => {
        const atlas = this.atlasData[makeAtlasName(name)];
        const textureAtlas = new TextureAtlas(atlas, (textureName, loader) => {
          const texture = this.textureData[textureName];
          if (!texture) throw new Error(`Texture ${textureName} not loaded`);
          loader(texture);
        });
        const atlasAttachmentLoader = new AtlasAttachmentLoader(textureAtlas);
        const skeletonJson = new SkeletonJson(atlasAttachmentLoader);
        const skeletonData = skeletonJson.readSkeletonData(jsonData);
        return [getBaseName(name), skeletonData];
      });
  }

  public getBitmapFontsNames(): ReadonlyArray<string> {
    return Object.values(this.xmlData)
      .filter((xml) => XMLFormat.test(xml))
      .map((xml) => {
        const bitmapFontData = XMLFormat.parse(xml);
        const textures = bitmapFontData.page.reduce<Record<string, Texture>>((acc, { file }) => {
          const baseTexture = this.textureData[file];
          if (!baseTexture) throw new Error(`Texture ${file} is not defined`);
          const texture = new Texture(baseTexture);
          return { ...acc, [file]: texture };
        }, {});
        const { font } = BitmapFont.install(bitmapFontData, textures);
        return font;
      });
  }

  public getWebFontNames(): ReadonlyArray<string> {
    return [...this.fontData];
  }

  static parse(text: string, type: DOMParserSupportedType): Document {
    return PARSER.parseFromString(text, type);
  }
}
