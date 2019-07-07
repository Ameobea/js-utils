import React, { useRef, useEffect } from 'react';

export const withDisplayName = (displayName: string) => (Comp: React.ComponentType<any>) => {
  Comp.displayName = displayName;
  return Comp;
};

export type PropTypesOf<T> = T extends React.ComponentType<infer P> ? P : never;

export function useOnChange<T>(
  val: T,
  pred: (val: T) => void,
  runInitially = true,
  equalityFn: (val1: T, val2: T) => boolean = (x1, x2) => x1 === x2
): void {
  const lastVal = useRef<T | null>(runInitially ? null : val);

  if (!lastVal.current || !equalityFn(lastVal.current, val)) {
    lastVal.current = val;
    pred(val);
  }
}
