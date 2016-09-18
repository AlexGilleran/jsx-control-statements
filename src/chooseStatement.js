var astUtil = require("./util/ast");
var conditionalUtil = require("./util/conditional");
var errorUtil = require("./util/error");

var ELEMENTS = {
  CHOOSE: "Choose",
  WHEN: "When",
  OTHERWISE: "Otherwise"
};


function getBlocks(types, children, errorInfos, key) {
  var childNodes;
  var startResult = {};
  startResult[ELEMENTS.WHEN] = [];

  var result = children.reduceRight(function(resultSoFar, child) {
    if (astUtil.isTag(child, ELEMENTS.OTHERWISE)) {
      childNodes = astUtil.getChildren(types, child);
      errorInfos.element = ELEMENTS.OTHERWISE;
      errorInfos.node = child;

      if (resultSoFar[ELEMENTS.WHEN].length) {
        errorUtil.throwChooseOtherwiseNotLast(errorInfos);
      }
      else if (resultSoFar[ELEMENTS.OTHERWISE]) {
        errorUtil.throwChooseWithMultipleOtherwise(errorInfos);
      }

      resultSoFar[ELEMENTS.OTHERWISE] = astUtil.getSanitizedExpressionForContent(types, childNodes, key);
    }
    else if (astUtil.isTag(child, ELEMENTS.WHEN)) {
      childNodes = astUtil.getChildren(types, child);
      errorInfos.element = ELEMENTS.WHEN;
      errorInfos.node = child;

      resultSoFar[ELEMENTS.WHEN].push({
        condition: conditionalUtil.getConditionExpression(child, errorInfos),
        children: astUtil.getSanitizedExpressionForContent(types, childNodes, key)
      });
    }
    else {
      errorInfos.element = ELEMENTS.CHOOSE;
      errorInfos.node = child;
      errorUtil.throwChooseWithWrongChildren(errorInfos);
    }

    return resultSoFar;
  }, startResult);

  if (!result[ELEMENTS.OTHERWISE]) {
    result[ELEMENTS.OTHERWISE] = types.NullLiteral();
  }

  return result;
}

module.exports = function(babel) {
  var types = babel.types;

  return function(node, file) {
    var errorInfos = { node: node, file: file, element: ELEMENTS.CHOOSE };
    var children = astUtil.getChildren(types, node);
    var key = astUtil.getKey(node);
    var blocks = getBlocks(types, children, errorInfos, key);
    var ternaryExpression = blocks[ELEMENTS.OTHERWISE];

    if (!blocks[ELEMENTS.WHEN].length) {
      errorInfos.node = node;
      errorUtil.throwChooseWithoutWhen(errorInfos);
    }

    blocks[ELEMENTS.WHEN].forEach(function(whenBlock) {
      ternaryExpression = types.ConditionalExpression(whenBlock.condition, whenBlock.children, ternaryExpression);
    });

    return ternaryExpression;
  };
};
