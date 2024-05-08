import consoleStamp from "console-stamp";

const env = process.env.NODE_ENV || "production";

/**
 * Log utils
 * @class Log
 */
const Log = {
  /**
   * Init function of logger
   * @param label The name of app
   */
  init(label: string) {
    consoleStamp(console, {
      format: ":customDate().grey :customLabel.black.bgWhite",
      tokens: {
        customDate: () => {
          return new Date().toISOString().slice(11, -1);
        },
        customLabel: () => {
          return label;
        },
      },
    });
  },

  /**
   * Default style log
   * @param {string} text
   * @memberof Log
   */
  default(text: string) {
    if (env !== "test") {
      console.log("\x1b[7m.: %s :.\x1b[0m\n", text.toUpperCase());
    }
  },

  /**
   * Title style of log
   * @param {string} text
   * @memberof Log
   */
  title(text: string) {
    if (env !== "test") {
      // tslint:disable-next-line: no-console
      console.log("\x1b[7m.: %s :.\x1b[0m", text.toUpperCase());
    }
  },

  /**
   * Info style of log
   * @param {string} text
   * @memberof Log
   */
  info(text: string) {
    if (env !== "test") {
      // tslint:disable-next-line: no-console
      console.info("\x1b[36m➡  %s\x1b[0m", text);
    }
  },

  /**
   * Success style of log
   * @param {string} text
   * @memberof Log
   */
  success(text: string) {
    if (env !== "test") {
      console.log("\x1b[32m✔  %s\x1b[0m", text);
    }
  },

  /**
   * Warning style of log
   * @param {string} text
   * @memberof Log
   */
  warning(text: string) {
    if (env !== "test") {
      console.warn("\x1b[33m❗  %s\x1b[0m", text);
    }
  },

  /**
   * Error style of log
   * @param {string} text
   * @memberof Log
   */
  error(text: string) {
    if (env !== "test") {
      // tslint:disable-next-line: no-console
      console.trace("\x1b[31m✖  %s\x1b[0m", text);
    }
  },
};

export default Log;
