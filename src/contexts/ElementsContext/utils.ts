import { Spine } from '@pixi-spine/runtime-4.1';
import { Application, BitmapText, Sprite, Text } from 'pixi.js';
import { getHalf } from '../../utils';
import {
  AddAnimationPayload,
  AddBitmapTextPayload,
  AddSpritePayload,
  AddTextPayload,
  CurrentElementPayload,
  ElementsReducerState,
} from './types';

export function makeAddAnimationState(
  state: ElementsReducerState,
  [anim, skeleton]: AddAnimationPayload,
  { stage, screen }: Application,
): ElementsReducerState {
  const spine = new Spine(skeleton);
  spine.name = anim;
  spine.position.set(getHalf(screen.width), getHalf(screen.height));
  stage.addChild(spine);
  return {
    ...state,
    spineAnimations: { ...state.spineAnimations, [anim]: spine },
    currentElement: spine,
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

export function makeAddSpriteState(
  state: ElementsReducerState,
  [name, texture]: AddSpritePayload,
  { stage, screen }: Application,
): ElementsReducerState {
  const sprite = new Sprite(texture);
  sprite.name = name;
  sprite.anchor.set(0.5, 0.5);
  sprite.position.set(getHalf(screen.width), getHalf(screen.height));
  stage.addChild(sprite);
  return {
    ...state,
    sprites: { ...state.sprites, [name]: sprite },
    currentElement: sprite,
  };
}

export function makeSetCurrentElementState(
  state: ElementsReducerState,
  payload: CurrentElementPayload,
): ElementsReducerState {
  return { ...state, currentElement: payload };
}
