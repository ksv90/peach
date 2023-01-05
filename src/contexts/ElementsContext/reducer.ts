import { ElementsReducerrAction, ElementsReducerState, ElementsReducerrTypes } from './types';
import {
  makeAddAnimationState,
  makeAddBitmapTextState,
  makeSetAnimationState,
  makeSetBitmapFontState,
  makeSetBitmapTextState,
  makeSetSkeletonState,
  makeUpdateBitmapFonts,
  makeUpdateSkeletonState,
} from './utils';

export function createElementsReducerState(): ElementsReducerState {
  return {
    skeletonList: {},
    bitmapFonts: [],
    animationsList: {},
    bitmapTexts: [],
    currentSkeleton: null,
    currentAnimation: null,
    currentBitmapFont: null,
    currentBitmapText: null,
  };
}

export function elementsReducer(
  state: ElementsReducerState,
  action: ElementsReducerrAction,
): ElementsReducerState {
  switch (action.type) {
    case ElementsReducerrTypes.UpdateSkeletons: {
      return makeUpdateSkeletonState(state, action.payload);
    }
    case ElementsReducerrTypes.UpdateBitmapFonts: {
      return makeUpdateBitmapFonts(state, action.payload);
    }
    case ElementsReducerrTypes.AddAnimation: {
      return makeAddAnimationState(state, action.payload);
    }
    case ElementsReducerrTypes.AddBitmapText: {
      return makeAddBitmapTextState(state, action.payload, action.app);
    }
    case ElementsReducerrTypes.SetSkeletonProps: {
      return makeSetSkeletonState(state, action.payload);
    }
    case ElementsReducerrTypes.SetAnimationProps: {
      return makeSetAnimationState(state, action.payload);
    }
    case ElementsReducerrTypes.SetBitmapFontProps: {
      return makeSetBitmapFontState(state, action.payload);
    }
    case ElementsReducerrTypes.SetBitmapTextProps: {
      return makeSetBitmapTextState(state, action.payload);
    }
    default:
      return state;
  }
}
