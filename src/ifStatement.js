var astUtil = require("./util/ast");
var conditionalUtil = require("./util/conditional");

var ELEMENTS = {
  IF: "If",
  ELSE: "Else"
};

function getBlocks(nodes) {
  var result = {
    ifBlock: [],
    elseBlock: []
  };
  var currentBlock = result.ifBlock;

  nodes.forEach(function(node) {
    if (astUtil.isTag(node, ELEMENTS.ELSE)) {
      currentBlock = result.elseBlock;
    }
    else {
      currentBlock.push(node);
    }
  });

  return result;
}

module.exports = function ifStatement(babel) {
  var types = babel.types;

  return function(node, file) {
    var ifBlock;
    var elseBlock;
    var errorInfos = {node: node, file: file, element: ELEMENTS.IF};
    var condition = conditionalUtil.getConditionExpression(node, errorInfos);
    var key = astUtil.getKey(node);
    var children = astUtil.getChildren(types, node);
    var blocks = getBlocks(children);

    ifBlock = astUtil.getSanitizedExpressionForContent(types, blocks.ifBlock, key);
    elseBlock = astUtil.getSanitizedExpressionForContent(types, blocks.elseBlock, key);

    return types.ConditionalExpression(condition, ifBlock, elseBlock);
  };
};
