// @flow

// DEPRECATION NOTICE: If you're using Flow >= 0.53 please use the defs in the
// jsx-control-statements.latest.flow.js file. These are deprecated and will
// eventually be replaced by the defs in that file.

declare var If: ReactClass<{ condition: boolean }>;
declare var For: ReactClass<{ each: string, index: string, of: Array<any> }>;
declare var Choose: ReactClass<{}>;
declare var When: ReactClass<{ condition: boolean }>;
declare var Otherwise: ReactClass<{}>;
