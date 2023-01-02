import { TextureAtlas } from '@pixi-spine/base';
import { SpineParser } from '@pixi-spine/loader-4.1';
import {
  Animation,
  AtlasAttachmentLoader,
  EventTimeline,
  SkeletonData,
  SkeletonJson,
  Spine,
} from '@pixi-spine/runtime-4.1';
import {
  Application,
  BaseTexture,
  Container,
  Graphics,
  MaskSystem,
  Renderer,
  Text,
  TextStyle,
} from 'pixi.js';

SpineParser.registerLoaderPlugin();

export const createApplication = (width: number, height: number, backgroundColor?: number) =>
  new Application({ width, height, backgroundColor });

export const createText = (content: string | number, style?: Partial<TextStyle>) => {
  const text = new Text(content, { align: 'center', ...style });
  text.anchor.set(0.5, 0.5);
  text.scale.set(1, -1);
  return text;
};

export const splitFiles = (files: FileList): [File[], File[], File[]] => {
  const JSON_TYPE = 'application/json';
  const textureTypes = ['image/png', 'image/jpg'];
  return [...files].reduce<[File[], File[], File[]]>(
    ([json, atlas, img], file) => {
      if (textureTypes.includes(file.type)) return [json, atlas, [...img, file]];
      if (file.type === JSON_TYPE) return [[...json, file], atlas, img];
      return [json, [...atlas, file], img];
    },
    [[], [], []],
  );
};

export const loadFile = async (file: File): Promise<Response> => {
  const objectURL = URL.createObjectURL(file);
  try {
    return await fetch(objectURL);
  } catch {
    throw new Error(`The file ${file.name} is not uploaded`);
  } finally {
    URL.revokeObjectURL(objectURL);
  }
};

export const addTexture = async (file: File): Promise<BaseTexture> => {
  const objectURL = URL.createObjectURL(file);
  const textureLoader = BaseTexture.from(objectURL);
  try {
    return await new Promise<BaseTexture>((resolve, reject) => {
      textureLoader.addListener('loaded', () => resolve(textureLoader));
      textureLoader.addListener('error', (error: unknown) => reject(error));
    });
  } catch {
    throw new Error(`Texture ${file.name} not loader`);
  } finally {
    URL.revokeObjectURL(objectURL);
  }
};

export const createResponseMap = async (files: File[]): Promise<Map<string, Response>> => {
  const responses = await Promise.all(
    files.map(async (file): Promise<[string, Response]> => [file.name, await loadFile(file)]),
  );
  return new Map<string, Response>(responses);
};

export const createTextureMap = async (files: File[]): Promise<Map<string, BaseTexture>> => {
  const responses = await Promise.all(
    files.map(async (file): Promise<[string, BaseTexture]> => [file.name, await addTexture(file)]),
  );
  return new Map<string, BaseTexture>(responses);
};

export const getAtlas = async (fullname: string, map: Map<string, Response>): Promise<string> => {
  const [name] = fullname.split('.');
  const atlasName = `${name ?? ''}.atlas`;
  const atlasFileResponse = map.get(atlasName);
  if (!atlasFileResponse) throw new Error(`Atlas file ${atlasName} not found`);
  map.delete(atlasName);
  return atlasFileResponse.text();
};

export const getTextures = (path: string, map: Map<string, BaseTexture>): BaseTexture => {
  const texture = map.get(path);
  if (!texture) throw new Error(`Texture ${path} not found`);
  map.delete(path);
  return texture;
};

export const loadSpines = async (
  files: FileList | null,
): Promise<ReadonlyArray<[string, SkeletonData]>> => {
  if (!files) throw new Error('Files are not selected');
  const [jsonFiles, atlasFiles, textureFiles] = splitFiles(files);

  if (!jsonFiles.length) throw new Error('json file not found');
  if (!atlasFiles.length) throw new Error('atlas file not found');
  if (!textureFiles.length) throw new Error('image file not found');

  const [jsonMap, atlasMap, textureMap] = await Promise.all([
    createResponseMap(jsonFiles),
    createResponseMap(atlasFiles),
    createTextureMap(textureFiles),
  ]);

  return Promise.all(
    [...jsonMap.entries()].map(async ([fullname, response]) => {
      const [name = ''] = fullname.split('.');
      const atlas = await getAtlas(name, atlasMap);
      const json = (await response.json()) as unknown;

      const textureAtlas = new TextureAtlas(atlas, (path, loader) => {
        loader(getTextures(path, textureMap));
      });

      const atlasAttachmentLoader = new AtlasAttachmentLoader(textureAtlas);
      const skeletonJson = new SkeletonJson(atlasAttachmentLoader);
      const spineData = skeletonJson.readSkeletonData(json);

      return [name, spineData];
    }),
  );
};

export const getSlotContainer = (spine: Spine, name: string): Container | undefined => {
  const index = spine.skeleton.findSlotIndex(name);
  return spine.slotContainers[index];
};

export const getTimeAnimationLabel = (animation: Animation, labelName: string) => {
  const eventTimeline = animation.timelines.find(
    (timeline): timeline is EventTimeline => timeline instanceof EventTimeline,
  );
  if (!eventTimeline) throw new Error(`Animation ${animation.name} has no labels`);
  const event = eventTimeline.events.find(({ data }) => data.name === labelName);
  if (!event) throw new Error(`Label ${labelName} not found`);
  return event.time;
};

const anim1 = '9_s2';
const anim2 = 'a_s2';

export const createParallel = (spine: Spine) => {
  spine.state.setAnimation(0, anim1, true);
  setTimeout(() => {
    spine.stateData.setMix(anim1, anim2, 0.2);
    spine.state.setAnimation(0, anim2, false);
    spine.state.addAnimation(0, anim2, true);
  }, 1000);
};

type RectangleProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  color?: number;
};

const createRectangle = ({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  color = 0x000000,
}: RectangleProps): Container => {
  const rectangle = new Graphics();
  rectangle.beginFill(color);
  rectangle.drawRect(x, y, width, height);
  return rectangle;
};

export const createSquare = (app: Application): void => {
  if (!(app.renderer instanceof Renderer)) return;
  const ms = new MaskSystem(app.renderer);
  const reelProps: RectangleProps = { x: 80, y: 100, width: 900, height: 500, color: 0xffff00 };
  const maskProps: RectangleProps = { y: 0, width: 100, height: 500, color: 0x555555 };
  const rectangle = createRectangle(reelProps);
  const mask1 = createRectangle({ ...maskProps, x: 200 });
  // rectangle.mask = mask1;
  // ms.setMaskStack([mask1]);
  ms.push(rectangle, mask1);
  app.stage.addChild(mask1, rectangle);
};
