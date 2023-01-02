import { SkeletonData } from '@pixi-spine/runtime-4.1';
import { Application } from 'pixi.js';
import { createContext, PropsWithChildren, useContext, useReducer } from 'react';
import { useThemeContext } from './ThemeContext';

export type AppPayload = [string, SkeletonData];

export type AppState = {
  app: Application;
  skeletonList: Record<string, SkeletonData>;
  setSkeleton(payload: AppPayload): void;
};

export type AppProviderProps = PropsWithChildren;

export const enum AppTypes {
  add = 'add',
}

interface AppAction {
  type: AppTypes;
  payload: AppPayload;
}

export const dataReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case AppTypes.add: {
      const [name, skeleton] = action.payload;
      return { ...state, skeletonList: { ...state.skeletonList, [name]: skeleton } };
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
    setSkeleton(): void {},
  };
  const [state, dispatch] = useReducer(dataReducer, dataContext);

  const setSkeleton = (payload: AppPayload) => dispatch({ type: AppTypes.add, payload });

  return <AppContext.Provider value={{ ...state, setSkeleton }}>{children}</AppContext.Provider>;
};
