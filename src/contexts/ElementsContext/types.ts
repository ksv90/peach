import { SkeletonData, Spine } from '@pixi-spine/runtime-4.1';
import { Application, BitmapText, Sprite, Text, Texture } from 'pixi.js';
import { PropsWithChildren } from 'react';

export const enum ElementsReducerTypes {
  AddAnimation = 'addAnimation',
  AddBitmapText = 'addBitmapText',
  AddText = 'addText',
  AddSprite = 'addSprite',
  SetCurrentElement = 'setCurrentElement',
}

export type AddAnimationPayload = [string, SkeletonData];
export type AddBitmapTextPayload = [string, string];
export type AddTextPayload = [string, string];
export type AddSpritePayload = [string, Texture];
export type CurrentElementPayload = Spine | Sprite | BitmapText | Text | null;

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

export interface AddSpriteAction {
  type: ElementsReducerTypes.AddSprite;
  payload: AddSpritePayload;
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
  | AddSpriteAction
  | CurrentElementAction;

export interface ElementsReducerState {
  readonly spineAnimations: Record<string, Spine>;
  readonly bitmapTexts: ReadonlyArray<BitmapText>;
  readonly texts: ReadonlyArray<Text>;
  readonly sprites: Record<string, Sprite>;
  readonly currentElement: Spine | Sprite | BitmapText | Text | null;
}

export interface ElementsContextState extends ElementsReducerState {
  addAnimation(payload: AddAnimationPayload): void;
  addBitmapText(payload: AddBitmapTextPayload): void;
  addText(payload: AddTextPayload): void;
  addSprite(payload: AddSpritePayload): void;
  setCurrentElement(payload: CurrentElementPayload): void;
}

export type AppProviderProps = PropsWithChildren;
