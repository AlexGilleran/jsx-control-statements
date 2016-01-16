var _ = require('lodash');

var astUtil = require('./util/ast');
var errorUtil = require('./util/error');

var ELEMENTS = {
  IF: 'If',
  ELSE: 'Else'
};
var ATTRIBUTES = {
  CONDITION: 'condition'
};


function getBlocks(nodes, errorInfos) {
  var result = {
    ifBlock: [],
    elseBlock: []
  };
  var currentBlock = result.ifBlock;

  _.forEach(nodes, function(node) {
    if (astUtil.isTag(node, ELEMENTS.ELSE)) {
      currentBlock = result.elseBlock;
    }
    else {
      currentBlock.push(node);
    }
  });

  return result;
}

function getSingleBlock(blocks, types, errorInfos) {
  if (blocks.length > 1) {
    errorUtil.throwMultipleChildren(errorInfos);
  }
  else if (blocks.length === 0) {
    blocks[0] = types.NullLiteral();
  }

  return blocks[0];
}

function getConditionExpression(node, errorInfos) {
  var condition = astUtil.getAttributeMap(node)[ATTRIBUTES.CONDITION];

  if (!condition) {
    errorUtil.throwNoAttribute(ATTRIBUTES.CONDITION, errorInfos);
  }
  if (!astUtil.isExpressionContainer(condition)) {
    errorUtil.throwNotExpressionType(ATTRIBUTES.CONDITION, errorInfos);
  }

  return astUtil.getExpression(condition);
}


module.exports = function(babel) {
  var types = babel.types;

  return function(node, file) {
    var ifBlock, elseBlock, elseIfBlocks;
    var errorInfos = { node: node, file: file, element: ELEMENTS.IF };
    var condition = getConditionExpression(node, errorInfos);
    var children = astUtil.getChildren(types, node);
    var blocks = getBlocks(children, errorInfos);

    ifBlock = getSingleBlock(blocks.ifBlock, types, errorInfos);
    elseBlock = getSingleBlock(blocks.elseBlock, types, errorInfos);

    return types.ConditionalExpression(condition, ifBlock, elseBlock);
  }
};
