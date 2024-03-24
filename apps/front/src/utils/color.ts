/** Code generate by ChatGPT
 * @author: Mathieu Andrade
 */

const hslToRGB = (h: number, s: number, l: number): { red: number; green: number; blue: number } => {
  const hue = h / 360;
  const saturation = s / 100;
  const lightness = l / 100;

  let red;
  let green;
  let blue;

  if (saturation === 0) {
    red = lightness;
    green = lightness;
    blue = lightness;
  } else {
    const hueToRGB = (p: number, q: number, t: number) => {
      // eslint-disable-next-line no-param-reassign
      if (t < 0) t += 1;
      // eslint-disable-next-line no-param-reassign
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;

    red = hueToRGB(p, q, hue + 1 / 3);
    green = hueToRGB(p, q, hue);
    blue = hueToRGB(p, q, hue - 1 / 3);
  }

  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
  };
};

const colorToRGBA = (color: string, alpha: number): string => {
  // Check if the color is in RGBA format
  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i);
  if (rgbMatch) {
    const red = parseInt(rgbMatch[1] || '', 10);
    const green = parseInt(rgbMatch[2] || '', 10);
    const blue = parseInt(rgbMatch[3] || '', 10);

    if (red >= 0 && red <= 255 && green >= 0 && green <= 255 && blue >= 0 && blue <= 255) {
      return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }
  }

  // Check if the color is in HEX format
  const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hexMatch) {
    const red = parseInt(hexMatch[1] || '', 16);
    const green = parseInt(hexMatch[2] || '', 16);
    const blue = parseInt(hexMatch[3] || '', 16);

    if (!Number.isNaN(red) && !Number.isNaN(green) && !Number.isNaN(blue)) {
      return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }
  }

  // Check if the color is in HSL format
  const hslMatch = color.match(/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/i);
  if (hslMatch) {
    const hue = parseInt(hslMatch[1] || '', 10);
    const saturation = parseInt(hslMatch[2] || '', 10);
    const lightness = parseInt(hslMatch[3] || '', 10);

    if (hue >= 0 && hue <= 360 && saturation >= 0 && saturation <= 100 && lightness >= 0 && lightness <= 100) {
      const converted = hslToRGB(hue, saturation, lightness);
      return `rgba(${converted.red}, ${converted.green}, ${converted.blue}, ${alpha})`;
    }
  }

  return color;
};

export { colorToRGBA, hslToRGB };
