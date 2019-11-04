export type ValueOf<T> = T[keyof T];

export type Without<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ArrayElementOf<T> = T extends (infer E)[] ? E : never;

/**
 * Returns the type that a given `Promise` resolves to
 */
export type PromiseResolveType<P> = P extends Promise<infer T> ? T : never;

export type IterableValueOf<I> = I extends Iterable<[any, infer V]> ? V : never;

export type ArgumentsOf<F> = F extends (...args: infer Args) => any ? Args : never;
