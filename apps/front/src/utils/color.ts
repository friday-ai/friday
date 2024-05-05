/** Code generate by ChatGPT
 * @author: Mathieu Andrade
 */

const hslToRGB = (h: number, s: number, l: number): { red: number; green: number; blue: number } => {
  const hue = h / 360;
  const saturation = s / 100;
  const lightness = l / 100;

  let red: number;
  let green: number;
  let blue: number;

  if (saturation === 0) {
    red = lightness;
    green = lightness;
    blue = lightness;
  } else {
    const hueToRGB = (p: number, q: number, t: number) => {
      let tt = t;

      if (tt < 0) tt += 1;
      if (tt > 1) tt -= 1;
      if (tt < 1 / 6) return p + (q - p) * 6 * tt;
      if (tt < 1 / 2) return q;
      if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
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
    const red = Number.parseInt(rgbMatch[1] || "", 10);
    const green = Number.parseInt(rgbMatch[2] || "", 10);
    const blue = Number.parseInt(rgbMatch[3] || "", 10);

    if (red >= 0 && red <= 255 && green >= 0 && green <= 255 && blue >= 0 && blue <= 255) {
      return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }
  }

  // Check if the color is in HEX format
  const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hexMatch) {
    const red = Number.parseInt(hexMatch[1] || "", 16);
    const green = Number.parseInt(hexMatch[2] || "", 16);
    const blue = Number.parseInt(hexMatch[3] || "", 16);

    if (!Number.isNaN(red) && !Number.isNaN(green) && !Number.isNaN(blue)) {
      return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }
  }

  // Check if the color is in HSL format
  const hslMatch = color.match(/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/i);
  if (hslMatch) {
    const hue = Number.parseInt(hslMatch[1] || "", 10);
    const saturation = Number.parseInt(hslMatch[2] || "", 10);
    const lightness = Number.parseInt(hslMatch[3] || "", 10);

    if (hue >= 0 && hue <= 360 && saturation >= 0 && saturation <= 100 && lightness >= 0 && lightness <= 100) {
      const converted = hslToRGB(hue, saturation, lightness);
      return `rgba(${converted.red}, ${converted.green}, ${converted.blue}, ${alpha})`;
    }
  }

  return color;
};

export { colorToRGBA, hslToRGB };
