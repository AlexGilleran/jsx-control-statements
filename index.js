var jstransform = require('jstransform');
var utils = require('jstransform/src/utils');
var _ = require('lodash');
var Syntax = jstransform.Syntax;
var hasElse;
var xjsElementDepth = 0;

function trackXjsElementDepth() {}
trackXjsElementDepth.test = function (object, path, state) {
  if (object.name && (object.name.name === 'If' || object.name.name === 'For')) {
    return;
  }

  if (object.type === 'XJSOpeningElement' && !object.selfClosing) {
    xjsElementDepth++;
  } else if (object.type === 'XJSClosingElement') {
    xjsElementDepth--
  }
}

function visitStartIfTag(traverse, object, path, state) {
  hasElse = false

  var attributes = object.attributes;
  
  if (!attributes || !attributes.length) {
    throwNoConditionAttr();
  }
  
  var condition = _.find(attributes, function (attr) {
    return attr.name.name === 'condition'
  });
  
  if (!condition) {
    throwNoConditionAttr();
  }

  if (insideXjsElement()) {
    utils.append('{ ', state);
  }

  utils.move(condition.value.expression.range[0], state);
  utils.catchup(condition.value.expression.range[1], state);
  utils.append(' ? (', state);
  utils.move(object.range[1], state);
}

visitStartIfTag.test = function (object, path, state) {
  return object.type === 'XJSOpeningElement' && object.name.name === 'If';
}

function visitElseTag(traverse, object, path, state) {
  hasElse = true;
  utils.catchup(object.range[0], state);
  utils.append(') : (', state);
  utils.move(object.range[1], state);
}

visitElseTag.test = function (object, path, state) {
  return object.type === 'XJSElement' && object.openingElement.name.name === 'Else';
};

function visitEndIfTag(traverse, object, path, state) {
  utils.catchup(object.range[0], state);
  utils.append(hasElse ? ')' : ') : \'\'', state);
  if (insideXjsElement()) {
    utils.append(' }', state);
  }
  utils.move(object.range[1], state);
}

visitEndIfTag.test = function (object, path, state) {
  return object.type === 'XJSClosingElement' && object.name.name === 'If';
};

function throwNoConditionAttr() {
  throw new Error("<If> tag with no condition attribute")
}

function insideXjsElement() {
  return xjsElementDepth > 0;
}

function visitForTag(traverse, object, path, state) {
  var attributes = object.openingElement.attributes;

  if (!attributes || !attributes.length) {
    throwNoEachAttr();
  }

  var each, of;
  attributes.forEach(function (attr) {
    if (attr.name.name === 'each') {
      each = attr;
    } else if (attr.name.name === 'of') {
      of = attr;
    }
  });

  if (!each && !of) {
    throwNoEachAttr();
  }

  if (insideXjsElement()) {
    utils.append('{ ', state);
  }
  utils.move(of.value.expression.range[0], state);
  utils.catchup(of.value.expression.range[1], state);
  utils.append('.map(function(', state);
  utils.move(each.value.range[0] + 1, state);
  utils.catchup(each.value.range[1] - 1, state);
  utils.append(') { return (', state);

  utils.move(object.openingElement.range[1], state);
  utils.catchup(object.closingElement.range[0], state);

  utils.append(')}, this)', state);
  if (insideXjsElement()) {
    utils.append('}', state);
  }
  utils.move(object.closingElement.range[1], state);
}

visitForTag.test = function (object, path, state) {
  return object.type === 'XJSElement' && object.openingElement.name.name === 'For';
};

function throwNoEachAttr() {
  throw new Error('<For> tag with no \'each\' or \'of\' attribute')
}

module.exports = {
  visitorList: [trackXjsElementDepth, visitStartIfTag, visitElseTag, visitEndIfTag, visitForTag]
};