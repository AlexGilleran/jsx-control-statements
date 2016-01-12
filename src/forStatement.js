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


module.exports = function(babel) {
  var types = babel.types;

  return function(node, file) {
    var child, mapParams = [];
    var attributes = getAttributeMap(node);
    var children = types.react.buildChildren(node);

    // required attribute
    if (!attributes.of) {
      error.throwError(error.FOR_WITH_NO_ATTRIBUTES, node, file);
    }
    //if (!attributes.of.value)
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
