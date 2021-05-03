import React, { useContext, useEffect, useState } from 'react';
import { KVArr } from '../../utils/interfaces';

type themeType = KVArr<KVArr<string>>;

interface Context {
  theme: themeType;
}

const regexp = new RegExp(/[ \w-]+?(?=.ts)/gm);
const files = import.meta.globEager('../../utils/themes/theme.*.ts');
const themesList: KVArr<themeType> = {};

// Replace background color of body
const changeBackground = (color: string) => {
  document.body.className = '';
  document.body.className = `h-full ${color}`;
};

export const ThemeContext = React.createContext<Context | undefined>(undefined);

export const ThemeProvider = ({ value, children }: { value: string; children: React.ReactNode }): React.ReactElement => {
  // Map themes and save it in list
  Object.entries(files).forEach((file) => {
    const name = regexp.exec(`${file[0]}`);
    if (name !== null) {
      Object.assign(themesList, { [name[0]]: file[1].default });
    }
  });

  const [theme, setTheme] = useState<themeType>(themesList[value]);

  // Reload colors
  useEffect(() => {
    const themeValues = themesList[value];
    setTheme(themeValues);
    changeBackground(themeValues.app.background);
  }, [value]);

  useEffect(() => {
    changeBackground(theme.app.background);
  });

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): Context => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('Theme context not provided');
  }
  return context;
};
