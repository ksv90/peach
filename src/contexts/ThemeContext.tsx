import { createContext, PropsWithChildren, useContext } from 'react';

export type ThemeState = {
  readonly mainColor: string;
  readonly extraColor: string;
  readonly specialColor: string;
  readonly textColor: string;
};

export type ThemeProviderProps = PropsWithChildren;

export const ThemeContext = createContext({} as ThemeState);

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeContext: ThemeState = {
    mainColor: '#2c2c2c',
    extraColor: '#1e1e1e',
    specialColor: 'blue.700',
    textColor: '#ffffff',
  };
  return <ThemeContext.Provider value={themeContext}>{children}</ThemeContext.Provider>;
};
