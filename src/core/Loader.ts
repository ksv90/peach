import {
  isAtlas,
  isSystemFile,
  isXml,
  join,
  loadFile,
  makeAtlasExtension,
  makeFntExtension,
  toFirstCapitalize,
} from '../utils';

const JSON_TYPES = ['application/json'];
const IMAGES_TYPES = ['image/png', 'image/jpg'];
const XML_TYPES = ['text/xml', 'application/xml'];
const FONT_TYPES = ['font/ttf'];

type LoaderFile = 'texture' | 'atlas' | 'json' | 'xml' | 'font';
type LoaderGroups = Record<LoaderFile, Array<File>>;
type LoaderResponses = ReadonlyArray<[string, Response]>;
type LoaderAssets = { updateCache(): void } & Record<
  `set${Capitalize<LoaderFile>}`,
  (name: string, response: Response) => Promise<void>
>;

export default class Loader {
  private cache: Array<string> = [];

  private loadingQueue: Record<string, File> = {};

  constructor(protected readonly assets: LoaderAssets) {}

  public addToUpload(...files: ReadonlyArray<File>) {
    files.forEach((file) => (this.loadingQueue[file.name] = file));
  }

  public async loadFiles(fileList: FileList): Promise<void> {
    const splitFiles = this.splitFiles(fileList);
    this.addToUpload(...Object.values(splitFiles).flat());
    const responseFiles = await this.loadQueue();
    const queue = Object.entries(splitFiles).map(([asset, files]) => {
      const method = join('set', toFirstCapitalize(asset as LoaderFile));
      return this.setAsset(files, responseFiles, method);
    });
    await Promise.all(queue);
    this.assets.updateCache();
  }

  public async loadQueue(): Promise<LoaderResponses> {
    const queue = Object.entries(this.loadingQueue)
      .filter(([name]) => !this.cache.includes(name))
      .map<Promise<[string, Response]>>(async ([name, file]) => [name, await loadFile(file)]);
    this.loadingQueue = {};
    return Promise.all(queue);
  }

  public getAccept(): string {
    return Loader.accept.join(',');
  }

  private splitFiles(fileList: FileList): LoaderGroups {
    return [...fileList].reduce<LoaderGroups>(
      (files, curr) => {
        if (JSON_TYPES.includes(curr.type)) files.json.push(curr);
        else if (IMAGES_TYPES.includes(curr.type)) files.texture.push(curr);
        else if (XML_TYPES.includes(curr.type)) files.xml.push(curr);
        else if (FONT_TYPES.includes(curr.type)) files.font.push(curr);
        else {
          if (isAtlas(curr.name)) files.atlas.push(curr);
          else if (isXml(curr.name)) files.xml.push(curr);
          else if (!isSystemFile(curr.name)) console.warn(`Unknown file type ${curr.name}`);
        }
        return files;
      },
      { json: [], atlas: [], texture: [], xml: [], font: [] },
    );
  }

  private async setAsset(
    files: ReadonlyArray<File>,
    responses: LoaderResponses,
    method: keyof LoaderAssets,
  ): Promise<void> {
    const queue = files
      .filter(({ name }) => !this.cache.includes(name))
      .map(({ name }) => {
        const response = responses.find(([responseName]) => responseName === name);
        if (!response) throw new Error(`Response ${name} is not defined`);
        this.cache.push(name);
        return this.assets[method](...response);
      });
    await Promise.all(queue);
  }

  static accept = [
    ...JSON_TYPES,
    ...IMAGES_TYPES,
    ...XML_TYPES,
    ...FONT_TYPES,
    makeAtlasExtension(),
    makeFntExtension(),
  ];
}
