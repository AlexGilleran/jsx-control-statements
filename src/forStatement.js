var _ = require('lodash');
var error = require('./error');


function getAttributeMap(node) {
  if (!node.openingElement || !node.openingElement.attributes) {
    return {};
  }

  return _.reduce(node.openingElement.attributes, function(result, attr) {
    if (attr.name && attr.name.name) {
      result[attr.name.name] = attr;
    }
    return result;
  }, {});
}

function addMapParam(types, params, attribute) {
  if (attribute && attribute.value) {
    params.push(types.Identifier(attribute.value.value))
  }
}

function checkForString(attributes, name, node, file) {
  if (attributes[name]) {
    var attrib = attributes[name];
    if (!attrib.value || attrib.value.type !== 'StringLiteral') {
      error.throwError(error['FOR_WRONG_DATATYPE_'+name.toUpperCase()], node, file);
    }
  }
}

function checkForExpressionContainer(attributes, name, node, file) {
  if (attributes[name]) {
    var attrib = attributes[name];
    if (!attrib.value || attrib.value.type !== 'JSXExpressionContainer') {
      error.throwError(error['FOR_WRONG_DATATYPE_'+name.toUpperCase()], node, file);
    }
  }
}


module.exports = function(babel) {
  var types = babel.types;

  return function(node, file) {
    var child, mapParams = [], expressionType;
    var attributes = getAttributeMap(node);
    var children = types.react.buildChildren(node);

    // required attribute
    if (!attributes.of) {
      error.throwError(error.FOR_WITH_NO_ATTRIBUTES, node, file);
    }
    // check for correct data types, as far as possible
    checkForString(attributes, 'each', node, file);
    checkForString(attributes, 'index', node, file);
    checkForExpressionContainer(attributes, 'of', node, file);

    if (children.length > 1) {
      error.throwError(error.MULTIPLE_CHILDREN, node, file);
    }

    // simply return without any child nodes
    if (!children.length) {
      return types.NullLiteral();
    }

    child = children[0];
    addMapParam(types, mapParams, attributes.each);
    addMapParam(types, mapParams, attributes.index);

    return types.callExpression(
      types.memberExpression(
        attributes.of.value.expression,
        types.identifier('map')
      ),
      [
        types.functionExpression(
          null,
          mapParams,
          types.blockStatement([
            types.returnStatement(child)
          ])
        ),
        types.identifier('this')
      ]
    );
  }
};
