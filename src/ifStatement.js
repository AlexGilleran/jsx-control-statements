var _ = require('lodash');

var astUtil = require('./util/ast');
var conditionalUtil = require('./util/conditional');

var ELEMENTS = {
  IF: 'If',
  ELSE: 'Else'
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

module.exports = function(babel) {
  var types = babel.types;

  return function(node, file) {
    var ifBlock, elseBlock, elseIfBlocks;
    var errorInfos = { node: node, file: file, element: ELEMENTS.IF };
    var condition = conditionalUtil.getConditionExpression(node, errorInfos);
    var children = astUtil.getChildren(types, node);
    var blocks = getBlocks(children, errorInfos);

    ifBlock = conditionalUtil.getSingleBlock(types, blocks.ifBlock, errorInfos);
    elseBlock = conditionalUtil.getSingleBlock(types, blocks.elseBlock, errorInfos);

    return types.ConditionalExpression(condition, ifBlock, elseBlock);
  }
};
