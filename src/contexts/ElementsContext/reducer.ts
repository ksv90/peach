import { ElementsReducerrAction, ElementsReducerrState, ElementsReducerrTypes } from './types';
import {
  makeAddAnimationState,
  makeAddSkeletonState,
  makeSetAnimationState,
  makeSetSkeletonState,
} from './utils';

export function createElementsReducerState(): ElementsReducerrState {
  return {
    skeletonList: {},
    animationsList: {},
    currentSkeleton: null,
    currentAnimation: null,
  };
}

export function elementsReducer(
  state: ElementsReducerrState,
  action: ElementsReducerrAction,
): ElementsReducerrState {
  switch (action.type) {
    case ElementsReducerrTypes.AddSkeleton: {
      return makeAddSkeletonState(state, action.payload);
    }
    case ElementsReducerrTypes.AddAnimation: {
      return makeAddAnimationState(state, action.payload);
    }
    case ElementsReducerrTypes.SetSkeletonProps: {
      return makeSetSkeletonState(state, action.payload);
    }
    case ElementsReducerrTypes.SetAnimationProps: {
      return makeSetAnimationState(state, action.payload);
    }
    default:
      return state;
  }
}
