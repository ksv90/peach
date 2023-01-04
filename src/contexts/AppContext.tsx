import { Application } from 'pixi.js';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { useThemeContext } from './ThemeContext';

export type AppContextState = {
  readonly app: Application;
};

export type AppContextProps = PropsWithChildren;

export const AppContext = createContext({} as AppContextState);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: AppContextProps) => {
  const { mainColorHover } = useThemeContext();
  const appContext: AppContextState = {
    app: useMemo(
      () => new Application({ backgroundColor: parseInt(mainColorHover.slice(1), 16) }),
      [],
    ),
  };
  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
