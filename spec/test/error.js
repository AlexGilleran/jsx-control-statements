var expect = require('chai').expect;
var errors = require('../../src/error');


describe('when encountering errors', function () {
  it('should fail for an <If> with no condition', function () {
    expect(function () {
      require('../fixtures/errors/if-with-no-condition.jsx');
    }).to.throw(Error, errors.IF_WITH_NO_CONDITION);
  });

  it('should fail for a <For> with no attributes', function () {
    expect(function () {
      require('../fixtures/errors/for-with-no-attributes.jsx');
    }).to.throw(Error, errors.FOR_WITH_NO_ATTRIBUTES);
  });

  it('should fail for a <For> with no of', function () {
    expect(function () {
      require('../fixtures/errors/for-with-no-of.jsx');
    }).to.throw(Error, errors.FOR_WITH_NO_ATTRIBUTES);
  });

  it('should give location of errors', function() {
    expect(function() {
      require('../fixtures/errors/if-with-no-condition.jsx');
    }).to.throw(Error, /.*7,8.*/);
  });

  it('should fail for an <If> with multiple children', function() {
    expect(function() {
      require('../fixtures/errors/if-with-multiple-children.jsx');
    }).to.throw(Error, errors.MULTIPLE_CHILDREN);
  });

  it('should fail for an <Else> with multiple children', function() {
    expect(function() {
      require('../fixtures/errors/else-with-multiple-children.jsx');
    }).to.throw(Error, errors.MULTIPLE_CHILDREN);
  });

  it('should fail for an <For> with multiple children', function() {
    expect(function() {
      require('../fixtures/errors/for-with-multiple-children.jsx');
    }).to.throw(Error, errors.MULTIPLE_CHILDREN);
  });
});
