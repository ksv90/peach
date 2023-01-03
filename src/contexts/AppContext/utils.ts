import { Spine } from '@pixi-spine/runtime-4.1';
import {
  AnimationPayload,
  CurrentAnimationPayload,
  CurrentSkeletonPayload,
  AppReducerState,
  SkeletonPayload,
} from './types';

export function makeAddSkeletonState(
  state: AppReducerState,
  [name, skeleton]: SkeletonPayload,
): AppReducerState {
  return {
    ...state,
    skeletonList: { ...state.skeletonList, [name]: skeleton },
    currentAnimation: null,
    currentSkeleton: name,
  };
}

export function makeAddAnimationState(
  state: AppReducerState,
  [name, anim]: AnimationPayload,
): AppReducerState {
  const skeleton = state.skeletonList[name];
  if (!skeleton) throw new Error(`Skeleton ${name} not found`);
  const spine = new Spine(skeleton);
  spine.name = anim;
  return {
    ...state,
    animationsList: { ...state.animationsList, [anim]: spine },
    currentSkeleton: null,
    currentAnimation: anim,
  };
}

export function makeSetSkeletonState(
  state: AppReducerState,
  payload: CurrentSkeletonPayload,
): AppReducerState {
  return { ...state, currentSkeleton: payload };
}

export function makeSetAnimationState(
  state: AppReducerState,
  payload: CurrentAnimationPayload,
): AppReducerState {
  return { ...state, currentAnimation: payload };
}
