var expect = require('chai').expect;

var errorUtil = require('../../src/util/error');
var renderError = errorUtil.renderErrorMessage;
var errors = errorUtil.ERRORS;


describe('when encountering errors', function () {
  it('should fail for an <If> with no condition', function () {
    expect(function () {
      require('../fixtures/errors/if-with-no-condition.jsx');
    }).to.throw(Error, renderError(errors.NO_ATTRIBUTE, {attribute: 'condition', element: 'If'}));
  });

  it('should fail for a <For> with no of', function () {
    expect(function () {
      require('../fixtures/errors/for-with-no-of.jsx');
    }).to.throw(Error, renderError(errors.NO_ATTRIBUTE, {attribute: 'of', element: 'For'}));
  });

  it('should give location of errors', function() {
    expect(function() {
      require('../fixtures/errors/if-with-no-condition.jsx');
    }).to.throw(Error, /.*7,8.*/);
  });

  it('should fail for an <If> with multiple children', function() {
    expect(function() {
      require('../fixtures/errors/if-with-multiple-children.jsx');
    }).to.throw(Error, renderError(errors.MULTIPLE_CHILDREN));
  });

  it('should fail for an <Else> with multiple children', function() {
    expect(function() {
      require('../fixtures/errors/else-with-multiple-children.jsx');
    }).to.throw(Error, renderError(errors.MULTIPLE_CHILDREN));
  });

  it('should fail for an <For> with multiple children', function() {
    expect(function() {
      require('../fixtures/errors/for-with-multiple-children.jsx');
    }).to.throw(Error, renderError(errors.MULTIPLE_CHILDREN));
  });
});


describe('when encountering the wrong data type', function() {

  it('should fail for a <If> with a non expression "condition" attribute', function () {
    expect(function () {
      require('../fixtures/errors/if-with-non-expression-condition.jsx');
    }).to.throw(Error, renderError(errors.NOT_EXPRESSION_TYPE, {element: 'If', attribute: 'condition'}));
  });

  it('should fail for a <For> with a non string "each" attribute', function () {
    expect(function () {
      require('../fixtures/errors/for-with-non-string-each.jsx');
    }).to.throw(Error, renderError(errors.NOT_STRING_TYPE, {element: 'For', attribute: 'each'}));
  });

  it('should fail for a <For> with non string "index" attribute', function () {
    expect(function () {
      require('../fixtures/errors/for-with-non-string-index.jsx');
    }).to.throw(Error, renderError(errors.NOT_STRING_TYPE, {element: 'For', attribute: 'index'}));
  });

  it('should fail for a <For> with non ExpressionContainer "of" attribute', function () {
    expect(function () {
      require('../fixtures/errors/for-with-non-expression-of.jsx');
    }).to.throw(Error, renderError(errors.NOT_EXPRESSION_TYPE, {element: 'For', attribute: 'of'}));
  });
});
