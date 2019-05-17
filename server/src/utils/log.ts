'use strict';

export default class Log {

  default (text: string) {
    console.log('\n---\n\n\x1b[7m.: %s :.\x1b[0m\n', text.toUpperCase());
  }

  title (text: string) {
    console.log('\n---\n\n\x1b[7m.: %s :.\x1b[0m\n', text.toUpperCase())
  }

  info (text: string) {
    // tslint:disable-next-line: no-console
    console.info('\x1b[36m➡ %s\x1b[0m', text);
  }

  success (text: string) {
    console.log('\x1b[32m✔ %s\x1b[0m', text);
  }

  warning (text: string) {
    console.warn('\x1b[33m❗ %s\x1b[0m', text);
  }

  error (text: string) {
    console.error('\x1b[31m✖ %s\x1b[0m', text);
  }
}
