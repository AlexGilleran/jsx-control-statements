declare function Choose(props: { children: React.ReactNode }): any;
declare function When(props: { condition: boolean, children: React.ReactNode }): any;
declare function Otherwise(props: { children: React.ReactNode }): any;
declare function If(props: { condition: boolean, children: React.ReactNode }): any;
declare function For<T>(props: {
  each: string;
  of: Iterable<T>;
  index?: string;
  children: React.ReactNode
}): any;
declare function For<T>(props: {
  of: Iterable<T>;
  body: (item: T, index?: number) => React.ReactNode;
}): any;
declare function With(props: { [id: string]: any, children: React.ReactNode }): any;
