var transformFor = require("./forStatement");
var transformIf = require("./ifStatement");
var transformChoose = require("./chooseStatement");
var transformWith = require("./withStatement");


module.exports = function jcsPlugin(babel) {
  var nodeHandlers = {
    For: transformFor(babel),
    If: transformIf(babel),
    Choose: transformChoose(babel),
    With: transformWith(babel)
  };

  var visitor = {
    JSXElement: function(path) {
      var nodeName = path.node.openingElement.name.name;
      var handler = nodeHandlers[nodeName];

      if (handler) {
        path.replaceWith(handler(path.node, path.hub.file));
      }
    }
  };

  return {
    visitor: visitor
  };
};
