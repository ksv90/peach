import { TextureAtlas } from '@pixi-spine/base';
import { AtlasAttachmentLoader, SkeletonData, SkeletonJson } from '@pixi-spine/runtime-4.1';
import { BaseTexture, BitmapFont, Texture, XMLFormat } from 'pixi.js';

const JSON_TYPES = ['application/json'];
const IMAGES_TYPES = ['image/png', 'image/jpg'];
const XML_TYPES = ['text/xml', 'application/xml'];
const FONT_TYPES = ['font/ttf'];

const ATLAS = 'atlas';
const FNT = 'fnt';
const PARSER = new DOMParser();

type AssetsFile = 'json' | 'image' | 'xml' | 'atlas' | 'font';

type AssetsGroups = Record<AssetsFile, Array<File>>;

async function loadFile(file: File): Promise<Response> {
  const objectURL = URL.createObjectURL(file);
  try {
    return await fetch(objectURL);
  } catch {
    throw new Error(`The file ${file.name} is not uploaded`);
  } finally {
    URL.revokeObjectURL(objectURL);
  }
}

//! Конструктор BaseTexture выполняет работу с imageURL асинхронно, поэтому нужна обертка для удаления
async function createBaseTexture(blob: Blob): Promise<BaseTexture> {
  const imageURL = URL.createObjectURL(blob);
  return new Promise<BaseTexture>((resolve) => resolve(new BaseTexture(imageURL))).finally(() =>
    URL.revokeObjectURL(imageURL),
  );
}

function getBaseName(name: string): string {
  return name.split('.').slice(0, -1).join('.');
}

function makeExtension(name: string) {
  return '.'.concat(name);
}

function makeAtlasName(name: string): string {
  return getBaseName(name).concat(makeExtension(ATLAS));
}

function getExtension(name: string): string {
  return name.split('.').at(-1) ?? '';
}

function isAtlas(name: string): boolean {
  return getExtension(name) === ATLAS;
}

function isXml(name: string): boolean {
  return getExtension(name) === FNT;
}

export default class Assets {
  private cache: Array<string> = [];

  private loadingQueue: Record<string, File> = {};

  private textureData: Record<string, BaseTexture> = {};

  private atlasData: Record<string, string> = {};

  private jsonData: Record<string, Record<string, unknown>> = {};

  private xmlData: Record<string, Document> = {};

  private fontData: Record<string, FontFace> = {};

  public addToUpload(file: File) {
    this.loadingQueue[file.name] = file;
  }

  public async loadFiles(fileList: FileList): Promise<void> {
    const splitFiles = this.splitFiles(fileList);

    Object.values(splitFiles)
      .flat()
      .forEach((file) => this.addToUpload(file));

    const responseFiles = await this.loadQueue();

    const imageQueue = splitFiles.image.map(({ name }) => {
      if (this.cache.includes(name)) return;
      const response = responseFiles.find(([responseName]) => responseName === name);
      if (!response) throw new Error(`Response ${name} is not defined`);
      return this.setTexture(...response);
    });

    const atlasQueue = splitFiles.atlas.map(({ name }) => {
      if (this.cache.includes(name)) return;
      const response = responseFiles.find(([responseName]) => responseName === name);
      if (!response) throw new Error(`Response ${name} is not defined`);
      return this.setAtlas(...response);
    });

    const jsonQueue = splitFiles.json.map(({ name }) => {
      if (this.cache.includes(name)) return;
      const response = responseFiles.find(([responseName]) => responseName === name);
      if (!response) throw new Error(`Response ${name} is not defined`);
      return this.setJson(...response);
    });

    const xmlQueue = splitFiles.xml.map(({ name }) => {
      if (this.cache.includes(name)) return;
      const response = responseFiles.find(([responseName]) => responseName === name);
      if (!response) throw new Error(`Response ${name} is not defined`);
      return this.setXml(...response);
    });

    const fontQueue = splitFiles.font.map(({ name }) => {
      if (this.cache.includes(name)) return;
      const response = responseFiles.find(([responseName]) => responseName === name);
      if (!response) throw new Error(`Response ${name} is not defined`);
      return this.setFont(...response);
    });

    await Promise.all([...imageQueue, ...atlasQueue, ...jsonQueue, ...xmlQueue, ...fontQueue]);
  }

  public async setTexture(name: string, response: Response) {
    if (this.textureData[name]) return;
    try {
      const texture = await createBaseTexture(await response.blob());
      this.textureData[name] = texture;
      this.cache.push(name);
    } catch (err) {
      new Error(`File ${name} cannot be read as image`);
    }
  }

  public async setAtlas(name: string, response: Response) {
    if (this.atlasData[name]) return;
    try {
      const atlas = await response.text();
      this.atlasData[name] = atlas;
      this.cache.push(name);
    } catch (err) {
      new Error(`File ${name} cannot be read as atlas`);
    }
  }

  public async setJson(name: string, response: Response) {
    if (this.jsonData[name]) return;
    try {
      const json = await response.json();
      this.jsonData[name] = json;
      this.cache.push(name);
    } catch (err) {
      new Error(`File ${name} cannot be read as json`);
    }
  }

  public async setXml(name: string, response: Response) {
    if (this.xmlData[name]) return;
    try {
      const text = await response.text();
      const xml = Assets.parseXML(text);
      this.xmlData[name] = xml;
      this.cache.push(name);
    } catch (err) {
      new Error(`File ${name} cannot be read as xml`);
    }
  }

  public async setFont(name: string, response: Response, descriptors?: FontFaceDescriptors) {
    if (this.fontData[name]) return;
    try {
      const font = new FontFace(getBaseName(name), await response.arrayBuffer(), descriptors);
      document.fonts.add(font);
      this.fontData[font.family] = font;
      this.cache.push(name);
    } catch (err) {
      new Error(`File ${name} cannot be read as font`);
    }
  }

  public async loadQueue(): Promise<ReadonlyArray<[string, Response]>> {
    const queue = Object.entries(this.loadingQueue)
      .filter(([name]) => !this.cache.includes(name))
      .map<Promise<[string, Response]>>(async ([name, file]) => [name, await loadFile(file)]);
    this.loadingQueue = {};
    return Promise.all(queue);
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
    return Object.keys(this.fontData);
  }

  public getAccept(): string {
    return Assets.accept.join(', ');
  }

  private splitFiles(fileList: FileList): AssetsGroups {
    return [...fileList].reduce<AssetsGroups>(
      (files, curr) => {
        if (JSON_TYPES.includes(curr.type)) files.json.push(curr);
        else if (IMAGES_TYPES.includes(curr.type)) files.image.push(curr);
        else if (XML_TYPES.includes(curr.type)) files.xml.push(curr);
        else if (FONT_TYPES.includes(curr.type)) files.font.push(curr);
        else {
          if (isAtlas(curr.name)) files.atlas.push(curr);
          else if (isXml(curr.name)) files.xml.push(curr);
          else console.warn(`Unknown file type ${curr.name}`);
        }
        return files;
      },
      { json: [], atlas: [], image: [], xml: [], font: [] },
    );
  }

  static accept = [
    ...JSON_TYPES,
    ...IMAGES_TYPES,
    ...XML_TYPES,
    ...FONT_TYPES,
    makeExtension(ATLAS),
    makeExtension(FNT),
  ];

  static parseXML(textXML: string, typeIndex = 0): Document {
    const type = XML_TYPES[typeIndex];
    if (!type) throw new Error(`ParseXML error: typeIndex ${typeIndex} does not exist`);
    return PARSER.parseFromString(textXML, type as DOMParserSupportedType);
  }
}
