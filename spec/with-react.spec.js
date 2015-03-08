var nodeJsx = require('node-jsx');
var serverTransformer = require('../server-transformer');
var React = require('react');
var expect = require('chai').expect;

nodeJsx.install({
  extension: '.jsx',
  additionalTransform: serverTransformer
});

describe('requiring in component with if/else', function () {
  var IfWithElse = require('./fixtures/if-with-else.jsx');

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
  var IfWithoutElse = require('./fixtures/if-without-else.jsx');

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

describe('requiring in component with nested if/else', function () {
  var NestedIf = require('./fixtures/nested-if.jsx');

  it('should render if-if block when both conditions true', function () {
    var nestedIf = React.createElement(NestedIf, {condition: 'blah', otherCondition: 'other'});
    var rendered = React.renderToString(nestedIf);
    expect(rendered).to.contain('If-If');
    expect(rendered).not.to.contain('Else');
  });

  it('should render if-else block when outer condition true, inner false', function () {
    var nestedIf = React.createElement(NestedIf, {condition: 'blah'});
    var rendered = React.renderToString(nestedIf);
    expect(rendered).to.contain('If-Else');
  });

  it('should render else-if block when outer condition false, inner true', function () {
    var nestedIf = React.createElement(NestedIf, {otherCondition: 'other'});
    var rendered = React.renderToString(nestedIf);
    expect(rendered).to.contain('Else-If');
  });

  it('should render else-else block when both conditions false', function () {
    var nestedIf = React.createElement(NestedIf);
    var rendered = React.renderToString(nestedIf);
    expect(rendered).to.contain('Else-Else');
  });
});

describe('requiring in component with for', function () {
  var ForView = require('./fixtures/for.jsx');
  var ForViewRevAttrs = require('./fixtures/for-backwards-attributes.jsx');

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

describe('nesting if within for', function () {
  var IfInsideFor = require('./fixtures/if-inside-for.jsx');

  it('should render only the item where if condition is true', function () {
    var ifInsideFor = React.createElement(IfInsideFor, {blahs: ['blah1', 'blah2', 'blah3']});
    var rendered = React.renderToString(ifInsideFor);
    expect(rendered).to.contain('blah1');
    expect(rendered).to.not.contain('blah2');
  });
});

describe('nesting for within if', function () {
  var ForInsideIf = require('./fixtures/for-inside-if.jsx');

  it('should render only the first loop when if condition is true', function () {
    var forInsideIf = React.createElement(ForInsideIf, {
      blahs: ['blah1', 'blah2', 'blah3'],
      otherBlahs: ['notBlah1', 'notBlah2', 'notBlah3'],
      test: true
    });
    var rendered = React.renderToString(forInsideIf);
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
    var rendered = React.renderToString(forInsideIf);
    expect(rendered).to.contain('notBlah1');
    expect(rendered).to.contain('notBlah2');
    expect(rendered).to.contain('notBlah3');
    expect(rendered).not.to.contain('blah');
  });
});

describe('nesting for within for', function () {
  var ForInsideFor = require('./fixtures/nested-for.jsx');

  it('should render only the first loop when if condition is true', function () {
    var forInsideFor = React.createElement(ForInsideFor, {
      blahs: ['blah1', 'blah2', 'blah3'],
      otherBlahs: ['1hlab', '2hlab', '3hlab'],
      test: true
    });
    var rendered = React.renderToString(forInsideFor);
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