var TYPES = {
  ELEMENT: "JSXElement",
  EXPRESSION_CONTAINER: "JSXExpressionContainer",
  STRING_LITERAL: "StringLiteral"
};

function getTagName(node) {
  return node.openingElement.name.name;
}

/**
 * Test if this is a custom JSX element with the given name.
 *
 * @param {object} node - Current node to test
 * @param {string} tagName - Name of element
 * @returns {boolean} whether the searched for element was found
 */
exports.isTag = function(node, tagName) {
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
exports.getAttributeMap = function(node) {
  return node.openingElement.attributes.reduce(function(result, attr) {
    result[attr.name.name] = attr;
    return result;
  }, {});
};

/**
 * Get the string value of a node's key attribute if present.
 *
 * @param {JSXElement} node - Node to get attributes from
 * @returns {object} The string value of the key attribute of this node if present, otherwise undefined.
 */
exports.getKey = function(node) {
  var key = exports.getAttributeMap(node).key;
  return key ? key.value.value : undefined;
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
 * Adds attribute "key" to given node, if not already preesent.
 *
 * @param {object} babelTypes - Babel lib
 * @param {JSXElement} node - Current node to which the new attribute is added
 * @param {string} keyValue - Value of the key
 */
var addKeyAttribute = exports.addKeyAttribute = function(babelTypes, node, keyValue) {
  var keyFound = false;

  node.openingElement.attributes.forEach(function(attrib) {
    if (babelTypes.isJSXAttribute(attrib) && attrib.name.name === "key") {
      keyFound = true;
      return false;
    }
  });

  if (!keyFound) {
    var keyAttrib = babelTypes.jSXAttribute(babelTypes.jSXIdentifier("key"), babelTypes.stringLiteral("" + keyValue));
    node.openingElement.attributes.push(keyAttrib);
  }
};

/**
 * Return either a NullLiteral (if no content is available) or
 * the single expression (if there is only one) or an ArrayExpression.
 *
 * @param babelTypes - Babel lib
 * @param blocks - the content blocks
 * @param keyPrefix - a prefix to use when automatically generating keys
 * @returns {NullLiteral|Expression|ArrayExpression}
 */
exports.getSanitizedExpressionForContent = function(babelTypes, blocks, keyPrefix) {
  if (!blocks.length) {
    return babelTypes.NullLiteral();
  }
  else if (blocks.length === 1) {
    var firstBlock = blocks[0];

    if (keyPrefix && firstBlock.openingElement) {
      addKeyAttribute(babelTypes, firstBlock, keyPrefix);
    }

    return firstBlock;
  }

  for (var i = 0; i < blocks.length; i++) {
    var thisBlock = blocks[i];
    if (babelTypes.isJSXElement(thisBlock)) {
      var key = keyPrefix ? keyPrefix + "-" + i : i;
      addKeyAttribute(babelTypes, thisBlock, key);
    }
  }

  return babelTypes.arrayExpression(blocks);
};
