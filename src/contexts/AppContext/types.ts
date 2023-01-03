import { SkeletonData, Spine } from '@pixi-spine/runtime-4.1';
import { Application } from 'pixi.js';
import { PropsWithChildren } from 'react';

export const enum AppReducerTypes {
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
  type: AppReducerTypes.AddSkeleton;
  payload: SkeletonPayload;
}

export interface AnimationAction {
  type: AppReducerTypes.AddAnimation;
  payload: AnimationPayload;
}

export interface CurrentSkeletonAction {
  type: AppReducerTypes.SetSkeletonProps;
  payload: CurrentSkeletonPayload;
}

export interface CurrentAnimationAction {
  type: AppReducerTypes.SetAnimationProps;
  payload: CurrentAnimationPayload;
}

export type AppReducerAction =
  | SkeletonAction
  | CurrentSkeletonAction
  | AnimationAction
  | CurrentAnimationAction;

export interface AppReducerState {
  app: Application;
  skeletonList: Record<string, SkeletonData>;
  animationsList: Record<string, Spine>;
  currentSkeleton: string | null;
  currentAnimation: string | null;
}

export interface AppContextState extends AppReducerState {
  addSkeleton(payload: SkeletonPayload): void;
  addAnimation(payload: AnimationPayload): void;
  showSkeletonProps(payload: CurrentSkeletonPayload): void;
  showAnimationProps(payload: CurrentAnimationPayload): void;
}

export type AppProviderProps = PropsWithChildren;
