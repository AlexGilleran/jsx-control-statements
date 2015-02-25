var jstransform = require('jstransform');
var utils = require('jstransform/src/utils');
var _ = require('lodash');
var Syntax = jstransform.Syntax;
var xjsElementDepth = 0;

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

  if (insideXjsElement()) {
    utils.append('{ ', state);
  }
  utils.move(condition.value.expression.range[0], state);
  utils.catchup(condition.value.expression.range[1], state);
  utils.append(' ? (', state);
  utils.move(object.openingElement.range[1], state);
  
  var hasElse = object.children.some(function (child) {
    if (child.type === 'XJSElement' && child.openingElement.name.name === 'Else') {
      utils.catchup(child.range[0], state);
      utils.append(') : (', state);
      utils.move(child.range[1], state);
      
      return true;
    }
    
    return false;
  });
  
  utils.catchup(object.closingElement.range[0], state);
  utils.append(hasElse ? ')' : ') : \'\'', state);
  if (insideXjsElement()) {
    utils.append(' }', state);
  }
  utils.move(object.closingElement.range[1], state);
}

function throwNoAttrs() {
  throw new Error("<if> tag with no condition attribute")
}

function insideXjsElement() {
  return xjsElementDepth > 0;
}

visitIfTag.test = function (object, path, state) {
  if (object.type === 'XJSOpeningElement' && !object.selfClosing) {
    xjsElementDepth++;
  } else if (object.type === 'XJSClosingElement') {
    xjsElementDepth--
  }
  return object.type === 'XJSElement' && object.openingElement.name.name === 'If';
};

module.exports = {
  visitorList: [visitIfTag]
};