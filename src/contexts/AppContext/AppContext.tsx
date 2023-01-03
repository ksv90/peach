import { createContext, useContext, useReducer } from 'react';
import { appReducer, createAppReducerState } from './reducer';
import { useThemeContext } from '../ThemeContext';
import {
  AnimationPayload,
  AppProviderProps,
  AppContextState,
  AppReducerTypes,
  CurrentAnimationPayload,
  CurrentSkeletonPayload,
  SkeletonPayload,
} from './types';

export const AppContext = createContext({} as AppContextState);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: AppProviderProps) => {
  const { extraColor } = useThemeContext();

  const [state, dispatch] = useReducer(appReducer, createAppReducerState(extraColor));

  const appContext: AppContextState = {
    ...state,
    addSkeleton(payload: SkeletonPayload) {
      dispatch({ type: AppReducerTypes.AddSkeleton, payload });
    },
    addAnimation(payload: AnimationPayload) {
      dispatch({ type: AppReducerTypes.AddAnimation, payload });
    },
    setCurrentSkeleton(payload: CurrentSkeletonPayload) {
      dispatch({ type: AppReducerTypes.SetSkeletonProps, payload });
    },
    setCurrentAnimation(payload: CurrentAnimationPayload) {
      dispatch({ type: AppReducerTypes.SetAnimationProps, payload });
    },
  };

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
