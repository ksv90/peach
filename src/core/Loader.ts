/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { getBaseName, getExtension, getFileName, loadFile, loadTexture, makeExtension } from '@peach/utils';
import { BaseTexture } from 'pixi.js';

const enum Ext {
  Atlas = 'atlas',
  Fnt = 'fnt',
  Ini = 'ini',
}

export const enum ParserType {
  ApplicationXHTML_XML = 'application/xhtml+xml',
  ApplicationXML = 'application/xml',
  ImageSVG_XML = 'image/svg+xml',
  TextHTML = 'text/html',
  TextXML = 'text/xml',
}

const PARSER = new DOMParser();

const JSON_TYPES = ['application/json'];
const IMAGES_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
const XML_TYPES = ['text/xml', 'application/xml'];
const FONT_TYPES = ['image/tiff', 'font/ttf', 'font/woff', 'font/woff2', 'font/otf'];

export type LoaderJsons = Record<string, Record<string, unknown>>;
export type LoaderTextures = Record<string, BaseTexture>;
export type LoaderAtlases = Record<string, string>;
export type LoaderXmls = Record<string, XMLDocument>;
export type LoaderFonts = Record<string, FontFace>;

type LoaderCache = {
  readonly jsons: LoaderJsons;
  readonly textures: LoaderTextures;
  readonly atlases: LoaderAtlases;
  readonly xmls: LoaderXmls;
  readonly fonts: LoaderFonts;
};

type LoaderFile = { type: string; name: string };

function isJsonFile({ type }: LoaderFile): boolean {
  return JSON_TYPES.includes(type);
}

function isImageFile({ type }: LoaderFile): boolean {
  return IMAGES_TYPES.includes(type);
}

function isAtlasFile({ name }: LoaderFile): boolean {
  return getExtension(name) === Ext.Atlas;
}

function isXmlFile({ type, name }: LoaderFile): boolean {
  return XML_TYPES.includes(type) || getExtension(name) === Ext.Fnt;
}

function isFontFile({ type }: LoaderFile): boolean {
  return FONT_TYPES.includes(type);
}

export function isSystemFile({ name }: LoaderFile): boolean {
  return name.at(0) === '.' || getExtension(name) === Ext.Ini;
}

export default class Loader {
  private cache: LoaderCache = { jsons: {}, textures: {}, atlases: {}, xmls: {}, fonts: {} };

  public async loadFiles(fileList: FileList): Promise<void> {
    const queue = new Array<Promise<void>>();
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (isJsonFile(file)) queue.push(this.loadJson(file));
      else if (isImageFile(file)) queue.push(this.loadTexture(file));
      else if (isXmlFile(file)) queue.push(this.loadXml(file));
      else if (isFontFile(file)) queue.push(this.loadFont(file));
      else if (isAtlasFile(file)) queue.push(this.loadAtlas(file));
      else if (!isSystemFile(file)) console.warn(`Unknown file type ${file.name}`);
    }
    await Promise.all(queue);
  }

  protected async loadJson(file: File): Promise<void> {
    const name = getFileName(file);
    if (this.cache.jsons[name]) return;
    const response = await loadFile(file);
    this.cache.jsons[name] = (await response.json()) as LoaderJsons;
  }

  protected async loadTexture(file: File): Promise<void> {
    const name = getFileName(file);
    if (this.cache.textures[name]) return;
    this.cache.textures[name] = await loadTexture(file);
  }

  protected async loadAtlas(file: File): Promise<void> {
    const name = getFileName(file);
    if (this.cache.atlases[name]) return;
    const response = await loadFile(file);
    this.cache.atlases[name] = await response.text();
  }

  protected async loadXml(file: File): Promise<void> {
    const name = getFileName(file);
    if (this.cache.xmls[name]) return;
    const response = await loadFile(file);
    const xml = Loader.parse(await response.text(), ParserType.TextXML);
    this.cache.xmls[name] = xml;
  }

  protected async loadFont(file: File, descriptors?: FontFaceDescriptors): Promise<void> {
    const name = getFileName(file);
    if (this.cache.fonts[name]) return;
    const font = getBaseName(file.name);
    const response = await loadFile(file);
    const fontFace = new FontFace(font, await response.arrayBuffer(), descriptors);
    this.cache.fonts[name] = fontFace;
  }

  public getJsons(): LoaderJsons {
    return this.cache.jsons;
  }

  public getTextures(): LoaderTextures {
    return this.cache.textures;
  }

  public getAtlases(): LoaderAtlases {
    return this.cache.atlases;
  }

  public getXmls(): LoaderXmls {
    return this.cache.xmls;
  }

  public getFonts(): LoaderFonts {
    return this.cache.fonts;
  }

  static parse(text: string, type: DOMParserSupportedType): Document {
    return PARSER.parseFromString(text, type);
  }

  static accept = [
    ...JSON_TYPES,
    ...IMAGES_TYPES,
    ...XML_TYPES,
    ...FONT_TYPES,
    makeExtension(Ext.Atlas),
    makeExtension(Ext.Fnt),
  ];
}
