var plugin = require('../../babel');
var expect = require('chai').expect;
var errors = require('../../error-messages');

require("babel/register")({
  plugins: [plugin]
});

var tests = require('../tests');

describe('with the babel plugin', function() {
  tests();

  describe('when encountering errors (babel-specific)', function() {
    it('should give location of errors', function() {
      expect(function() {
        require('../fixtures/errors/if-with-no-condition.jsx');
      }).to.throw(Error, /.*7,8.*/);
    });

    it('should fail for an <If> with no children', function() {
      expect(function() {
        require('../fixtures/errors/if-with-no-children.jsx');
      }).to.throw(Error, errors.NO_CHILDREN);
    });

    it('should fail for an <If> with multiple children', function() {
      expect(function() {
        require('../fixtures/errors/if-with-multiple-children.jsx');
      }).to.throw(Error, errors.MULTIPLE_CHILDREN);
    });

    it('should fail for an <For> with no children', function() {
      expect(function() {
        require('../fixtures/errors/for-with-no-children.jsx');
      }).to.throw(Error, errors.NO_CHILDREN);
    });

    it('should fail for an <For> with multiple children', function() {
      expect(function() {
        require('../fixtures/errors/for-with-multiple-children.jsx');
      }).to.throw(Error, errors.MULTIPLE_CHILDREN);
    });
  });
});