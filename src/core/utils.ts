const ATLAS = 'atlas';
const FNT = 'fnt';

export async function loadFile(file: File): Promise<Response> {
  const objectURL = URL.createObjectURL(file);
  try {
    return await fetch(objectURL);
  } catch {
    throw new Error(`The file ${file.name} is not uploaded`);
  } finally {
    URL.revokeObjectURL(objectURL);
  }
}

function getExtension(name: string): string {
  return name.split('.').at(-1) ?? '';
}

export function isAtlas(name: string): boolean {
  return getExtension(name) === ATLAS;
}

export function isXml(name: string): boolean {
  return getExtension(name) === FNT;
}

export function getBaseName(name: string): string {
  return name.split('.').slice(0, -1).join('.');
}

export function makeExtension(name: string) {
  return '.'.concat(name);
}

export function makeAtlasExtension() {
  return makeExtension(ATLAS);
}

export function makeFntExtension() {
  return makeExtension(FNT);
}

export function makeAtlasName(name: string): string {
  return getBaseName(name).concat(makeAtlasExtension());
}

export function toFirstCapitalize<T extends string>(str: T): Capitalize<T> {
  return ((str.at(0)?.toUpperCase() ?? '') + str.slice(1)) as Capitalize<T>;
}

export type Concat<T extends ReadonlyArray<string>> = T extends [
  infer F extends string,
  ...infer R extends string[],
]
  ? `${F}${Concat<R>}`
  : '';

export function join<T extends ReadonlyArray<string>>(...strings: T): Concat<T> {
  return strings.join('') as Concat<T>;
}
