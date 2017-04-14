var astUtil = require("./util/ast");

module.exports = function(babel) {
  var types = babel.types;

  return function(node) {
    var params = [];
    var values = [];
    var key = astUtil.getKey(node);
    var attributes = astUtil.getAttributeMap(node);
    var children = astUtil.getChildren(types, node);

    Object.keys(attributes).forEach(function(attribute) {
      params.push(types.Identifier(attribute));
      if (astUtil.isExpressionContainer(attributes[attribute])) {
        values.push(attributes[attribute].value.expression);
      }
      else {
        values.push(attributes[attribute].value);
      }
    });

    return types.callExpression(
      types.arrowFunctionExpression(
        params,
        types.blockStatement([
          types.returnStatement(
            astUtil.getSanitizedExpressionForContent(types, children, key)
          )
        ])
      ),
      values
    );
  };
};
