import { Spine } from '@pixi-spine/runtime-4.1';
import { Application, BitmapText } from 'pixi.js';
import {
  AnimationPayload,
  BitmapTextPayload,
  CurrentAnimationPayload,
  CurrentBitmapTextPayload,
  CurrentSkeletonPayload,
  ElementsReducerState,
  UpdateBitmapFontsPayload,
  UpdateSkeletonsPayload,
} from './types';

// TODO: временно
const zeroing = {
  currentSkeleton: null,
  currentAnimation: null,
  currentBitmapFont: null,
  currentBitmapText: null,
};

export function makeUpdateSkeletonState(
  state: ElementsReducerState,
  payload: UpdateSkeletonsPayload,
): ElementsReducerState {
  return {
    ...state,
    skeletonList: payload.reduce((list, [name, skeleton]) => ({ ...list, [name]: skeleton }), {}),
  };
}

export function makeUpdateBitmapFonts(
  state: ElementsReducerState,
  payload: UpdateBitmapFontsPayload,
): ElementsReducerState {
  return { ...state, bitmapFonts: payload };
}

export function makeAddAnimationState(
  state: ElementsReducerState,
  [name, anim]: AnimationPayload,
): ElementsReducerState {
  const skeleton = state.skeletonList[name];
  if (!skeleton) throw new Error(`Skeleton ${name} not found`);
  const spine = new Spine(skeleton);
  spine.name = anim;
  return {
    ...state,
    ...zeroing,
    animationsList: { ...state.animationsList, [anim]: spine },
    currentAnimation: anim,
  };
}

export function makeAddBitmapTextState(
  state: ElementsReducerState,
  [content, font]: BitmapTextPayload,
  app: Application,
): ElementsReducerState {
  const bitmapText = new BitmapText(content, { fontName: font });
  bitmapText.anchor.set(0.5, 0.5);
  bitmapText.position.set(app.view.width / 2, app.view.height / 2);
  app.stage.addChild(bitmapText);
  return {
    ...state,
    ...zeroing,
    bitmapTexts: { ...state.bitmapTexts, [content]: bitmapText },
    currentBitmapText: bitmapText,
  };
}

export function makeSetSkeletonState(
  state: ElementsReducerState,
  payload: CurrentSkeletonPayload,
): ElementsReducerState {
  return { ...state, ...zeroing, currentSkeleton: payload };
}

export function makeSetAnimationState(
  state: ElementsReducerState,
  payload: CurrentAnimationPayload,
): ElementsReducerState {
  return { ...state, ...zeroing, currentAnimation: payload };
}

export function makeSetBitmapFontState(
  state: ElementsReducerState,
  payload: string,
): ElementsReducerState {
  return { ...state, ...zeroing, currentBitmapFont: payload };
}

export function makeSetBitmapTextState(
  state: ElementsReducerState,
  payload: CurrentBitmapTextPayload,
): ElementsReducerState {
  return { ...state, ...zeroing, currentBitmapText: payload };
}
