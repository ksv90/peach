import { SkeletonData, Spine } from '@pixi-spine/runtime-4.1';
import { Application } from 'pixi.js';
import { createContext, PropsWithChildren, useContext, useReducer } from 'react';
import { useThemeContext } from './ThemeContext';

export type SkeletonPayload = [string, SkeletonData];
export type AnimationPayload = [string, string];
export type CurrentSkeletonPayload = string | null;
export type CurrentAnimationPayload = string | null;

export type AppState = {
  app: Application;
  skeletonList: Record<string, SkeletonData>;
  addSkeleton(payload: SkeletonPayload): void;
  animationsList: Record<string, Spine>;
  addAnimation(payload: AnimationPayload): void;
  currentSkeleton: string | null;
  setCurrentSkeleton(payload: CurrentSkeletonPayload): void;
  currentAnimation: string | null;
  setCurrentAnimation(payload: CurrentAnimationPayload): void;
};

export type AppProviderProps = PropsWithChildren;

export const enum AppTypes {
  AddSkeleton = 'addSkeleton',
  AddAnimation = 'addAnimation',
  SetSkeletonProps = 'setSkeletonProps',
  SetAnimationProps = 'setAnimationProps',
}

interface SkeletonAction {
  type: AppTypes.AddSkeleton;
  payload: SkeletonPayload;
}

interface AnimationAction {
  type: AppTypes.AddAnimation;
  payload: AnimationPayload;
}

interface CurrentSkeletonAction {
  type: AppTypes.SetSkeletonProps;
  payload: CurrentSkeletonPayload;
}

interface CurrentAnimationAction {
  type: AppTypes.SetAnimationProps;
  payload: CurrentAnimationPayload;
}

export const appReducer = (
  state: AppState,
  action: SkeletonAction | CurrentSkeletonAction | AnimationAction | CurrentAnimationAction,
): AppState => {
  switch (action.type) {
    case AppTypes.AddSkeleton: {
      const [name, skeleton] = action.payload;
      return { ...state, skeletonList: { ...state.skeletonList, [name]: skeleton } };
    }
    case AppTypes.AddAnimation: {
      const [name, anim] = action.payload;
      const skeleton = state.skeletonList[name];
      if (!skeleton) throw new Error(`Skeleton ${name} not found`);
      const spine = new Spine(skeleton);
      spine.name = anim;
      return { ...state, animationsList: { ...state.animationsList, [anim]: spine } };
    }
    case AppTypes.SetSkeletonProps: {
      return { ...state, currentSkeleton: action.payload };
    }
    case AppTypes.SetAnimationProps: {
      return { ...state, currentAnimation: action.payload };
    }
    default:
      return state;
  }
};

export const AppContext = createContext({} as AppState);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: AppProviderProps) => {
  const { extraColor } = useThemeContext();
  const dataContext: AppState = {
    app: new Application({ backgroundColor: parseInt(extraColor.slice(1), 16) }),
    skeletonList: {},
    addSkeleton() {},
    animationsList: {},
    addAnimation() {},
    currentSkeleton: null,
    setCurrentSkeleton() {},
    currentAnimation: null,
    setCurrentAnimation() {},
  };
  const [state, dispatch] = useReducer(appReducer, dataContext);

  const addSkeleton = (payload: SkeletonPayload) => {
    dispatch({ type: AppTypes.AddSkeleton, payload });
  };

  const setCurrentSkeleton = (payload: CurrentSkeletonPayload) => {
    dispatch({ type: AppTypes.SetSkeletonProps, payload });
  };

  const addAnimation = (payload: AnimationPayload) => {
    dispatch({ type: AppTypes.AddAnimation, payload });
  };

  const setCurrentAnimation = (payload: CurrentAnimationPayload) => {
    dispatch({ type: AppTypes.SetAnimationProps, payload });
  };

  return (
    <AppContext.Provider
      value={{ ...state, addSkeleton, setCurrentSkeleton, addAnimation, setCurrentAnimation }}
    >
      {children}
    </AppContext.Provider>
  );
};
