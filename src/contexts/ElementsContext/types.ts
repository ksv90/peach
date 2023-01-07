import { SkeletonData, Spine } from '@pixi-spine/runtime-4.1';
import { Application, BitmapText, Text } from 'pixi.js';
import { PropsWithChildren } from 'react';

export const enum ElementsReducerTypes {
  AddAnimation = 'addAnimation',
  AddBitmapText = 'addBitmapText',
  AddText = 'addText',
  SetCurrentElement = 'setCurrentElement',
}

export type AddAnimationPayload = [string, SkeletonData];
export type AddBitmapTextPayload = [string, string];
export type AddTextPayload = [string, string];
export type CurrentElementPayload = [string, Spine] | BitmapText | Text | null;

export interface AddAnimationAction {
  type: ElementsReducerTypes.AddAnimation;
  payload: AddAnimationPayload;
  app: Application;
}

export interface AddBitmapTextAction {
  type: ElementsReducerTypes.AddBitmapText;
  payload: AddBitmapTextPayload;
  app: Application;
}

export interface AddTextAction {
  type: ElementsReducerTypes.AddText;
  payload: AddTextPayload;
  app: Application;
}

export interface CurrentElementAction {
  type: ElementsReducerTypes.SetCurrentElement;
  payload: CurrentElementPayload;
}

export type ElementsReducerAction =
  | AddAnimationAction
  | AddBitmapTextAction
  | AddTextAction
  | CurrentElementAction;

export interface ElementsReducerState {
  readonly spineAnimations: Record<string, Spine>;
  readonly bitmapTexts: ReadonlyArray<BitmapText>;
  readonly texts: ReadonlyArray<Text>;
  readonly currentElement: [string, Spine] | BitmapText | Text | null;
}

export interface ElementsContextState extends ElementsReducerState {
  addAnimation(payload: AddAnimationPayload): void;
  addBitmapText(payload: AddBitmapTextPayload): void;
  addText(payload: AddTextPayload): void;
  setCurrentElement(payload: CurrentElementPayload): void;
}

export type AppProviderProps = PropsWithChildren;
