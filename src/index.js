var transformIf = require('./ifStatement');
var transformFor = require('./forStatement');


module.exports = function (babel) {

  var nodeHandlers = {
    'For': transformFor(babel),
    'If': transformIf(babel)
  };

  var visitor = {
    JSXElement: function (path) {
      var nodeName = path.node.openingElement.name.name;
      var handler = nodeHandlers[nodeName];

      if (handler) {
        path.replaceWith(handler(path.node, path.hub.file));
      }
    }
  };

  return {
    inherits: require("babel-plugin-syntax-jsx"),
    visitor: visitor
  };
};
