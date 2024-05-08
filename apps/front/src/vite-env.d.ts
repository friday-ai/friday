/// <reference types="vite-plugin-svgr/client" />

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "useragent-parser-js" {
  const ua = {
    isMobile: boolean,
    isDesktop: boolean,
    isTablet: boolean,
    isiPad: boolean,
    isiPod: boolean,
    isiPhone: boolean,
    isAndroid: boolean,
    isBlackberry: boolean,
    isOpera: boolean,
    isIE: boolean,
    isIECompatibilityMode: boolean,
    isSafari: boolean,
    isFirefox: boolean,
    isWebkit: boolean,
    isChrome: boolean,
    isKonqueror: boolean,
    isOmniWeb: boolean,
    isSeaMonkey: boolean,
    isFlock: boolean,
    isAmaya: boolean,
    isEpiphany: boolean,
    isWindows: boolean,
    isLinux: boolean,
    isLinux64: boolean,
    isMac: boolean,
    isChromeOS: boolean,
    isBada: boolean,
    isSamsung: boolean,
    isRaspberry: boolean,
    isBot: boolean,
    isCurl: boolean,
    isAndroidTablet: boolean,
    isWinJs: boolean,
    isKindleFire: boolean,
    isSilk: boolean,
    silkAccelerated: boolean,
    browser: string,
    version: string,
    os: string,
    platform: string,
    source: string,
  };

  export default {
    parse: (userAgent: string) => ua,
  };
}
