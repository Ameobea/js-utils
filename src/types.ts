export type ValueOf<T> = T[keyof T];

export type Without<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
