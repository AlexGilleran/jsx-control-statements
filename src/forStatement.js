var _ = require('lodash');
var error = require('./error');


module.exports = function(babel) {
  var t = babel.types;

  return function(node, file) {
    var attributes = node.openingElement.attributes;

    if (!attributes || !attributes.length) {
      error.throwError(error.FOR_WITH_NO_ATTRIBUTES, node, file);
    }

    var each, of, index;
    attributes.forEach(function (attr) {
      if (attr.name.name === 'each') {
        each = attr;
      } else if (attr.name.name === 'of') {
        of = attr;
      } else if (attr.name.name === 'index') {
        index = attr;
      }
    });

    if (!each || !of) {
      error.throwError(error.FOR_WITH_NO_ATTRIBUTES, node, file);
    }

    var children = t.react.buildChildren(node);
    if (children.length > 1) {
      error.throwError(error.MULTIPLE_CHILDREN, node, file);
    } else if (children.length === 0) {
      error.throwError(error.NO_CHILDREN, node, file);
    }

    var child = children[0];

    var mapParams = [t.Identifier(each.value.value)];

    if (index) {
      mapParams.push(t.Identifier(index.value.value));
    }

    return t.callExpression(
      t.memberExpression(
        of.value.expression,
        t.identifier('map')
      ),
      [
        t.functionExpression(
          null,
          mapParams,
          t.blockStatement([
            t.returnStatement(child)
          ])
        ),
        t.identifier('this')
      ]
    );
  }
};
