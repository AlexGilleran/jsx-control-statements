declare function Choose(): any;
declare function When(props: { condition: boolean }): any;
declare function Otherwise(): any;
declare function If(props: { condition: boolean }): any;
declare function For<T>(props: {
  each: string;
  of: Iterable<T>;
  index?: string;
}): any;
declare function For<T>(props: {
  of: Iterable<T>;
  body: (item: T, index?: number) => React.ReactNode;
}): any;
declare function With(props: { [id: string]: any }): any;

declare namespace JSX {
  type TChildren =
    | Element
    | string
    | number
    | boolean
    | null
    | typeof undefined;

  interface IntrinsicAttributes {
    children?: TChildren | TChildren[];
  }
}
