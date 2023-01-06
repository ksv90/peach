import { SkeletonData, Spine } from '@pixi-spine/runtime-4.1';
import { Application, BitmapText } from 'pixi.js';
import { PropsWithChildren } from 'react';

export const enum ElementsReducerTypes {
  UpdateSkeletons = 'updateSkeletons',
  UpdateBitmapFonts = 'updateBitmapFonts',
  AddAnimation = 'addAnimation',
  AddBitmapText = 'addBitmapText',
  SetCurrentElement = 'setCurrentElement',
}

export type UpdateSkeletonsPayload = ReadonlyArray<[string, SkeletonData]>;
export type UpdateBitmapFontsPayload = ReadonlyArray<string>;
export type AddAnimationPayload = [string, string];
export type AddBitmapTextPayload = [string, string];
export type CurrentElementPayload = [string, Spine] | BitmapText | null;

export interface UpdateSkeletonsAction {
  type: ElementsReducerTypes.UpdateSkeletons;
  payload: UpdateSkeletonsPayload;
}

export interface UpdateBitmapFontsAction {
  type: ElementsReducerTypes.UpdateBitmapFonts;
  payload: UpdateBitmapFontsPayload;
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

export interface CurrentElementAction {
  type: ElementsReducerTypes.SetCurrentElement;
  payload: CurrentElementPayload;
}

export type ElementsReducerAction =
  | UpdateSkeletonsAction
  | UpdateBitmapFontsAction
  | AddAnimationAction
  | AddBitmapTextAction
  | CurrentElementAction;

export interface ElementsReducerState {
  readonly skeletons: Record<string, SkeletonData>;
  readonly spineAnimations: Record<string, Spine>;
  readonly bitmapFonts: ReadonlyArray<string>;
  readonly bitmapTexts: ReadonlyArray<BitmapText>;
  readonly currentElement: [string, Spine] | BitmapText | null;
}

export interface ElementsContextState extends ElementsReducerState {
  updateSkeletons(payload: UpdateSkeletonsPayload): void;
  updateBitmapFonts(payload: UpdateBitmapFontsPayload): void;
  addAnimation(payload: AddAnimationPayload): void;
  addBitmapText(payload: AddBitmapTextPayload): void;
  setCurrentElement(payload: CurrentElementPayload): void;
}

export type AppProviderProps = PropsWithChildren;
