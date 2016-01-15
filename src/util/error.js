var _ = require('lodash');


function throwError(errorMsg, infos) {
  throw new Error(
    [
      exports.renderErrorMessage(errorMsg, infos),
      ' at ',
      infos.file.opts.filename,
      ': ',
      infos.node.loc.start.line,
      ',',
      infos.node.loc.start.column
    ].join('')
  );
}

exports.ERRORS = ERRORS = {
  MULTIPLE_CHILDREN: 'Control statements cannot have multiple children!',
  NO_ATTRIBUTE: 'Attribute \'<%= attribute %>\' is required for <<%= element %>>, but missing!',
  NOT_EXPRESSION_TYPE: 'Attribute \'<%= attribute %>\' of <<%= element %>> tag must be an expression, e.g. \'<%= attribute %>={ ... }\'',
  NOT_STRING_TYPE: 'Attribute \'<%= attribute %>\' of <<%= element %>> tag must be of type String, e.g. \'<%= attribute %>="..."\''
};

exports.renderErrorMessage = function(errorMsg, infos) {
  return _.template(errorMsg)(infos);
};

exports.throwNoAttribute = function(attributeName, infos) {
  infos.attribute = attributeName;
  throwError(ERRORS.NO_ATTRIBUTE, infos);
};

exports.throwNotExpressionType = function(attributeName, infos) {
  infos.attribute = attributeName;
  throwError(ERRORS.NOT_EXPRESSION_TYPE, infos);
};

exports.throwNotStringType = function(attributeName, infos) {
  infos.attribute = attributeName;
  throwError(ERRORS.NOT_STRING_TYPE, infos);
};

exports.throwMultipleChildren = function(infos) {
  throwError(ERRORS.MULTIPLE_CHILDREN, infos);
};
