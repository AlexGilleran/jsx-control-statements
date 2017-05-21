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
      params.push(types.identifier(attribute));
      if (astUtil.isExpressionContainer(attributes[attribute])) {
        values.push(attributes[attribute].value.expression);
      }
      else {
        values.push(attributes[attribute].value);
      }
    });

    values.unshift(types.identifier("this"));

    return types.callExpression(
      types.memberExpression(
        types.functionExpression(
          null,
          params,
          types.blockStatement([
            types.returnStatement(
              astUtil.getSanitizedExpressionForContent(types, children, key)
            )
          ])
        ),
        types.identifier("call")
      ),
      values
    );
  };
};
