var astUtil = require('./ast');
var errorUtil = require('./error');


var ATTRIBUTES = {
  CONDITION: 'condition'
};

exports.getSingleBlock = function(types, blocks, errorInfos) {
  if (blocks.length > 1) {
    errorUtil.throwMultipleChildren(errorInfos);
  }
  else if (blocks.length === 0) {
    blocks[0] = types.NullLiteral();
  }

  return blocks[0];
};

exports.getConditionExpression = function(node, errorInfos) {
  var condition = astUtil.getAttributeMap(node)[ATTRIBUTES.CONDITION];

  if (!condition) {
    errorUtil.throwNoAttribute(ATTRIBUTES.CONDITION, errorInfos);
  }
  if (!astUtil.isExpressionContainer(condition)) {
    errorUtil.throwNotExpressionType(ATTRIBUTES.CONDITION, errorInfos);
  }

  return astUtil.getExpression(condition);
};
