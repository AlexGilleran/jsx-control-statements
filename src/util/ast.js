var _ = require('lodash');

var TYPES = {
  ELEMENT: 'JSXElement',
  EXPRESSION_CONTAINER: 'JSXExpressionContainer',
  STRING_LITERAL: 'StringLiteral'
};

/**
 * Test if this is a custom JSX element with the given name.
 *
 * @param {object} node - Current node to test
 * @param {string} tagName - Name of element
 * @returns {boolean} whether the searched for element was found
 */
exports.isTag = function (node, tagName) {
  return node.type === TYPES.ELEMENT
    && node.openingElement
    && node.openingElement.name
    && node.openingElement.name.name === tagName;
};

/**
 * Tests whether this is an JSXExpressionContainer and returns it if true.
 *
 * @param {object} attribute - The attribute the value of which is tested
 * @returns {null|JSXExpressionContainer}
 */
exports.isExpressionContainer = function(attribute) {
  return attribute
    && attribute.value
    && attribute.value.type === TYPES.EXPRESSION_CONTAINER;
};

exports.getExpression = function(attribute) {
  return attribute.value.expression;
};

/**
 * Tests whether this is an StringLiteral and returns it if true.
 *
 * @param {object} attribute - The attribute the value of which is tested
 * @returns {null|string}
 */
exports.isStringLiteral = function(attribute) {
  return attribute
    && attribute.value
    && attribute.value.type === TYPES.STRING_LITERAL
    ? attribute.value.type : null;
};

/**
 * Get all attributes from given element.
 *
 * @param {JSXElement} node - Current node from which attributes are gathered
 * @returns {object} Map of all attributes with their name as key
 */
exports.getAttributeMap = function (node) {
  if (!node.openingElement || !node.openingElement.attributes) {
    return {};
  }

  return _.reduce(node.openingElement.attributes, function(result, attr) {
    if (attr.name && attr.name.name) {
      result[attr.name.name] = attr;
    }
    return result;
  }, {});
};

/**
 * Get all children from given element. Normalizes JSXText and JSXExpressionContainer to expressions.
 *
 * @param {object} babelTypes - Babel lib
 * @param {JSXElement} node - Current node from which children are gathered
 * @returns {array} List of all children
 */
exports.getChildren = function(babelTypes, node) {
  return babelTypes.react.buildChildren(node);
};
