import { Application } from 'pixi.js';
import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import Assets from '../core/Assets';
import { useThemeContext } from './themeContext';

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
  const applicationOptions = { backgroundColor: parseInt(mainColorHover.slice(1), 16) };
  const appContext: AppContextState = {
    app: useMemo(() => new Application(applicationOptions), []),
    assets: useMemo(() => new Assets(), []),
    filesUploaded,
    setFilesUploaded: () => {
      setTimeout(() => setFilesUploaded(true), 300);
      setTimeout(() => setFilesUploaded(false), 2300);
    },
  };
  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
