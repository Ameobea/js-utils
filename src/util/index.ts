import * as reactModule from './react';
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
