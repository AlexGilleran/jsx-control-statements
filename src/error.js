exports.IF_WITH_NO_CONDITION = '<If> tag with no condition attribute';
exports.FOR_WITH_NO_ATTRIBUTES = '<For> tag with no \'each\' or \'of\' attribute';
exports.MULTIPLE_CHILDREN = 'Control statements cannot have multiple children';

exports.throwError = function(message, node, file) {
  throw new Error(message + ' at ' + file.opts.filename + ':' + node.loc.start.line + ',' + node.loc.start.column);
};
