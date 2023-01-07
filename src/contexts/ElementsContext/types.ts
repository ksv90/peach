import { SkeletonData, Spine } from '@pixi-spine/runtime-4.1';
import { Application, BitmapText, Text } from 'pixi.js';
import { PropsWithChildren } from 'react';

export const enum ElementsReducerTypes {
  UpdateSkeletons = 'updateSkeletons',
  UpdateBitmapFonts = 'updateBitmapFonts',
  UpdateWebfontFonts = 'updateWebfontFonts',
  AddAnimation = 'addAnimation',
  AddBitmapText = 'addBitmapText',
  AddText = 'addText',
  SetCurrentElement = 'setCurrentElement',
}

export type UpdateSkeletonsPayload = ReadonlyArray<[string, SkeletonData]>;
export type UpdateBitmapFontsPayload = ReadonlyArray<string>;
export type UpdateWebFontsPayload = ReadonlyArray<string>;
export type AddAnimationPayload = [string, string];
export type AddBitmapTextPayload = [string, string];
export type AddTextPayload = [string, string];
export type CurrentElementPayload = [string, Spine] | BitmapText | Text | null;

export interface UpdateSkeletonsAction {
  type: ElementsReducerTypes.UpdateSkeletons;
  payload: UpdateSkeletonsPayload;
}

export interface UpdateBitmapFontsAction {
  type: ElementsReducerTypes.UpdateBitmapFonts;
  payload: UpdateBitmapFontsPayload;
}

export interface UpdateWebFontsAction {
  type: ElementsReducerTypes.UpdateWebfontFonts;
  payload: UpdateWebFontsPayload;
}

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
  | UpdateSkeletonsAction
  | UpdateBitmapFontsAction
  | UpdateWebFontsAction
  | AddAnimationAction
  | AddBitmapTextAction
  | AddTextAction
  | CurrentElementAction;

export interface ElementsReducerState {
  readonly skeletons: Record<string, SkeletonData>;
  readonly spineAnimations: Record<string, Spine>;
  readonly bitmapFonts: ReadonlyArray<string>;
  readonly bitmapTexts: ReadonlyArray<BitmapText>;
  readonly webFonts: ReadonlyArray<string>;
  readonly texts: ReadonlyArray<Text>;
  readonly currentElement: [string, Spine] | BitmapText | Text | null;
}

export interface ElementsContextState extends ElementsReducerState {
  updateSkeletons(payload: UpdateSkeletonsPayload): void;
  updateBitmapFonts(payload: UpdateBitmapFontsPayload): void;
  updateWebFonts(payload: UpdateWebFontsPayload): void;
  addAnimation(payload: AddAnimationPayload): void;
  addBitmapText(payload: AddBitmapTextPayload): void;
  addText(payload: AddTextPayload): void;
  setCurrentElement(payload: CurrentElementPayload): void;
}

export type AppProviderProps = PropsWithChildren;
