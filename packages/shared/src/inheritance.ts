/* ↑↑↑ This is poor 😭 */
/* ↓↓↓ But not this 😎 */

/** This file is shamelessly copied from https://github.com/zwave-js/node-zwave-js/tree/master/packages/shared
 * thanks to @AlCalzone and his team for this great work!
 */

import type { Constructor, UnionToIntersection } from "./utils";

export function applyMixin(target: Constructor, mixin: Constructor, includeConstructor = false): void {
  // Figure out the inheritance chain of the mixin
  const inheritanceChain: Constructor[] = [mixin];

  // If the mixin has no base class, we're done
  if (inheritanceChain[0] === undefined) {
    return;
  }

  while (true) {
    const current = inheritanceChain[0];
    const base = Object.getPrototypeOf(current);
    if (base?.prototype) {
      inheritanceChain.unshift(base);
    } else {
      break;
    }
  }
  for (const ctor of inheritanceChain) {
    for (const prop of Object.getOwnPropertyNames(ctor.prototype)) {
      // Do not override the constructor
      if (includeConstructor || prop !== "constructor") {
        Object.defineProperty(target.prototype, prop, Object.getOwnPropertyDescriptor(ctor.prototype, prop) ?? Object.create(null));
      }
    }
  }
}

/** Decorator to support multi-inheritance using mixins */
export function Mixin(baseCtors: Constructor[]) {
  return function f(derivedCtor: Constructor): void {
    for (const baseCtor of baseCtors) {
      applyMixin(derivedCtor, baseCtor);
    }
  };
}

// biome-ignore lint/suspicious/noExplicitAny: "Any" type is necessary here to have flexibility
type Constructors<T extends any[]> = { [K in keyof T]: Constructor<T[K]> };

/**
 * Merges the given base classes into one, so extending from all of them at once is possible.
 * The first one will be included with proper inheritance, the remaining ones are mixed in.
 */
// biome-ignore lint/suspicious/noExplicitAny: "Any" type is necessary here to have flexibility
export function AllOf<T extends any[]>(...BaseClasses: Constructors<T>): Constructor<UnionToIntersection<T[number]>> {
  const [First, ...Others] = BaseClasses;
  const ret = class AllOf extends First {};
  for (const base of Others) {
    applyMixin(ret, base);
  }
  // biome-ignore lint/suspicious/noExplicitAny: "Any" type is necessary here to have flexibility
  return ret as any;
}

/** Tests if base is in the super chain of `constructor` */
// biome-ignore lint/suspicious/noExplicitAny: "Any" type is necessary here to have flexibility
// biome-ignore lint/suspicious/noShadowRestrictedNames:
export function staticExtends<T extends new (...args: any[]) => any>(constructor: unknown, base: T): constructor is T {
  while (constructor) {
    if (constructor === base) {
      return true;
    }
    // biome-ignore lint/style/noParameterAssign: Necessary here
    constructor = Object.getPrototypeOf(constructor) as unknown;
  }
  return false;
}
