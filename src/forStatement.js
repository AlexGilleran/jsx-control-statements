var _ = require('lodash');
var error = require('./error');


module.exports = function(babel) {
  var types = babel.types;

  return function(node, file) {
    var children, child, mapParams = [];
    var attributes = node.openingElement.attributes;

    if (!attributes || !attributes.length) {
      error.throwError(error.FOR_WITH_NO_ATTRIBUTES, node, file);
    }

    var each, of, index;
    attributes.forEach(function (attr) {
      if (attr.name.name === 'each') {
        each = attr;
      }
      else if (attr.name.name === 'of') {
        of = attr;
      }
      else if (attr.name.name === 'index') {
        index = attr;
      }
    });

    if (!of) {
      error.throwError(error.FOR_WITH_NO_ATTRIBUTES, node, file);
    }

    children = types.react.buildChildren(node);
    if (children.length > 1) {
      error.throwError(error.MULTIPLE_CHILDREN, node, file);
    }
    if (children.length === 0) {
      return types.NullLiteral();
    }
    child = children[0];

    if (each) {
      mapParams.push(types.Identifier(each.value.value));
    }
    if (index) {
      mapParams.push(types.Identifier(index.value.value));
    }

    return types.callExpression(
      types.memberExpression(
        of.value.expression,
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
