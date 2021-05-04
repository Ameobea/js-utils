import * as reactModule from './react';
import { ArgumentsOf } from '../types';
export * from './react';
export const react = reactModule;

export const mapObj = <T, R>(
  obj: { [key: string]: T },
  pred: (x: T) => R
): { [key: string]: R } => {
  const mappedObj: { [key: string]: R } = {};
  Object.entries(obj).forEach(([key, val]) => {
    mappedObj[key] = pred(val);
  });

  return mappedObj;
};

export const mapObjToMap = <T, R>(obj: { [key: string]: T }, pred: (x: T) => R): Map<string, R> => {
  const mapped: Map<string, R> = new Map();
  Object.entries(obj).forEach(([key, val]) => {
    mapped.set(key, pred(val));
  });

  return mapped;
};

export const isNil = (x: any) => x === null || x === undefined;

export const filterNils = <T>(arr: (T | null | undefined)[]): T[] =>
  arr.filter((x) => !isNil(x)) as T[];

export class UnimplementedError extends Error {
  constructor(message?: string) {
    super(message || 'Not yet implemented');
  }
}

export class UnreachableException extends Error {
  constructor(message?: string) {
    super(message || 'Entered unreachable code');
  }
}

/**
 * Returns a memoized version of the provided function that remembers the most recent set of arguments that it was called
 * with and the result of the function called with those arguments.  If it is called again with the same arguments
 * (referentially equal), the exact same return value as last time will be returned.
 */
export function memoizeOne<F extends (...args: any[]) => any>(
  fn: F
): (...args: ArgumentsOf<F>) => ReturnType<F> {
  let lastArgs: any[] | null = null;
  let lastRes: ReturnType<F>;

  const memoized = (...args: ArgumentsOf<F>): ReturnType<F> => {
    if (
      lastArgs !== null &&
      args.length === lastArgs.length &&
      args.forEach((arg, i) => arg === lastArgs![i])
    ) {
      return lastRes;
    }

    lastArgs = args;
    lastRes = fn(...args);
    return lastRes;
  };

  return memoized;
}

export class AsyncOnce<T> {
  private getter: () => Promise<T>;
  private pending: Promise<T> | null = null;
  private res: null | { value: T };

  public constructor(getter: () => Promise<T>) {
    this.getter = getter;
  }

  public async get(): Promise<T> {
    if (this.res) {
      return this.res.value;
    }
    if (this.pending) {
      return this.pending;
    }

    this.pending = new Promise((resolve) =>
      this.getter().then((res) => {
        this.res = { value: res };
        this.pending = null;
        resolve(res);
      })
    );
    return this.pending!;
  }
}
