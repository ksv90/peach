import { Concat } from './type';

export function getHalf(value: number) {
  return Math.round(value / 2);
}

export function getExtension(name: string): string {
  return name.split('.').at(-1) ?? '';
}

export function getBaseName(path: string): string {
  const name = path.split('/').at(-1) ?? '';
  return name.split('.').slice(0, -1).join('.');
}

export function getBasePath(path: string): string {
  return path.split('.').slice(0, -1).join('.');
}

export function makeExtension(name: string) {
  return '.'.concat(name);
}

export function toFirstCapitalize<T extends string>(str: T): Capitalize<T> {
  return ((str.at(0)?.toUpperCase() ?? '') + str.slice(1)) as Capitalize<T>;
}

export function join<T extends ReadonlyArray<string>>(...strings: T): Concat<T> {
  return strings.join('') as Concat<T>;
}
