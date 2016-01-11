var React = require('react');
var ReactDOMServer = require('react-dom/server');
var expect = require('chai').expect;


describe('requiring in component with minimalistic for', function () {
  var FixtureEmpty = require('../fixtures/for-empty.jsx');
  var FixtureNoEach = require('../fixtures/for-without-each.jsx');

  describe('should render nothing if loop is empty', function() {
    var fixture = React.createElement(FixtureEmpty);
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.match(/<div[^>]*><\/div>/);
  });

  describe('should simply iterate without each', function() {
    var fixture = React.createElement(FixtureNoEach);
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.match(/<div[^>]*>(<span[^>]*>ABC<\/span>){3}<\/div>/);
  });
});

describe('requiring in component with for', function () {
  var ForView = require('../fixtures/for.jsx');
  var ForViewRevAttrs = require('../fixtures/for-backwards-attributes.jsx');

  describe('when attributes in normal order', runForTests.bind(this, ForView));
  describe('when attributes in reverse order', runForTests.bind(this, ForViewRevAttrs));

  function runForTests(ComponentDefinition) {
    it('should render list of items', function () {
      var forAsRoot = React.createElement(ComponentDefinition, {blahs: ['blah1', 'blah2', 'blah3']});
      var rendered = ReactDOMServer.renderToString(forAsRoot);
      expect(rendered).to.match(/.*span.*blah1test..*span.*span.*blah2test.*span.*blah3test.*span.*/);
    });

    it('should render empty list of items as blank', function () {
      var forAsRoot = React.createElement(ComponentDefinition, {blahs: []});
      var rendered = ReactDOMServer.renderToString(forAsRoot);
      expect(rendered).to.match(/<div.*><\/div>/);
    });
  }
});

describe('requiring in component with for with index', function () {
  var ForWithIndex = require('../fixtures/for-with-index.jsx');

  it('should render list of items', function () {
    var forAsRoot = React.createElement(ForWithIndex, {blahs: ['blah1', 'blah2', 'blah3']});
    var rendered = ReactDOMServer.renderToString(forAsRoot);
    expect(rendered).to.match(/.*span.*blah1test0..*span.*span.*blah2test1.*span.*blah3test2.*span.*/);
  });

  it('should render empty list of items as blank', function () {
    var forAsRoot = React.createElement(ForWithIndex, {blahs: []});
    var rendered = ReactDOMServer.renderToString(forAsRoot);
    expect(rendered).to.match(/<div.*><\/div>/);
  });

});

describe('nesting for within for', function () {
  var ForInsideFor = require('../fixtures/nested-for.jsx');

  it('should render only the first loop when if condition is true', function () {
    var forInsideFor = React.createElement(ForInsideFor, {
      blahs: ['blah1', 'blah2', 'blah3'],
      otherBlahs: ['1hlab', '2hlab', '3hlab'],
      test: true
    });
    var rendered = ReactDOMServer.renderToString(forInsideFor);
    expect(rendered).to.contain('1hlabblah1');
    expect(rendered).to.contain('1hlabblah2');
    expect(rendered).to.contain('1hlabblah3');
    expect(rendered).to.contain('2hlabblah1');
    expect(rendered).to.contain('2hlabblah2');
    expect(rendered).to.contain('2hlabblah3');
    expect(rendered).to.contain('3hlabblah1');
    expect(rendered).to.contain('3hlabblah2');
    expect(rendered).to.contain('3hlabblah3');
  });
});

describe('nesting for within for with indexes', function () {
  var ForInsideFor = require('../fixtures/nested-for-with-indexes.jsx');

  it('should render a list of items using indexes from both Fors', function () {
    var forInsideFor = React.createElement(ForInsideFor, {
      blahs: ['blah1', 'blah2', 'blah3'],
      otherBlahs: ['1hlab', '2hlab', '3hlab'],
      test: true
    });
    var rendered = ReactDOMServer.renderToString(forInsideFor);
    expect(rendered).to.contain('1hlabblah100');
    expect(rendered).to.contain('1hlabblah210');
    expect(rendered).to.contain('1hlabblah320');
    expect(rendered).to.contain('2hlabblah101');
    expect(rendered).to.contain('2hlabblah211');
    expect(rendered).to.contain('2hlabblah321');
    expect(rendered).to.contain('3hlabblah102');
    expect(rendered).to.contain('3hlabblah212');
    expect(rendered).to.contain('3hlabblah322');
  });
});
