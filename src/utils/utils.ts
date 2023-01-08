import { Concat } from './type';

const enum Files {
  Dot = '.',
  Atlas = 'atlas',
  Fnt = 'fnt',
  Ini = 'ini',
}

export function getHalf(value: number) {
  return Math.round(value / 2);
}

function getExtension(name: string): string {
  return name.split(Files.Dot).at(-1) ?? '';
}

export function isAtlas(name: string): boolean {
  return getExtension(name) === Files.Atlas;
}

export function isXml(name: string): boolean {
  return getExtension(name) === Files.Fnt;
}

export function isSystemFile(name: string): boolean {
  return name.at(0) === Files.Dot || getExtension(name) === Files.Ini;
}

export function getBaseName(name: string): string {
  return name.split(Files.Dot).slice(0, -1).join(Files.Dot);
}

export function makeExtension(name: string) {
  return Files.Dot.concat(name);
}

export function makeAtlasExtension() {
  return makeExtension(Files.Atlas);
}

export function makeFntExtension() {
  return makeExtension(Files.Fnt);
}

export function makeAtlasName(name: string): string {
  return getBaseName(name).concat(makeAtlasExtension());
}

export function toFirstCapitalize<T extends string>(str: T): Capitalize<T> {
  return ((str.at(0)?.toUpperCase() ?? '') + str.slice(1)) as Capitalize<T>;
}

export function join<T extends ReadonlyArray<string>>(...strings: T): Concat<T> {
  return strings.join('') as Concat<T>;
}
