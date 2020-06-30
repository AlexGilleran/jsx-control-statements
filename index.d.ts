/**
 * Stub definitions that will be replaced by the transformer.
 * They're used to provide type definitions for the typescript
 * compiler and various static analysis tools.
 *
 * From https://github.com/KonstantinSimeonov/tsx-control-statements/blob/master/transformer/components.ts
 */
export declare function Choose(props: {
    children?: any;
}): any;
export declare function When(props: {
    children?: any;
    condition: boolean;
}): any;
export declare function If(props: {
    children?: any;
    condition: boolean;
}): any;
declare type NoBody<T> = {
    children?: any;
    each: string;
    of: Iterable<T>;
    index?: string;
};
declare type WithBody<T> = {
    children?: any;
    of: Iterable<T>;
    body: (x: T, index: number) => any;
};
export declare function For<T>(props: NoBody<T> | WithBody<T>): any;
export declare function Otherwise(props: {
    children?: any;
}): any;
export declare function With(props: {
    [id: string]: any;
}): any;
export {};
