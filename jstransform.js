var utils = require('jstransform/src/utils');
var _ = require('lodash');
var errors = require('./error-messages');

var IN_JSX_ELEMENT = 1;
var IN_CONTROL_STATEMENT = 2;

// TODO: This immensely stateful approach works, but is there a nicer way to do it?
// Note: Not a problem at all through babel, might be nice to nuke this altogether at some point.
var hasElse = false;
var contextStack = [];

function trackXjsElementDepthEntering() {}
trackXjsElementDepthEntering.test = function (object, path, state) {
  if ((object.type === 'JSXOpeningElement' || object.type === 'XJSOpeningElement') && !object.selfClosing) {
    if (object.name && (object.name.name === 'If' || object.name.name === 'For')) {
      contextStack.push(IN_CONTROL_STATEMENT);
    } else {
      contextStack.push(IN_JSX_ELEMENT);
    }
  }

  return false;
};

function trackXjsElementDepthLeaving() {}
trackXjsElementDepthLeaving.test = function (object, path, state) {
  if (object.type === 'JSXClosingElement' || object.type === 'XJSClosingElement') {
    contextStack.pop();
  }

  return false;
};

function visitStartIfTag(traverse, object, path, state) {
  hasElse = false;

  var attributes = object.attributes;

  if (!attributes || !attributes.length) {
    throw new Error(errors.IF_WITH_NO_CONDITION);
  }

  var condition = _.find(attributes, function (attr) {
    return attr.name.name === 'condition'
  });

  if (!condition) {
    throw new Error(errors.IF_WITH_NO_CONDITION);
  }

  if (shouldWrapCurlyBrackets()) {
    utils.append('{ ', state);
  }

  utils.move(condition.value.expression.range[0], state);
  utils.catchup(condition.value.expression.range[1], state);
  utils.append(' ? (', state);
  utils.move(object.range[1], state);
}

visitStartIfTag.test = function (object, path, state) {
  return ((object.type === 'JSXOpeningElement' || object.type === 'XJSOpeningElement') && object.name.name === 'If');
};

function visitElseTag(traverse, object, path, state) {
  hasElse = true;
  utils.catchup(object.range[0], state);
  utils.append(') : (', state);
  utils.move(object.range[1], state);
}

visitElseTag.test = function (object, path, state) {
  return ((object.type === 'JSXElement' || object.type === 'XJSElement') && object.openingElement.name.name === 'Else');
};

function visitEndIfTag(traverse, object, path, state) {
  utils.catchup(object.range[0], state);
  utils.append(hasElse ? ')' : ') : null', state);
  if (shouldWrapCurlyBrackets()) {
    utils.append(' }', state);
  }
  utils.move(object.range[1], state);

  contextStack.pop();
}

visitEndIfTag.test = function (object, path, state) {
  return ((object.type === 'JSXClosingElement' || object.type === 'XJSClosingElement') && object.name.name === 'If');
};

function visitStartForTag(traverse, object, path, state) {
  var attributes = object.attributes;

  if (!attributes || !attributes.length) {
    throw new Error(errors.FOR_WITH_NO_ATTRIBUTES);
  }

  var each, of, index;
  attributes.forEach(function (attr) {
    if (attr.name.name === 'each') {
      each = attr;
    } else if (attr.name.name === 'of') {
      of = attr;
    } else if (attr.name.name === 'index') {
      index = attr;
    }
  });

  if (!each || !of) {
    throw new Error(errors.FOR_WITH_NO_ATTRIBUTES);
  }

  if (shouldWrapCurlyBrackets()) {
    utils.append('{ ', state);
  }
  utils.move(of.value.expression.range[0], state);
  utils.catchup(of.value.expression.range[1], state);
  utils.append('.map(function(', state);
  utils.move(each.value.range[0] + 1, state);
  utils.catchup(each.value.range[1] - 1, state);

  if (index) {
    utils.append(', ' + index.value.value, state);
  }
  utils.append(') { return (', state);

  utils.move(object.range[1], state);
}

visitStartForTag.test = function (object, path, state) {
  return ((object.type === 'JSXOpeningElement' || object.type === 'XJSOpeningElement') && object.name.name === 'For');
};

function visitEndForTag(traverse, object, path, state) {
  utils.append('); }, this)', state);
  if (shouldWrapCurlyBrackets()) {
    utils.append('}', state);
  }
  utils.move(object.range[1], state);

  contextStack.pop();
}

visitEndForTag.test = function (object, path, state) {
  return ((object.type === 'JSXClosingElement' || object.type === 'XJSClosingElement') && object.name.name === 'For');
};

function shouldWrapCurlyBrackets() {
  return  contextStack.length > 0 && contextStack[contextStack.length - 2] === IN_JSX_ELEMENT;
}

module.exports = {
  visitorList: [trackXjsElementDepthEntering, visitStartIfTag, visitElseTag, visitEndIfTag, visitStartForTag, visitEndForTag, trackXjsElementDepthLeaving]
};
