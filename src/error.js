exports.IF_WITH_NO_CONDITION = '<If> tag with no condition attribute';
exports.IF_WRONG_DATATYPE_CONDITION = 'Attribute \'condition\' of <If> tag must be an expression, e.g. \'condition={ true }\'';
exports.FOR_WITH_NO_ATTRIBUTES = '<For> tag with no \'of\' attribute';
exports.FOR_WRONG_DATATYPE_EACH = 'Attribute \'each\' of <For> tag must be of type String, e.g. \'each="item"\'';
exports.FOR_WRONG_DATATYPE_INDEX = 'Attribute \'index\' of <For> tag must be of type String, e.g. \'index="i"\'';
exports.FOR_WRONG_DATATYPE_OF = 'Attribute \'of\' of <For> tag must be an expression, e.g. \'of={ [1, 2, 3] }\'';
exports.MULTIPLE_CHILDREN = 'Control statements cannot have multiple children';

exports.throwError = function(message, node, file) {
  throw new Error(message + ' at ' + file.opts.filename + ':' + node.loc.start.line + ',' + node.loc.start.column);
};
