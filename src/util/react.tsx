import React, { useRef, useEffect } from "react";

export const withDisplayName = (displayName: string) => (
  Comp: React.ComponentType<any>
) => {
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

/**
 * A React hook that runs the provided callback exactly once per the lifecycle of the component it is called in.  It is
 * called after the first mount of the component.
 */
export const useOnce = (cb: () => void) => {
  const wasRun = useRef(false);

  useEffect(() => {
    if (!wasRun.current) {
      cb();
      wasRun.current = true;
    }
  });
};

export const useUniqueId = () => {
  const value = useRef("");
  useEffect(() => {
    value.current = btoa(Math.random().toString()).replace(/=/g, "");
  }, []);

  return value.current;
};

type ANewTabProps = {
  to: string;
  text?: string;
  noreferrer?: boolean;
} & React.HTMLProps<HTMLAnchorElement>;

/**
 * Link that opens in a new tab.
 */
export const ANewTab: React.FC<ANewTabProps> = ({
  to,
  children,
  text,
  noreferrer = false,
  ...props
}) => (
  <a
    href={to}
    target="_blank"
    rel={`noopener${noreferrer ? " noreferrer" : ""}`}
    {...props}
  >
    {children || text || ""}
  </a>
);
