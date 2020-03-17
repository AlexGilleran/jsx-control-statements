/**
 * Stub definitions that will be replaced by the transformer.
 * They're used to provide type definitions for the typescript
 * compiler and various static analysis tools.
 *
 * From https://github.com/KonstantinSimeonov/tsx-control-statements/blob/master/transformer/components.ts
 */

export function Choose(props: { children?: any }) {
  return props.children;
}

export function When(props: { children?: any; condition: boolean }) {
  return props.children;
}

export function If(props: { children?: any; condition: boolean }) {
  return props.children;
}

type NoBody<T> = {
  children?: any;
  each: string;
  of: Iterable<T>;
  index?: string;
};
type WithBody<T> = {
  children?: any;
  of: Iterable<T>;
  body: (x: T, index: number) => any;
};
export function For<T>(props: NoBody<T> | WithBody<T>) {
  return props.children;
}

export function Otherwise(props: { children?: any }) {
  return props.children;
}

export function With(props: { [id: string]: any }) {
  return props.children;
}
