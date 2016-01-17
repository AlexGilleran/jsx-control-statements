var expect = require('chai').expect;
var util = require('../testUtil');

describe('extensions', function() {
  var IfStringLiteral = require('../fixtures/extension/if-with-string-literal.jsx');
  var IfExpressionContainer = require('../fixtures/extension/if-with-expression-container.jsx');
  var ForExpressionContainer = require('../fixtures/extension/for-with-expression-container.jsx');

  it('should handle string literals within if tag', function() {
    var rendered = util.render(IfStringLiteral, {condition: true});
    expect(rendered).to.contain('if rendered');
    expect(rendered).not.to.contain('<span');
  });

  it('should handle string literals within else tag', function() {
    var rendered = util.render(IfStringLiteral, {condition: false});
    expect(rendered).to.contain('else rendered');
    expect(rendered).not.to.contain('<span');
  });

  it('should handle expression containers within if tag', function() {
    var rendered = util.render(IfExpressionContainer, {condition: true});
    expect(rendered).to.contain('rendered');
    expect(rendered).not.to.contain('<span');
  });

  it('should handle expression containers within else tag', function() {
    var rendered = util.render(IfExpressionContainer, {condition: false});
    expect(rendered).to.contain('rendered');
    expect(rendered).not.to.contain('<span');
  });

  it('should handle expression containers within for tag', function() {
    var rendered = util.render(ForExpressionContainer, {items: ["test1", "test2", "test3"]});
    expect(rendered).to.contain('test1');
    expect(rendered).to.contain('test2');
    expect(rendered).to.contain('test3');
    expect(rendered).to.contain('<span');
  });
});
