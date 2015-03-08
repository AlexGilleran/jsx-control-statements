var utils = require('jstransform/src/utils');
var _ = require('lodash');

var IN_XJS_ELEMENT = 1;
var IN_CONTROL_STATEMENT = 2;

// TODO: This immensely stateful approach works, but is there a nicer way to do it?
var hasElse = false;
var contextStack = [];

function trackXjsElementDepthEntering() {}
trackXjsElementDepthEntering.test = function (object, path, state) {
  if (object.type === 'XJSOpeningElement' && !object.selfClosing) {
    if (object.name && (object.name.name === 'If' || object.name.name === 'For')) {
      contextStack.push(IN_CONTROL_STATEMENT);
    } else {
      contextStack.push(IN_XJS_ELEMENT);
    }
  }

  return false;
}

function trackXjsElementDepthLeaving() {}
trackXjsElementDepthLeaving.test = function (object, path, state) {
  if (object.type === 'XJSClosingElement') {
    contextStack.pop();
  }

  return false;
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

  if (shouldWrapCurlyBrackets()) {
    utils.append('{ ', state);
  }

  utils.move(condition.value.expression.range[0], state);
  utils.catchup(condition.value.expression.range[1], state);
  utils.append(' ? (', state);
  utils.move(object.range[1], state);

  inControlStatement = true;
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
  if (shouldWrapCurlyBrackets()) {
    utils.append(' }', state);
  }
  utils.move(object.range[1], state);

  contextStack.pop();
}

visitEndIfTag.test = function (object, path, state) {
  return object.type === 'XJSClosingElement' && object.name.name === 'If';
};

function visitStartForTag(traverse, object, path, state) {
  var attributes = object.attributes;

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

  if (shouldWrapCurlyBrackets()) {
    utils.append('{ ', state);
  }
  utils.move(of.value.expression.range[0], state);
  utils.catchup(of.value.expression.range[1], state);
  utils.append('.map(function(', state);
  utils.move(each.value.range[0] + 1, state);
  utils.catchup(each.value.range[1] - 1, state);
  utils.append(') { return (', state);

  utils.move(object.range[1], state)
  inControlStatement = true;
}

visitStartForTag.test = function (object, path, state) {
  return object.type === 'XJSOpeningElement' && object.name.name === 'For';
};

function visitEndForTag(traverse, object, path, state) {
  utils.append(')}, this)', state);
  if (shouldWrapCurlyBrackets()) {
    utils.append('}', state);
  }
  utils.move(object.range[1], state);

  contextStack.pop();
}

visitEndForTag.test = function (object, path, state) {
  return object.type === 'XJSClosingElement' && object.name.name === 'For';
};

function throwNoConditionAttr() {
  throw new Error('<If> tag with no condition attribute');
}

function shouldWrapCurlyBrackets() {
  return  contextStack.length > 0 && contextStack[contextStack.length - 2] === IN_XJS_ELEMENT;
}

function throwNoEachAttr() {
  throw new Error('<For> tag with no \'each\' or \'of\' attribute')
}

module.exports = {
  visitorList: [trackXjsElementDepthEntering, visitStartIfTag, visitElseTag, visitEndIfTag, visitStartForTag, visitEndForTag, trackXjsElementDepthLeaving]
};