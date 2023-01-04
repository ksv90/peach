import { TextureAtlas } from '@pixi-spine/base';
import { AtlasAttachmentLoader, SkeletonData, SkeletonJson } from '@pixi-spine/runtime-4.1';
import { BaseTexture } from 'pixi.js';

const JSON_TYPES = ['application/json'];
const IMAGES_TYPES = ['image/png', 'image/jpg'];

const JSON = 'json';
const ATLAS = 'atlas';
const IMAGE = 'image';

export type AssetsFile = typeof JSON | typeof ATLAS | typeof IMAGE;

type AssetsSplitFiles = Record<AssetsFile, Array<File>>;

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

async function loadTexture(obj: File | Blob): Promise<BaseTexture> {
  const objectURL = URL.createObjectURL(obj);
  const textureLoader = BaseTexture.from(objectURL);
  try {
    return await new Promise<BaseTexture>((resolve, reject) => {
      textureLoader.addListener('loaded', () => resolve(textureLoader));
      textureLoader.addListener('error', (error: unknown) => reject(error));
    });
  } catch {
    throw new Error(`Texture ${obj} not loader`);
  } finally {
    URL.revokeObjectURL(objectURL);
  }
}

function makeAtlasName(name: string) {
  return name.split('.').slice(0, -1).concat(ATLAS).join('.');
}

function getExtension(name: string): string {
  return name.split('.').at(-1) ?? '';
}

function isAtlas(name: string) {
  return getExtension(name) === ATLAS;
}

export default class Assets {
  private cache: Array<string> = [];

  private loadingQueue: Record<string, File> = {};

  private textureData: Record<string, BaseTexture> = {};

  private atlasData: Record<string, string> = {};

  private jsonData: Record<string, Record<string, unknown>> = {};

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

    await Promise.all([...imageQueue, ...atlasQueue, ...jsonQueue]);
  }

  public async setTexture(name: string, response: Response) {
    if (this.textureData[name]) return;
    try {
      const texture = await loadTexture(await response.blob());
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

  public async loadQueue(): Promise<ReadonlyArray<[string, Response]>> {
    const queue = Object.entries(this.loadingQueue)
      .filter(([name]) => !this.cache.includes(name))
      .map<Promise<[string, Response]>>(async ([name, file]) => [name, await loadFile(file)]);
    this.loadingQueue = {};
    return Promise.all(queue);
  }

  public getSkeletons(entities: Array<string>): ReadonlyArray<[string, SkeletonData]> {
    return entities
      .filter((name) => {
        const jsonData = this.jsonData[name];
        return jsonData && 'skeleton' in jsonData;
      })
      .map((name) => {
        const atlas = this.atlasData[makeAtlasName(name)];
        const textureAtlas = new TextureAtlas(atlas, (textureName, loader) => {
          const texture = this.textureData[textureName];
          if (!texture) throw new Error(`Texture ${textureName} not loaded`);
          loader(texture);
        });
        const atlasAttachmentLoader = new AtlasAttachmentLoader(textureAtlas);
        const skeletonJson = new SkeletonJson(atlasAttachmentLoader);
        const skeletonData = skeletonJson.readSkeletonData(this.jsonData[name]);
        return [name, skeletonData];
      });
  }

  private splitFiles(fileList: FileList): AssetsSplitFiles {
    return [...fileList].reduce<AssetsSplitFiles>(
      (files, curr) => {
        if (JSON_TYPES.includes(curr.type)) files.json.push(curr);
        else if (IMAGES_TYPES.includes(curr.type)) files.image.push(curr);
        else {
          if (isAtlas(curr.name)) files.atlas.push(curr);
          else console.warn(`Unknown file type ${curr.name}`);
        }
        return files;
      },
      { json: [], atlas: [], image: [] },
    );
  }
}
