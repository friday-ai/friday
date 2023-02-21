const getColors = () => {
  return {
    primary: `hsl(${window.getComputedStyle(document.documentElement).getPropertyValue('--p')})`,
    secondary: `hsl(${window.getComputedStyle(document.documentElement).getPropertyValue('--s')})`,
    // accent: `hsl(${window.getComputedStyle(document.documentElement).getPropertyValue('--a')})`,
    // neutral: `hsl(${window.getComputedStyle(document.documentElement).getPropertyValue('--n')})`,
    // bgBase100: `hsl(${window.getComputedStyle(document.documentElement).getPropertyValue('--b1')})`,
    // bgBase200: `hsl(${window.getComputedStyle(document.documentElement).getPropertyValue('--b2')})`,
    // bgBase300: `hsl(${window.getComputedStyle(document.documentElement).getPropertyValue('--b3')})`,
  };
};

const updateThemeColor = () => {
  const colors = getColors();
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colors.primary);
  return colors;
};

const getCssTheme = (theme = 'light') => {
  const cssRules = [...document.styleSheets];
  const cssTheme: CSSStyleRule[] = [];

  cssRules.forEach((css) => {
    try {
      const rules = [...css.cssRules] as CSSStyleRule[];

      rules.forEach((rule: CSSStyleRule) => {
        if (rule.selectorText && rule.selectorText.startsWith(`[data-theme="${theme}"]`)) {
          cssTheme.push(rule);
        }
      });
      return true;
    } catch (err) {
      return false;
    }
  });

  return cssTheme.map((css) => css.cssText);
};

export default updateThemeColor;
export { getColors, getCssTheme };
