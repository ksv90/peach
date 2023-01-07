import { ElementsReducerAction, ElementsReducerState, ElementsReducerTypes } from './types';
import {
  makeAddAnimationState,
  makeAddBitmapTextState,
  makeAddTextState,
  makeSetCurrentElementState,
  makeUpdateBitmapFonts,
  makeUpdateSkeletonState,
  makeUpdateWebFonts,
} from './utils';

export function createElementsReducerState(): ElementsReducerState {
  return {
    skeletons: {},
    bitmapFonts: [],
    spineAnimations: {},
    bitmapTexts: [],
    webFonts: [],
    texts: [],
    currentElement: null,
  };
}

export function elementsReducer(
  state: ElementsReducerState,
  action: ElementsReducerAction,
): ElementsReducerState {
  switch (action.type) {
    case ElementsReducerTypes.UpdateSkeletons: {
      return makeUpdateSkeletonState(state, action.payload);
    }
    case ElementsReducerTypes.UpdateBitmapFonts: {
      return makeUpdateBitmapFonts(state, action.payload);
    }
    case ElementsReducerTypes.UpdateWebfontFonts: {
      return makeUpdateWebFonts(state, action.payload);
    }
    case ElementsReducerTypes.AddAnimation: {
      return makeAddAnimationState(state, action.payload, action.app);
    }
    case ElementsReducerTypes.AddBitmapText: {
      return makeAddBitmapTextState(state, action.payload, action.app);
    }
    case ElementsReducerTypes.AddText: {
      return makeAddTextState(state, action.payload, action.app);
    }
    case ElementsReducerTypes.SetCurrentElement: {
      return makeSetCurrentElementState(state, action.payload);
    }
    default:
      return state;
  }
}
