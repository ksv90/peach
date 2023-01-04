import { Spine } from '@pixi-spine/runtime-4.1';
import {
  AnimationPayload,
  CurrentAnimationPayload,
  CurrentSkeletonPayload,
  ElementsReducerrState,
  SkeletonPayload,
} from './types';

export function makeAddSkeletonState(
  state: ElementsReducerrState,
  [name, skeleton]: SkeletonPayload,
): ElementsReducerrState {
  return {
    ...state,
    skeletonList: { ...state.skeletonList, [name]: skeleton },
    currentAnimation: null,
    currentSkeleton: name,
  };
}

export function makeAddAnimationState(
  state: ElementsReducerrState,
  [name, anim]: AnimationPayload,
): ElementsReducerrState {
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
  state: ElementsReducerrState,
  payload: CurrentSkeletonPayload,
): ElementsReducerrState {
  return { ...state, currentAnimation: null, currentSkeleton: payload };
}

export function makeSetAnimationState(
  state: ElementsReducerrState,
  payload: CurrentAnimationPayload,
): ElementsReducerrState {
  return { ...state, currentSkeleton: null, currentAnimation: payload };
}
