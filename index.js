var jstransform = require('jstransform');
var utils = require('jstransform/src/utils');
var _ = require('lodash');

var Syntax = jstransform.Syntax;

function visitIfTag(traverse, object, path, state) {
  var attributes = object.openingElement.attributes;
  
  if (!attributes || !attributes.length) {
    throwNoAttrs();
  }
  
  var condition = _.find(attributes, function (attr) {
    return attr.name.name === 'condition'
  });
  
  if (!condition) {
    throwNoAttrs();
  }
  
  utils.append('{ ', state);
  utils.move(condition.value.expression.range[0], state);
  utils.catchup(condition.value.expression.range[1], state);
  utils.append(' ? ', state);
  utils.move(object.openingElement.range[1], state);
  
  var hasElse = object.children.some(function (child) {
    if (child.type === 'XJSElement' && child.openingElement.name.name === 'Else') {
      utils.catchup(child.range[0], state);
      utils.append(' : ', state);
      utils.move(child.range[1], state);
      
      return true;
    }
    
    return false;
  });
  
  utils.catchup(object.closingElement.range[0], state);
  utils.append(hasElse ? '}' : ' : \'\' }', state);
  utils.move(object.closingElement.range[1], state);
}

function throwNoAttrs() {
  throw new Error("<if> tag with no condition attribute")
}

visitIfTag.test = function (object, path, state) {
  return object.type === 'XJSElement' && object.openingElement.name.name === 'If';
};

module.exports = {
  visitorList: [visitIfTag]
};