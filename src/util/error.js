// http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format#answer-4673436
function formatString(format) {
  var args = Array.prototype.slice.call(arguments, 1);
  return format.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] !== "undefined" ? args[number] : match;
  });
}

function throwError(errorMsg, infos) {
  throw new Error(
    [
      exports.renderErrorMessage(errorMsg, infos),
      " at ",
      infos.file.opts.filename,
      ": ",
      infos.node.loc.start.line,
      ",",
      infos.node.loc.start.column
    ].join("")
  );
}

var ERRORS = exports.ERRORS = {
  NO_ATTRIBUTE: "Attribute \"{0}\" is required for <{1}>, but missing!",
  NOT_EXPRESSION_TYPE: "Attribute \"{0}\" of <{1}> tag must be an expression, e.g. \"{0}={ ... }\"",
  NOT_STRING_TYPE: "Attribute \"{0}\" of <{1}> tag must be of type String, e.g. {0}=\"...\"",
  CHOOSE_WITHOUT_WHEN: "<Choose> statement requires at least one <When> element!",
  CHOOSE_OTHERWISE_NOT_LAST: "<Otherwise> must be the last element within a <Choose> statement!",
  CHOOSE_WITH_MULTIPLE_OTHERWISE: "<Choose> statement allows only for one <Otherwise> block!",
  CHOOSE_WITH_WRONG_CHILDREN: "Only <Otherwise> and <When> are allowed child elements for <Choose>!"
};

exports.renderErrorMessage = function(errorMsg, infos) {
  var args = [];
  if (infos) {
    args.push(infos.attribute);
    args.push(infos.element);
  }
  return formatString(errorMsg, args);
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

exports.throwChooseWithoutWhen = function(infos) {
  throwError(ERRORS.CHOOSE_WITHOUT_WHEN, infos);
};

exports.throwChooseOtherwiseNotLast = function(infos) {
  throwError(ERRORS.CHOOSE_OTHERWISE_NOT_LAST, infos);
};

exports.throwChooseWithMultipleOtherwise = function(infos) {
  throwError(ERRORS.CHOOSE_WITH_MULTIPLE_OTHERWISE, infos);
};

exports.throwChooseWithWrongChildren = function(infos) {
  throwError(ERRORS.CHOOSE_WITH_WRONG_CHILDREN, infos);
};

