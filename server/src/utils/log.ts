'use strict';

const env = process.env.NODE_ENV || 'production';
/**
 * Log utils
 * @class Log
 */
export default class Log {

  /**
   * Default style log
   * @param {string} text
   * @memberof Log
   */
  default(text: string) {
    console.log('\n---\n\n\x1b[7m.: %s :.\x1b[0m\n', text.toUpperCase());
  }

  /**
   * Title style of log
   * @param {string} text
   * @memberof Log
   */
  title(text: string) {
    if (env !== 'test') {
      // tslint:disable-next-line: no-console
      console.log('\n---\n\n\x1b[7m.: %s :.\x1b[0m\n', text.toUpperCase());
    }
  }

  /**
   * Info style of log
   * @param {string} text
   * @memberof Log
   */
  info(text: string) {
    if (env !== 'test') {
      // tslint:disable-next-line: no-console
      console.info('\x1b[36m➡ %s\x1b[0m', text);
    }
  }

  /**
   * Success style of log
   * @param {string} text
   * @memberof Log
   */
  success(text: string) {
    console.log('\x1b[32m✔ %s\x1b[0m', text);
  }

  /**
   * Warning style of log
   * @param {string} text
   * @memberof Log
   */
  warning(text: string) {
    console.warn('\x1b[33m❗ %s\x1b[0m', text);
  }

  /**
   * Error style of log
   * @param {string} text
   * @returns {Error}
   * @memberof Log
   */
  error(text: string) {
    // tslint:disable-next-line: no-console
    console.trace('\x1b[31m✖ %s\x1b[0m', text);
  }
}
