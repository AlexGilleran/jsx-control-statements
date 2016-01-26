var astUtil = require('./util/ast');
var conditionalUtil = require('./util/conditional');
var errorUtil = require('./util/error');

var ELEMENTS = {
  CHOOSE: 'Choose',
  WHEN: 'When',
  OTHERWISE: 'Otherwise'
};


function getBlocks(types, children, errorInfos) {
  var childNodes;
  var result = {};
  result[ELEMENTS.WHEN] = [];

  children.reduceRight(function(result, child) {
    if (astUtil.isTag(child, ELEMENTS.OTHERWISE)) {
      childNodes = astUtil.getChildren(types, child);
      errorInfos.element = ELEMENTS.OTHERWISE;
      errorInfos.node = child;

      if (result[ELEMENTS.WHEN].length) {
        errorUtil.throwChooseOtherwiseNotLast(errorInfos);
      }
      else if (result[ELEMENTS.OTHERWISE]) {
        errorUtil.throwChooseWithMultipleOtherwise(errorInfos);
      }

      result[ELEMENTS.OTHERWISE] = astUtil.getSanitizedExpressionForContent(types, childNodes);
    }
    else if (astUtil.isTag(child, ELEMENTS.WHEN)) {
      childNodes = astUtil.getChildren(types, child);
      errorInfos.element = ELEMENTS.WHEN;
      errorInfos.node = child;

      result[ELEMENTS.WHEN].push({
        condition: conditionalUtil.getConditionExpression(child, errorInfos),
        children: astUtil.getSanitizedExpressionForContent(types, childNodes)
      });
    }
    else {
      errorInfos.element = ELEMENTS.CHOOSE;
      errorInfos.node = child;
      errorUtil.throwChooseWithWrongChildren(errorInfos);
    }

    return result;
  }, result);

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
    var blocks = getBlocks(types, children, errorInfos);
    var ternaryExpression = blocks[ELEMENTS.OTHERWISE];

    if (!blocks[ELEMENTS.WHEN].length) {
      errorInfos.node = node;
      errorUtil.throwChooseWithoutWhen(errorInfos);
    }

    blocks[ELEMENTS.WHEN].reverse().forEach(function(whenBlock) {
      ternaryExpression = types.ConditionalExpression(whenBlock.condition, whenBlock.children, ternaryExpression);
    });

    return ternaryExpression;
  }
};
