import { Spine } from '@pixi-spine/runtime-4.1';
import { Application, BitmapText } from 'pixi.js';
import { getHalf } from '../../utils';
import {
  AnimationPayload,
  BitmapTextPayload,
  CurrentElementPayload,
  ElementsReducerState,
  UpdateBitmapFontsPayload,
  UpdateSkeletonsPayload,
} from './types';

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
  { stage, screen }: Application,
): ElementsReducerState {
  const skeleton = state.skeletonList[name];
  if (!skeleton) throw new Error(`Skeleton ${name} not found`);
  const spine = new Spine(skeleton);
  spine.position.set(getHalf(screen.width), getHalf(screen.height));
  stage.addChild(spine);
  spine.name = anim;
  return {
    ...state,
    animationsList: { ...state.animationsList, [anim]: spine },
    currentElement: [anim, spine],
  };
}

export function makeAddBitmapTextState(
  state: ElementsReducerState,
  [content, font]: BitmapTextPayload,
  { stage, screen }: Application,
): ElementsReducerState {
  const bitmapText = new BitmapText(content, { fontName: font });
  bitmapText.anchor.set(0.5, 0.5);
  bitmapText.position.set(getHalf(screen.width), getHalf(screen.height));
  stage.addChild(bitmapText);
  return {
    ...state,
    bitmapTexts: { ...state.bitmapTexts, [content]: bitmapText },
    currentElement: bitmapText,
  };
}

export function makeSetCurrentElementState(
  state: ElementsReducerState,
  payload: CurrentElementPayload,
): ElementsReducerState {
  return { ...state, currentElement: payload };
}
