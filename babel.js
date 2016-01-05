var _ = require('lodash');
var errors = require('./error-messages');

module.exports = function (babel) {
  var t = babel.types;


  function notElseTag (child) {
    return child.type !== 'JSXElement' || child.openingElement.name.name !== 'Else';
  }

  function transformIf(node, file) {
    var ifBlock, elseBlock;
    var attributes = node.openingElement.attributes;
    if (!attributes || !attributes.length) {
      throwError(errors.IF_WITH_NO_CONDITION, node, file);
    }

    var condition = _.find(attributes, function (attr) {
      return attr.name.name === 'condition';
    });
    if (!condition) {
      throwError(errors.IF_WITH_NO_CONDITION, node, file);
    }

    // normalize JSXText and JSXExpressionContainer to expressions
    var children = t.react.buildChildren(node);
    ifBlock = _.takeWhile(children, notElseTag);

    if (ifBlock.length > 1) {
      throwError(errors.MULTIPLE_CHILDREN, node, file);
    } else if (ifBlock.length === 0) {
      throwError(errors.NO_CHILDREN, node, file);
    } else {
      ifBlock = ifBlock[0];
    }

    if (children.length > 1) {
      elseBlock = _.takeRightWhile(children, notElseTag);
    } else {
      elseBlock = [t.NullLiteral()];
    }
    elseBlock = elseBlock[0];

    return t.ConditionalExpression(condition.value.expression, ifBlock, elseBlock);
  }

  function transformFor(node, file) {
    var attributes = node.openingElement.attributes;

    if (!attributes || !attributes.length) {
      throwError(errors.FOR_WITH_NO_ATTRIBUTES, node, file);
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
      throwError(errors.FOR_WITH_NO_ATTRIBUTES, node, file);
    }

    var children = t.react.buildChildren(node);
    if (children.length > 1) {
      throwError(errors.MULTIPLE_CHILDREN, node, file);
    } else if (children.length === 0) {
      throwError(errors.NO_CHILDREN, node, file);
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

  function throwError(message, node, file) {
    throw new Error(message + ' at ' + file.opts.filename + ':' + node.loc.start.line + ',' + node.loc.start.column);
  }

  var nodeHandlers = {
    'For': transformFor,
    'If': transformIf
  };

  var visitor = {
    JSXElement: function (path) {
      var args = arguments;

      var nodeName = path.node.openingElement.name ? path.node.openingElement.name.name : null;
      var handler = nodeHandlers[nodeName];

      if (handler) {
        path.replaceWith(handler(path.node, path.hub.file));
      }
    }
  };

  return {
    inherits: require("babel-plugin-syntax-jsx"),
    visitor: visitor
  };
};
