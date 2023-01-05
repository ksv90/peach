import { SkeletonData, Spine } from '@pixi-spine/runtime-4.1';
import { Application, BitmapText } from 'pixi.js';
import { PropsWithChildren } from 'react';

export const enum ElementsReducerrTypes {
  UpdateSkeletons = 'updateSkeletons',
  UpdateBitmapFonts = 'updateBitmapFonts',
  AddAnimation = 'addAnimation',
  AddBitmapText = 'addBitmapText',
  SetSkeletonProps = 'setSkeletonProps',
  SetAnimationProps = 'setAnimationProps',
  SetBitmapFontProps = 'setBitmapFontProps',
  SetBitmapTextProps = 'setBitmapTextProps',
}

export type UpdateSkeletonsPayload = ReadonlyArray<[string, SkeletonData]>;
export type UpdateBitmapFontsPayload = ReadonlyArray<string>;
export type AnimationPayload = [string, string];
export type BitmapTextPayload = [string, string];
export type CurrentSkeletonPayload = string | null;
export type CurrentAnimationPayload = string | null;
export type CurrentBitmapTextPayload = BitmapText | null;

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
}

export interface BitmapTextAction {
  type: ElementsReducerrTypes.AddBitmapText;
  payload: BitmapTextPayload;
  app: Application;
}

export interface CurrentSkeletonAction {
  type: ElementsReducerrTypes.SetSkeletonProps;
  payload: CurrentSkeletonPayload;
}

export interface CurrentAnimationAction {
  type: ElementsReducerrTypes.SetAnimationProps;
  payload: CurrentAnimationPayload;
}

export interface CurrentBitmapFontAction {
  type: ElementsReducerrTypes.SetBitmapFontProps;
  payload: string;
}

export interface CurrentBitmapTextAction {
  type: ElementsReducerrTypes.SetBitmapTextProps;
  payload: CurrentBitmapTextPayload;
}

export type ElementsReducerrAction =
  | UpdateSkeletonsAction
  | UpdateBitmapFontsAction
  | CurrentSkeletonAction
  | AnimationAction
  | BitmapTextAction
  | CurrentAnimationAction
  | CurrentBitmapFontAction
  | CurrentBitmapTextAction;

export interface ElementsReducerState {
  readonly skeletonList: Record<string, SkeletonData>;
  readonly animationsList: Record<string, Spine>;
  readonly bitmapFonts: ReadonlyArray<string>;
  readonly bitmapTexts: ReadonlyArray<BitmapText>;
  readonly currentBitmapFont: string | null;
  readonly currentSkeleton: string | null;
  readonly currentAnimation: string | null;
  readonly currentBitmapText: BitmapText | null;
}

export interface ElementsContextState extends ElementsReducerState {
  updateSkeletons(payload: UpdateSkeletonsPayload): void;
  updateBitmapFonts(payload: UpdateBitmapFontsPayload): void;
  addAnimation(payload: AnimationPayload): void;
  addBitmapText(payload: BitmapTextPayload): void;
  setSkeletonProps(payload: CurrentSkeletonPayload): void;
  setAnimationProps(payload: CurrentAnimationPayload): void;
  setBitmapFontProps(payload: string): void;
  setBitmapTextProps(payload: CurrentBitmapTextPayload): void;
}

export type AppProviderProps = PropsWithChildren;
