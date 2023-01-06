import { SkeletonData, Spine } from '@pixi-spine/runtime-4.1';
import { Application, BitmapText } from 'pixi.js';
import { PropsWithChildren } from 'react';

export const enum ElementsReducerrTypes {
  UpdateSkeletons = 'updateSkeletons',
  UpdateBitmapFonts = 'updateBitmapFonts',
  AddAnimation = 'addAnimation',
  AddBitmapText = 'addBitmapText',
  SetCurrentElement = 'setCurrentElement',
}

export type UpdateSkeletonsPayload = ReadonlyArray<[string, SkeletonData]>;
export type UpdateBitmapFontsPayload = ReadonlyArray<string>;
export type AnimationPayload = [string, string];
export type BitmapTextPayload = [string, string];
export type CurrentElementPayload = [string, Spine] | BitmapText | null;

export interface UpdateSkeletonsAction {
  type: ElementsReducerrTypes.UpdateSkeletons;
  payload: UpdateSkeletonsPayload;
}

export interface UpdateBitmapFontsAction {
  type: ElementsReducerrTypes.UpdateBitmapFonts;
  payload: UpdateBitmapFontsPayload;
}

export interface AnimationAction {
  type: ElementsReducerrTypes.AddAnimation;
  payload: AnimationPayload;
  app: Application;
}

export interface BitmapTextAction {
  type: ElementsReducerrTypes.AddBitmapText;
  payload: BitmapTextPayload;
  app: Application;
}

export interface CurrentElementAction {
  type: ElementsReducerrTypes.SetCurrentElement;
  payload: CurrentElementPayload;
}

export type ElementsReducerAction =
  | UpdateSkeletonsAction
  | UpdateBitmapFontsAction
  | AnimationAction
  | BitmapTextAction
  | CurrentElementAction;

export interface ElementsReducerState {
  readonly skeletonList: Record<string, SkeletonData>;
  readonly animationsList: Record<string, Spine>;
  readonly bitmapFonts: ReadonlyArray<string>;
  readonly bitmapTexts: ReadonlyArray<BitmapText>;
  readonly currentElement: [string, Spine] | BitmapText | null;
}

export interface ElementsContextState extends ElementsReducerState {
  updateSkeletons(payload: UpdateSkeletonsPayload): void;
  updateBitmapFonts(payload: UpdateBitmapFontsPayload): void;
  addAnimation(payload: AnimationPayload): void;
  addBitmapText(payload: BitmapTextPayload): void;
  setCurrentElement(payload: CurrentElementPayload): void;
}

export type AppProviderProps = PropsWithChildren;
