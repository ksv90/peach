import { SkeletonData, Spine } from '@pixi-spine/runtime-4.1';
import { PropsWithChildren } from 'react';

export const enum ElementsReducerrTypes {
  AddSkeleton = 'addSkeleton',
  AddAnimation = 'addAnimation',
  SetSkeletonProps = 'setSkeletonProps',
  SetAnimationProps = 'setAnimationProps',
}

export type SkeletonPayload = [string, SkeletonData];
export type AnimationPayload = [string, string];
export type CurrentSkeletonPayload = string | null;
export type CurrentAnimationPayload = string | null;

export interface SkeletonAction {
  type: ElementsReducerrTypes.AddSkeleton;
  payload: SkeletonPayload;
}

export interface AnimationAction {
  type: ElementsReducerrTypes.AddAnimation;
  payload: AnimationPayload;
}

export interface CurrentSkeletonAction {
  type: ElementsReducerrTypes.SetSkeletonProps;
  payload: CurrentSkeletonPayload;
}

export interface CurrentAnimationAction {
  type: ElementsReducerrTypes.SetAnimationProps;
  payload: CurrentAnimationPayload;
}

export type ElementsReducerrAction =
  | SkeletonAction
  | CurrentSkeletonAction
  | AnimationAction
  | CurrentAnimationAction;

export interface ElementsReducerrState {
  readonly skeletonList: Record<string, SkeletonData>;
  readonly animationsList: Record<string, Spine>;
  readonly currentSkeleton: string | null;
  readonly currentAnimation: string | null;
}

export interface ElementsContextState extends ElementsReducerrState {
  addSkeleton(payload: SkeletonPayload): void;
  addAnimation(payload: AnimationPayload): void;
  setSkeletonProps(payload: CurrentSkeletonPayload): void;
  setAnimationProps(payload: CurrentAnimationPayload): void;
}

export type AppProviderProps = PropsWithChildren;
