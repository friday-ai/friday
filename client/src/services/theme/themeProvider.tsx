import React, { useContext, useEffect, useState } from 'react';
import { KVArr } from '../../utils/interfaces';
import BaseTheme from '../../utils/themes/theme.base';

export type ThemeType = typeof BaseTheme;

interface ThemeContext {
  theme: ThemeType;
}

const regexp = new RegExp(/[ \w-]+?(?=.ts)/m);
const files = import.meta.globEager('../../utils/themes/theme.**.ts');
const themesList: KVArr<ThemeType> = { base: BaseTheme };

// Map themes and save it in list
Object.entries(files).forEach((file) => {
  const name = regexp.exec(`${file[0]}`);
  // Escape base theme, this is default value and is already present in list
  if (name !== null && name[0] !== 'base') {
    const overloadedTheme = { ...BaseTheme, ...file[1].default };
    Object.assign(themesList, { [name[0]]: overloadedTheme });
  }
});

// Replace background color of body
const changeBackground = (color: string) => {
  document.body.className = '';
  document.body.className = `h-full ${color}`;
};

const changeThemeColorPwa = (color: string) => {
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
};

const ThemeContext = React.createContext<ThemeContext>({ theme: BaseTheme });

export const ThemeProvider = ({ value, children }: { value: string; children: React.ReactNode }): React.ReactElement => {
  const [theme, setTheme] = useState<ThemeType>(themesList[value]);

  // Reload colors
  useEffect(() => {
    const themeValues = themesList[value];
    setTheme(themeValues);
    changeBackground(themeValues.app.background);
    changeThemeColorPwa(themeValues.pwa.themeColor);
  }, [value]);

  useEffect(() => {
    changeBackground(theme.app.background);
    changeThemeColorPwa(theme.pwa.themeColor);
  });

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContext => {
  const context = useContext<ThemeContext>(ThemeContext);
  if (context === undefined) {
    throw new Error('Theme context not provided');
  }
  return context;
};
