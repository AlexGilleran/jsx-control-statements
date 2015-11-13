var _ = require('lodash');
var errors = require('./error-messages');

module.exports = function (babel) {
  var t = babel.types;

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

  function transformIf(node, file) {
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

    var children = removeLiterals(node.children);

    var notElseTag = function (child) {
      return child.type !== 'JSXElement' || child.openingElement.name.name !== 'Else';
    };

    var ifBlock, elseBlock;
    ifBlock = _.takeWhile(children, notElseTag);

    if (ifBlock.length > 1) {
      throwError(errors.MULTIPLE_CHILDREN, node, file);
    } else if (ifBlock.length === 0) {
      throwError(errors.NO_CHILDREN, node, file);
    }

    if (children.length > 1) {
      elseBlock = _.takeRightWhile(children, notElseTag);
    } else {
      elseBlock = [t.StringLiteral('')];
    }

    return t.ConditionalExpression(condition.value.expression, ifBlock[0], elseBlock[0]);
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

    var children = removeLiterals(node.children);
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

  function removeLiterals(nodes) {
    return _.filter(nodes, function (child) {
      return child.type !== 'JSXText';
    });
  }

  function throwError(message, node, file) {
    throw new Error(message + ' at ' + file.opts.filename + ':' + node.loc.start.line + ',' + node.loc.start.column);
  }
};