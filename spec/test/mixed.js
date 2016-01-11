var React = require('react');
var ReactDOMServer = require('react-dom/server');
var expect = require('chai').expect;


describe('nesting if within for', function () {
  var IfInsideFor = require('../fixtures/if-inside-for.jsx');

  it('should render only the item where if condition is true', function () {
    var ifInsideFor = React.createElement(IfInsideFor, {blahs: ['blah1', 'blah2', 'blah3']});
    var rendered = ReactDOMServer.renderToString(ifInsideFor);
    expect(rendered).to.contain('blah1');
    expect(rendered).to.not.contain('blah2');
  });

  it('should render nothing if condition is false', function () {
    var ifInsideFor = React.createElement(IfInsideFor, {blahs: ['nope', 'nope2', 'nope3']});
    var rendered = ReactDOMServer.renderToString(ifInsideFor);
    expect(rendered).to.not.contain('Not Rendered');
    expect(rendered).to.not.contain('<span');
  });
});

describe('nesting for within if', function () {
  var ForInsideIf = require('../fixtures/for-inside-if.jsx');

  it('should render only the first loop when if condition is true', function () {
    var forInsideIf = React.createElement(ForInsideIf, {
      blahs: ['blah1', 'blah2', 'blah3'],
      otherBlahs: ['notBlah1', 'notBlah2', 'notBlah3'],
      test: true
    });
    var rendered = ReactDOMServer.renderToString(forInsideIf);
    expect(rendered).to.contain('blah1');
    expect(rendered).to.contain('blah2');
    expect(rendered).to.contain('blah3');
    expect(rendered).not.to.contain('notBlah');
  });

  it('should render the second loop when if condition is false', function () {
    var forInsideIf = React.createElement(ForInsideIf, {
      blahs: ['blah1', 'blah2', 'blah3'],
      otherBlahs: ['notBlah1', 'notBlah2', 'notBlah3'],
      test: false
    });
    var rendered = ReactDOMServer.renderToString(forInsideIf);
    expect(rendered).to.contain('notBlah1');
    expect(rendered).to.contain('notBlah2');
    expect(rendered).to.contain('notBlah3');
    expect(rendered).not.to.contain('blah');
  });
});
