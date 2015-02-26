var nodeJsx = require('node-jsx');
var serverTransformer = require('../server-transformer');
var React = require('react');
var expect = require('chai').expect;

nodeJsx.install({
  extension: '.jsx',
  additionalTransform: serverTransformer
});

var IfWithElse = require('./fixtures/if-with-else.jsx');
var IfWithoutElse = require('./fixtures/if-without-else.jsx');
var ForView = require('./fixtures/for.jsx');
var ForViewRevAttrs = require('./fixtures/for-backwards-attributes.jsx');

describe('requiring in component with if/else', function () {
  it('should render if block when condition true', function () {
    var ifWithElse = React.createElement(IfWithElse, {condition: 'blah'});
    var rendered = React.renderToString(ifWithElse);
    expect(rendered).to.contain('<span');
    expect(rendered).to.contain('IfBlock');
    expect(rendered).not.to.contain('ElseBlock');
  });

  it('should render else block when condition false', function () {
    var ifWithElse = React.createElement(IfWithElse);
    var rendered = React.renderToString(ifWithElse);
    expect(rendered).to.contain('<span');
    expect(rendered).to.contain('ElseBlock');
    expect(rendered).not.to.contain('IfBlock');
  });
});

describe('requiring in component with if but no else', function () {
  it('should render if block when condition true', function () {
    var ifWithoutElse = React.createElement(IfWithoutElse, {condition: 'blah'});
    var rendered = React.renderToString(ifWithoutElse);
    expect(rendered).to.contain('<span');
    expect(rendered).to.contain('IfBlock');
    expect(rendered).not.to.contain('ElseBlock');
  });

  it('should render else block when condition false', function () {
    var ifWithoutElse = React.createElement(IfWithoutElse);
    var rendered = React.renderToString(ifWithoutElse);
    expect(rendered).not.to.contain('<span');
    expect(rendered).not.to.contain('IfBlock');
  });
});

describe('requiring in component with for', function () {
  describe('when attributes in normal order', runForTests.bind(this, ForView));
  describe('when attributes in reverse order', runForTests.bind(this, ForViewRevAttrs));

  function runForTests(ComponentDefinition) {
    it('should render list of items', function () {
      var forAsRoot = React.createElement(ComponentDefinition, {blahs: ['blah1', 'blah2', 'blah3']});
      var rendered = React.renderToString(forAsRoot);
      expect(rendered).to.match(/.*span.*blah1test..*span.*span.*blah2test.*span.*blah3test.*span.*/);
    });

    it('should render empty list of items as blank', function () {
      var forAsRoot = React.createElement(ComponentDefinition, {blahs: []});
      var rendered = React.renderToString(forAsRoot);
      expect(rendered).to.match(/<div.*><\/div>/);
    });
  }
});