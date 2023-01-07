import { Application } from 'pixi.js';
import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { Loader } from '../core';
import Assets from '../core/Assets';
import { useThemeContext } from './ThemeContext';

export type AppContextState = {
  readonly app: Application;
  readonly assets: Assets;
  readonly loader: Loader;
  readonly filesUploaded: boolean;
  setFilesUploaded(): void;
};

export type AppContextProps = PropsWithChildren;

export const AppContext = createContext({} as AppContextState);

export const useAppContext = () => useContext(AppContext);

const memo = <T extends unknown>(t: T): T => useMemo(() => t, []);

export const AppProvider = ({ children }: AppContextProps) => {
  const { mainColorHover } = useThemeContext();
  const [filesUploaded, setFilesUploaded] = useState(false);
  const assets = memo(new Assets());
  const appContext: AppContextState = {
    assets,
    filesUploaded,
    app: memo(new Application({ backgroundColor: parseInt(mainColorHover.slice(1), 16) })),
    loader: memo(new Loader(assets)),
    setFilesUploaded: () => {
      setTimeout(() => setFilesUploaded(true), 300);
      setTimeout(() => setFilesUploaded(false), 2300);
    },
  };
  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
