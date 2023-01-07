import { Concat } from './type';

const enum Files {
  Atlas = 'atlas',
  Fnt = 'fnt',
}

export function getHalf(value: number) {
  return Math.round(value / 2);
}

function getExtension(name: string): string {
  return name.split('.').at(-1) ?? '';
}

export function isAtlas(name: string): boolean {
  return getExtension(name) === Files.Atlas;
}

export function isXml(name: string): boolean {
  return getExtension(name) === Files.Fnt;
}

export function getBaseName(name: string): string {
  return name.split('.').slice(0, -1).join('.');
}

export function makeExtension(name: string) {
  return '.'.concat(name);
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
