/* eslint-disable @typescript-eslint/no-explicit-any */

/** This file is shamelessly copied from https://github.com/zwave-js/node-zwave-js/tree/master/packages/shared
 * thanks to @AlCalzone and his team for this great work!
 */

import { EventEmitter } from 'events';
import process from 'node:process';
import { applyMixin } from './inheritance';

export type EventHandler =
  // Add more overloads as necessary
  | ((arg1: any, arg2: any, arg3: any, arg4: any) => void)
  | ((arg1: any, arg2: any, arg3: any) => void)
  | ((arg1: any, arg2: any) => void)
  | ((arg1: any) => void)
  | ((...args: any[]) => void);

/**
 * A type-safe EventEmitter interface to use in place of Node.js's EventEmitter.
 *
 * **Usage:**
 *
 * 1.) Define event signatures
 * ```ts
 * interface TestEvents {
 * 	test1: (arg1: number) => void;
 * 	test2: () => void;
 * }
 * ```
 *
 * 2a.) direct inheritance:
 * ```ts
 * class Test extends TypedEventEmitter<TestEvents> {
 * 	// class implementation
 * }
 * ```
 * 2b.) as a mixin
 * ```ts
 * interface Test extends TypedEventEmitter<TestEvents> {}
 * Mixin([EventEmitter]) // This is a decorator - prepend it with an <at> sign
 * class Test extends OtherClass implements TypedEventEmitter<TestEvents> {
 * 	// class implementation
 * }
 * ```
 */

export interface TypedEventEmitter<TEvents extends Record<keyof TEvents, EventHandler>> {
  on<TEvent extends keyof TEvents>(event: TEvent, callback: TEvents[TEvent]): this;
  once<TEvent extends keyof TEvents>(event: TEvent, callback: TEvents[TEvent]): this;
  removeListener<TEvent extends keyof TEvents>(event: TEvent, callback: TEvents[TEvent]): this;
  off<TEvent extends keyof TEvents>(event: TEvent, callback: TEvents[TEvent]): this;
  removeAllListeners(event?: keyof TEvents): this;

  emit<TEvent extends keyof TEvents>(event: TEvent, ...args: Parameters<TEvents[TEvent]>): boolean;
}

export class TypedEventEmitter<TEvents extends Record<keyof TEvents, EventHandler>> {}

// Only apply the mixin if we are in a Node.js environment
if ('env' in Object.keys(process)) {
  // Make TypedEventEmitter inherit from EventEmitter without actually extending
  // because that causes TypeScript to complain about invalid inheritance
  applyMixin(TypedEventEmitter, EventEmitter);
}
