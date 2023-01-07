import { Spine } from '@pixi-spine/runtime-4.1';
import { Application, BitmapText, Text } from 'pixi.js';
import { getHalf } from '../../utils';
import {
  AddAnimationPayload,
  AddBitmapTextPayload,
  AddTextPayload,
  CurrentElementPayload,
  ElementsReducerState,
  UpdateBitmapFontsPayload,
  UpdateSkeletonsPayload,
  UpdateWebFontsPayload,
} from './types';

export function makeUpdateSkeletonState(
  state: ElementsReducerState,
  payload: UpdateSkeletonsPayload,
): ElementsReducerState {
  return {
    ...state,
    skeletons: payload.reduce((list, [name, skeleton]) => ({ ...list, [name]: skeleton }), {}),
  };
}

export function makeUpdateBitmapFonts(
  state: ElementsReducerState,
  payload: UpdateBitmapFontsPayload,
): ElementsReducerState {
  return { ...state, bitmapFonts: payload };
}

export function makeUpdateWebFonts(
  state: ElementsReducerState,
  payload: UpdateWebFontsPayload,
): ElementsReducerState {
  return { ...state, webFonts: payload };
}

export function makeAddAnimationState(
  state: ElementsReducerState,
  [name, anim]: AddAnimationPayload,
  { stage, screen }: Application,
): ElementsReducerState {
  const skeleton = state.skeletons[name];
  if (!skeleton) throw new Error(`Skeleton ${name} not found`);
  const spine = new Spine(skeleton);
  spine.name = anim;
  spine.position.set(getHalf(screen.width), getHalf(screen.height));
  stage.addChild(spine);
  return {
    ...state,
    spineAnimations: { ...state.spineAnimations, [anim]: spine },
    currentElement: [anim, spine],
  };
}

export function makeAddBitmapTextState(
  state: ElementsReducerState,
  [content, font]: AddBitmapTextPayload,
  { stage, screen }: Application,
): ElementsReducerState {
  const bitmapText = new BitmapText(content, { fontName: font });
  bitmapText.anchor.set(0.5, 0.5);
  bitmapText.position.set(getHalf(screen.width), getHalf(screen.height));
  stage.addChild(bitmapText);
  return {
    ...state,
    bitmapTexts: [...state.bitmapTexts, bitmapText],
    currentElement: bitmapText,
  };
}

export function makeAddTextState(
  state: ElementsReducerState,
  [content, font]: AddTextPayload,
  { stage, screen }: Application,
): ElementsReducerState {
  const text = new Text(content, { fontSize: 100, fontFamily: font, fill: '0xffffff' });
  text.name = font || 'text';
  text.anchor.set(0.5, 0.5);
  text.position.set(getHalf(screen.width), getHalf(screen.height));
  stage.addChild(text);
  return {
    ...state,
    texts: [...state.texts, text],
    currentElement: text,
  };
}

export function makeSetCurrentElementState(
  state: ElementsReducerState,
  payload: CurrentElementPayload,
): ElementsReducerState {
  return { ...state, currentElement: payload };
}
