import { Application } from 'pixi.js';
import { useMemo } from 'react';
import { AppReducerAction, AppReducerState, AppReducerTypes } from './types';
import {
  makeAddAnimationState,
  makeAddSkeletonState,
  makeSetAnimationState,
  makeSetSkeletonState,
} from './utils';

export function createAppReducerState(color: string): AppReducerState {
  return {
    app: useMemo(() => new Application({ backgroundColor: parseInt(color.slice(1), 16) }), []),
    skeletonList: {},
    animationsList: {},
    currentSkeleton: null,
    currentAnimation: null,
  };
}

export function appReducer(state: AppReducerState, action: AppReducerAction): AppReducerState {
  switch (action.type) {
    case AppReducerTypes.AddSkeleton: {
      return makeAddSkeletonState(state, action.payload);
    }
    case AppReducerTypes.AddAnimation: {
      return makeAddAnimationState(state, action.payload);
    }
    case AppReducerTypes.SetSkeletonProps: {
      return makeSetSkeletonState(state, action.payload);
    }
    case AppReducerTypes.SetAnimationProps: {
      return makeSetAnimationState(state, action.payload);
    }
    default:
      return state;
  }
}
