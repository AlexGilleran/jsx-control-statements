var _ = require('lodash');
var error = require('./error');


var ELSE_IF = 'ElseIf';
var ELSE = 'Else';
var CONDITION = 'condition';

function getSingleBlock(blocks, node, file) {
  if (blocks.length > 1) {
    error.throwError(error.MULTIPLE_CHILDREN, node, file);
  } else if (blocks.length === 0) {
    error.throwError(error.NO_CHILDREN, node, file);
  }

  return blocks[0];
}

function getConditionExpression(node, file) {
  var attributes = node.openingElement.attributes;
  var condition;

  if (attributes && attributes.length) {
    condition = _.find(attributes, function (attr) {
      return attr.name.name === CONDITION;
    });
  }

  if (!condition) {
    error.throwError(error.IF_WITH_NO_CONDITION, node, file);
  }

  return condition.value.expression;
}

function getBlocks(nodes, file) {
  var result = {
    ifBlock: [],
    elseBlock: [],
    elseIfBlocks: []
  };

  var currentBlock = result.ifBlock;
  _.forEach(nodes, function(node) {
    if (isTag(node, ELSE_IF)) {
      var newElseIfBlock = [];
      var condition = getConditionExpression(node, file);
      result.elseIfBlocks.push({
        node: node,
        condition: condition,
        blocks: newElseIfBlock
      });
      currentBlock = newElseIfBlock;
    }
    else if (isTag(node, ELSE)) {
      currentBlock = result.elseBlock;
    }
    else {
      currentBlock.push(node);
    }
  });

  return result;
}

function isTag (node, tagName) {
  return node.type === 'JSXElement' && node.openingElement.name.name === tagName;
}


module.exports = function(babel) {
  var t = babel.types;

  return function(node, file) {
    var ifBlock, elseBlock, elseIfBlocks;

    var condition = getConditionExpression(node, file);
    var children = t.react.buildChildren(node); // normalize JSXText and JSXExpressionContainer to expressions
    var blocks = getBlocks(children, file);

    ifBlock = getSingleBlock(blocks.ifBlock, node, file);

    elseBlock = blocks.elseBlock;
    if (elseBlock.length > 1) {
      error.throwError(error.MULTIPLE_CHILDREN, node, file);
    }
    else if (elseBlock.length === 0) {
      elseBlock = [t.NullLiteral()];
    }
    elseBlock = elseBlock[0];

    // test ? x : (test2 ? y : z)
    elseIfBlocks = blocks.elseIfBlocks;
    if (elseIfBlocks.length) {
      _.forEachRight(elseIfBlocks, function(elseIfBlock) {
        var singleElseIfBlock = getSingleBlock(elseIfBlock.blocks, elseIfBlock.node, file);
        elseBlock = t.ConditionalExpression(elseIfBlock.condition, singleElseIfBlock, elseBlock);
      });
    }

    return t.ConditionalExpression(condition, ifBlock, elseBlock);
  }
};
