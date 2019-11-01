import * as reactModule from './react';
export * from './react';
export const react = reactModule;

export const mapObj = <T, R>(obj: { [key: string]: T }, pred: (x: T) => R): { [key: string]: R } => {
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

export const filterNils = <T>(arr: (T | null | undefined)[]): T[] => arr.filter(x => !isNil(x)) as T[];

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
