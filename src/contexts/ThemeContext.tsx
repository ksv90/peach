import { createContext, PropsWithChildren, useContext } from 'react';

export type ThemeState = {
  readonly mainColor: string;
  readonly mainColorHover: string;
  readonly specialColor: string;
  readonly specialColorHover: string;
  readonly textColor: string;
};

export type ThemeProviderProps = PropsWithChildren;

export const ThemeContext = createContext({} as ThemeState);

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeContext: ThemeState = {
    mainColor: '#2c2c2c',
    mainColorHover: '#1e1e1e',
    specialColor: 'blue.500',
    specialColorHover: 'blue.600',
    textColor: '#ffffff',
  };
  return <ThemeContext.Provider value={themeContext}>{children}</ThemeContext.Provider>;
};
