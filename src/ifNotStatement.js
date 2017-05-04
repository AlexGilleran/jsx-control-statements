var astUtil = require("./util/ast");
var conditionalUtil = require("./util/conditional");

var ELEMENTS = {
  IFNOT: "IfNot"
};

function getBlocks(nodes) {
  var result = [];

  nodes.forEach(function(node) {
    result.push(node);
  });

  return result;
}

module.exports = function ifNotStatement(babel) {
  var types = babel.types;

  return function(node, file) {
    var ifBlock;
    var elseBlock;
    var errorInfos = {node: node, file: file, element: ELEMENTS.IFNOT};
    var condition = conditionalUtil.getConditionExpression(node, errorInfos);
    var key = astUtil.getKey(node);
    var children = astUtil.getChildren(types, node);
    var blocks = getBlocks(children);

    ifBlock = astUtil.getSanitizedExpressionForContent(types, [], key);
    elseBlock = astUtil.getSanitizedExpressionForContent(types, blocks, key);

    return types.ConditionalExpression(condition, ifBlock, elseBlock);
  };
};
