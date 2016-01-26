var _ = require('lodash');

var TYPES = {
  ELEMENT: 'JSXElement',
  EXPRESSION_CONTAINER: 'JSXExpressionContainer',
  STRING_LITERAL: 'StringLiteral'
};

function getTagName (node) {
  return node.openingElement.name.name;
}

/**
 * Test if this is a custom JSX element with the given name.
 *
 * @param {object} node - Current node to test
 * @param {string} tagName - Name of element
 * @returns {boolean} whether the searched for element was found
 */
exports.isTag = isTag = function (node, tagName) {
  return node.type === TYPES.ELEMENT && getTagName(node) === tagName;
};


/**
 * Tests whether this is an JSXExpressionContainer and returns it if true.
 *
 * @param {object} attribute - The attribute the value of which is tested
 * @returns {boolean}
 */
exports.isExpressionContainer = function(attribute) {
  return attribute && attribute.value.type === TYPES.EXPRESSION_CONTAINER;
};

/**
 * Get expression from given attribute.
 *
 * @param {JSXAttribute} attribute
 * @returns {Expression}
 */
exports.getExpression = function(attribute) {
  return attribute.value.expression;
};

/**
 * Tests whether this is an StringLiteral and returns it if true.
 *
 * @param {object} attribute - The attribute the value of which is tested
 * @returns {boolean}
 */
exports.isStringLiteral = function(attribute) {
  return attribute && attribute.value.type === TYPES.STRING_LITERAL;
};

/**
 * Get all attributes from given element.
 *
 * @param {JSXElement} node - Current node from which attributes are gathered
 * @returns {object} Map of all attributes with their name as key
 */
exports.getAttributeMap = function (node) {
  return _.reduce(node.openingElement.attributes, function(result, attr) {
    result[attr.name.name] = attr;
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

/**
 * Adds attribute 'key' to given node, if not already preesent.
 *
 * @param {object} babelTypes - Babel lib
 * @param {JSXElement} node - Current node to which the new attribute is added
 * @param {string} keyValue - Value of the key
 */
var addKeyAttribute = exports.addKeyAttribute = function(babelTypes, node, keyValue) {
  var key = _.find(node.openingElement.attributes, function(attrib) { return attrib.name.name === 'key' });
  if (!key) {
    var keyAttrib = babelTypes.jSXAttribute(babelTypes.jSXIdentifier('key'), babelTypes.stringLiteral(''+keyValue));
    node.openingElement.attributes.push(keyAttrib)
  }
};

/**
 * Return either a NullLiteral (if no content is available) or
 * the single expression (if there is only one) or an ArrayExpression.
 *
 * @param babelTypes - Babel lib
 * @param blocks - the content blocks
 * @returns {NullLiteral|Expression|ArrayExpression}
 */
exports.getSanitizedExpressionForContent = function(babelTypes, blocks) {
  if (!blocks.length) {
    return babelTypes.NullLiteral();
  }
  else if (blocks.length == 1) {
    return blocks[0];
  }

  for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];
    if (babelTypes.isJSXElement(block)) {
      addKeyAttribute(babelTypes, block, i);
    }
  }

  return babelTypes.arrayExpression(blocks);
};
