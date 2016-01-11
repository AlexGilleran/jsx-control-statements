var React = require('react');
var ReactDOMServer = require('react-dom/server');
var expect = require('chai').expect;


describe('extensions', function() {
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
