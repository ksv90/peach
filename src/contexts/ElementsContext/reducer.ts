import { ElementsReducerAction, ElementsReducerState, ElementsReducerrTypes } from './types';
import {
  makeAddAnimationState,
  makeAddBitmapTextState,
  makeSetCurrentElementState,
  makeUpdateBitmapFonts,
  makeUpdateSkeletonState,
} from './utils';

export function createElementsReducerState(): ElementsReducerState {
  return {
    skeletonList: {},
    bitmapFonts: [],
    animationsList: {},
    bitmapTexts: [],
    currentElement: null,
  };
}

export function elementsReducer(
  state: ElementsReducerState,
  action: ElementsReducerAction,
): ElementsReducerState {
  switch (action.type) {
    case ElementsReducerrTypes.UpdateSkeletons: {
      return makeUpdateSkeletonState(state, action.payload);
    }
    case ElementsReducerrTypes.UpdateBitmapFonts: {
      return makeUpdateBitmapFonts(state, action.payload);
    }
    case ElementsReducerrTypes.AddAnimation: {
      return makeAddAnimationState(state, action.payload, action.app);
    }
    case ElementsReducerrTypes.AddBitmapText: {
      return makeAddBitmapTextState(state, action.payload, action.app);
    }
    case ElementsReducerrTypes.SetCurrentElement: {
      return makeSetCurrentElementState(state, action.payload);
    }
    default:
      return state;
  }
}
