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

describe('requiring in component with no else', function () {
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
