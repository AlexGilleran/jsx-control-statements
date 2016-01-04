var React = require('react');
var ReactDOMServer = require('react-dom/server');

var plugin = require('../../babel');
var expect = require('chai').expect;
var errors = require('../../error-messages');

require("babel-core/register")({
  presets: ['babel-preset-react'],
  plugins: [plugin],
  cache: false
});

var tests = require('../tests');

describe('with the babel plugin', function() {
  tests();

  describe('extensions (babel-specific)', function() {
    var IfStringLiteral = require('../fixtures/if-with-string-literal.jsx');
    var IfExpressionContainer = require('../fixtures/if-with-expression-container.jsx');
    var ForExpressionContainer = require('../fixtures/for-with-expression-container.jsx');


    it('should handle string literals within if tag', function() {
      var ifStringLiteral = React.createElement(IfStringLiteral, {condition: true});
      var rendered = ReactDOMServer.renderToString(ifStringLiteral);
      expect(rendered).to.contain('if rendered');
      expect(rendered).not.to.contain('<span');
    });

    it('should handle string literals within else tag', function() {
      var ifStringLiteral = React.createElement(IfStringLiteral, {condition: false});
      var rendered = ReactDOMServer.renderToString(ifStringLiteral);
      expect(rendered).to.contain('else rendered');
      expect(rendered).not.to.contain('<span');
    });

    it('should handle expression containers within if tag', function() {
      var ifExpressionContainer = React.createElement(IfExpressionContainer, {condition: true});
      var rendered = ReactDOMServer.renderToString(ifExpressionContainer);
      expect(rendered).to.contain('rendered');
      expect(rendered).not.to.contain('<span');
    });

    it('should handle expression containers within else tag', function() {
      var ifExpressionContainer = React.createElement(IfExpressionContainer, {condition: false});
      var rendered = ReactDOMServer.renderToString(ifExpressionContainer);
      expect(rendered).to.contain('rendered');
      expect(rendered).not.to.contain('<span');
    });

    it('should handle expression containers within for tag', function() {
      var forExpressionContainer = React.createElement(ForExpressionContainer, {items: ["test1", "test2", "test3"]});
      var rendered = ReactDOMServer.renderToString(forExpressionContainer);
      expect(rendered).to.contain('test1');
      expect(rendered).to.contain('test2');
      expect(rendered).to.contain('test3');
      expect(rendered).to.contain('<span');
    });
  });

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
