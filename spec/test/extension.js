var chai = require('chai');
var spies = require('chai-spies');
var util = require('../testUtil');

chai.use(spies);
var expect = chai.expect;


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

describe('extension: multiple children', function() {
  var FixtureIf = require('../fixtures/extension/if-with-multiple-children.jsx');
  var FixtureChoose = require('../fixtures/extension/choose-with-multiple-children.jsx');
  var FixtureFor = require('../fixtures/extension/for-with-multiple-children.jsx');

  it('should allow for multiple children within <If>', function() {
    var consoleSpy = chai.spy.on(console, 'error');
    var rendered = util.render(FixtureIf, {condition: true});

    expect(rendered).to.contain('if rendered');
    expect(rendered).to.contain('test');
    expect(consoleSpy).to.not.have.been.called();
  });

  it('should allow for multiple children within <Else>', function() {
    var consoleSpy = chai.spy.on(console, 'error');
    var rendered = util.render(FixtureIf);

    expect(rendered).to.contain('else rendered');
    expect(rendered).to.contain('test');
    expect(consoleSpy).to.not.have.been.called();
  });

  it('should allow for multiple children within <When>', function() {
    var consoleSpy = chai.spy.on(console, 'error');
    var rendered = util.render(FixtureChoose, {when: true});

    expect(rendered).to.contain('When1');
    expect(rendered).to.contain('When2');
    expect(consoleSpy).to.not.have.been.called();
  });

  it('should allow for multiple children within <Otherwise>', function() {
    var consoleSpy = chai.spy.on(console, 'error');
    var rendered = util.render(FixtureChoose);

    expect(rendered).to.contain('Other1');
    expect(rendered).to.contain('Other2');
    expect(consoleSpy).to.not.have.been.called();
  });

  it('should allow for multiple children within <For>', function() {
    var consoleSpy = chai.spy.on(console, 'error');
    var rendered = util.render(FixtureFor, {items: [1, 2, 3]});

    expect(rendered).to.contain('>1<');
    expect(rendered).to.contain('1test');
    expect(rendered).to.contain('>2<');
    expect(rendered).to.contain('2test');
    expect(rendered).to.contain('>3<');
    expect(rendered).to.contain('3test');
    expect(consoleSpy).to.not.have.been.called();
  });
});
