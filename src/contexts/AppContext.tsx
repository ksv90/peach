import { Application } from 'pixi.js';
import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { Assets, Loader } from '@peach/core';
import { useThemeContext } from '@peach/contexts';

export type AppContextState = {
  readonly app: Application;
  readonly assets: Assets;
  readonly filesUploaded: boolean;
  setFilesUploaded(): void;
};

export type AppContextProps = PropsWithChildren;

export const AppContext = createContext({} as AppContextState);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: AppContextProps) => {
  const { mainColorHover } = useThemeContext();
  const [filesUploaded, setFilesUploaded] = useState(false);
  const assets = useMemo(() => new Assets(new Loader()), []);
  const appContext: AppContextState = {
    assets,
    filesUploaded,
    app: useMemo(() => {
      const application = new Application({
        backgroundColor: parseInt(mainColorHover.slice(1), 16),
      });
      application.stage.sortableChildren = true;
      return application;
    }, []),
    setFilesUploaded: () => {
      setTimeout(() => setFilesUploaded(true), 300);
      setTimeout(() => setFilesUploaded(false), 2300);
    },
  };
  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
