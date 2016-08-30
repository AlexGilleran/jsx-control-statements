var astUtil = require("./ast");
var errorUtil = require("./error");


var ATTRIBUTES = {
  CONDITION: "condition"
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
