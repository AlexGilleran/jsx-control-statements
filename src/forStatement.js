var astUtil = require("./util/ast");
var errorUtil = require("./util/error");

var ELEMENTS = {
  FOR: "For"
};
var ATTRIBUTES = {
  EACH: "each",
  OF: "of",
  INDEX: "index"
};

function addMapParam(types, params, attributes, attributeKey) {
  var attribute = attributes[attributeKey];
  if (attribute && attribute.value) {
    params.push(types.Identifier(attribute.value.value));
  }
  else {
    params.push(types.Identifier(attributeKey));
  }
}

function checkForString(attributes, name, errorInfos) {
  if (attributes[name] && !astUtil.isStringLiteral(attributes[name])) {
    errorUtil.throwNotStringType(name, errorInfos);
  }
}

function checkForExpression(attributes, name, errorInfos) {
  if (attributes[name] && !astUtil.isExpressionContainer(attributes[name])) {
    errorUtil.throwNotExpressionType(name, errorInfos);
  }
}

module.exports = function(babel) {
  var types = babel.types;

  return function(node, file) {
    var mapParams = [];
    var errorInfos = { node: node, file: file, element: ELEMENTS.FOR };
    var attributes = astUtil.getAttributeMap(node);
    var children = astUtil.getChildren(types, node);
    var returnExpression = astUtil.getSanitizedExpressionForContent(types, children);

    // required attribute
    if (!attributes[ATTRIBUTES.OF]) {
      errorUtil.throwNoAttribute(ATTRIBUTES.OF, errorInfos);
    }
    // check for correct data types, as far as possible
    checkForExpression(attributes, ATTRIBUTES.OF, errorInfos);
    checkForString(attributes, ATTRIBUTES.EACH, errorInfos);
    checkForString(attributes, ATTRIBUTES.INDEX, errorInfos);

    // simply return without any child nodes
    if (!children.length) {
      return returnExpression;
    }

    addMapParam(types, mapParams, attributes, ATTRIBUTES.EACH);
    addMapParam(types, mapParams, attributes, ATTRIBUTES.INDEX);

    return types.callExpression(
      types.memberExpression(
        attributes[ATTRIBUTES.OF].value.expression,
        types.identifier("map")
      ),
      [
        types.functionExpression(
          null,
          mapParams,
          types.blockStatement([
            types.returnStatement(returnExpression)
          ])
        ),
        types.identifier("this")
      ]
    );
  };
};
