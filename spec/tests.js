var React = require('react');
var ReactDOMServer = require('react-dom/server');
var expect = require('chai').expect;
var errors = require('../error-messages');
var plugin = require('../index');

require("babel-core/register")({
  presets: ['babel-preset-react'],
  plugins: [plugin],
  cache: false
});

describe('requiring in component with if/else', function () {
  var IfWithElse = require('./fixtures/if-with-else.jsx');

  it('should render if block when condition true', function () {
    var ifWithElse = React.createElement(IfWithElse, {condition: 'blah'});
    var rendered = ReactDOMServer.renderToString(ifWithElse);
    expect(rendered).to.contain('<span');
    expect(rendered).to.contain('IfBlock');
    expect(rendered).not.to.contain('ElseBlock');
  });

  it('should render else block when condition false', function () {
    var ifWithElse = React.createElement(IfWithElse);
    var rendered = ReactDOMServer.renderToString(ifWithElse);
    expect(rendered).to.contain('<span');
    expect(rendered).to.contain('ElseBlock');
    expect(rendered).not.to.contain('IfBlock');
  });
});

describe('requiring in component with if but no else', function () {
  var IfWithoutElse = require('./fixtures/if-without-else.jsx');

  it('should render if block when condition true', function () {
    var ifWithoutElse = React.createElement(IfWithoutElse, {condition: 'blah'});
    var rendered = ReactDOMServer.renderToString(ifWithoutElse);
    expect(rendered).to.contain('<span');
    expect(rendered).to.contain('IfBlock');
    expect(rendered).not.to.contain('ElseBlock');
  });

  it('should render else block when condition false', function () {
    var ifWithoutElse = React.createElement(IfWithoutElse);
    var rendered = ReactDOMServer.renderToString(ifWithoutElse);
    expect(rendered).not.to.contain('<span');
    expect(rendered).not.to.contain('IfBlock');
  });

  it('should render nothing when condition false', function () {
    var ifWithoutElse = React.createElement(IfWithoutElse);
    var rendered = ReactDOMServer.renderToString(ifWithoutElse);
    expect(rendered).not.to.contain('<span');
    expect(rendered).not.to.contain('IfBlock');
  });
});

describe('requiring in component with nested if/else', function () {
  var NestedIf = require('./fixtures/nested-if.jsx');

  it('should render if-if block when both conditions true', function () {
    var nestedIf = React.createElement(NestedIf, {condition: 'blah', otherCondition: 'other'});
    var rendered = ReactDOMServer.renderToString(nestedIf);
    expect(rendered).to.contain('If-If');
    expect(rendered).not.to.contain('Else');
  });

  it('should render if-else block when outer condition true, inner false', function () {
    var nestedIf = React.createElement(NestedIf, {condition: 'blah'});
    var rendered = ReactDOMServer.renderToString(nestedIf);
    expect(rendered).to.contain('If-Else');
  });

  it('should render else-if block when outer condition false, inner true', function () {
    var nestedIf = React.createElement(NestedIf, {otherCondition: 'other'});
    var rendered = ReactDOMServer.renderToString(nestedIf);
    expect(rendered).to.contain('Else-If');
  });

  it('should render else-else block when both conditions false', function () {
    var nestedIf = React.createElement(NestedIf);
    var rendered = ReactDOMServer.renderToString(nestedIf);
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
  var ForWithIndex = require('./fixtures/for-with-index.jsx');

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

describe('nesting if within for', function () {
  var IfInsideFor = require('./fixtures/if-inside-for.jsx');

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
  var ForInsideIf = require('./fixtures/for-inside-if.jsx');

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

describe('nesting for within for', function () {
  var ForInsideFor = require('./fixtures/nested-for.jsx');

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
  var ForInsideFor = require('./fixtures/nested-for-with-indexes.jsx');

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

describe('when encountering errors', function () {
  it('should fail for an <If> with no condition', function () {
    expect(function () {
      require('./fixtures/errors/if-with-no-condition.jsx');
    }).to.throw(Error, errors.IF_WITH_NO_CONDITION);
  });

  it('should fail for a <For> with no each', function () {
    expect(function () {
      require('./fixtures/errors/for-with-no-each.jsx');
    }).to.throw(Error, errors.FOR_WITH_NO_ATTRIBUTES);
  });

  it('should fail for a <For> with no of', function () {
    expect(function () {
      require('./fixtures/errors/for-with-no-of.jsx');
    }).to.throw(Error, errors.FOR_WITH_NO_ATTRIBUTES);
  });

  it('should give location of errors', function() {
    expect(function() {
      require('./fixtures/errors/if-with-no-condition.jsx');
    }).to.throw(Error, /.*7,8.*/);
  });

  it('should fail for an <If> with no children', function() {
    expect(function() {
      require('./fixtures/errors/if-with-no-children.jsx');
    }).to.throw(Error, errors.NO_CHILDREN);
  });

  it('should fail for an <If> with multiple children', function() {
    expect(function() {
      require('./fixtures/errors/if-with-multiple-children.jsx');
    }).to.throw(Error, errors.MULTIPLE_CHILDREN);
  });

  it('should fail for an <For> with no children', function() {
    expect(function() {
      require('./fixtures/errors/for-with-no-children.jsx');
    }).to.throw(Error, errors.NO_CHILDREN);
  });

  it('should fail for an <For> with multiple children', function() {
    expect(function() {
      require('./fixtures/errors/for-with-multiple-children.jsx');
    }).to.throw(Error, errors.MULTIPLE_CHILDREN);
  });
});


describe('extensions', function() {
  var IfStringLiteral = require('./fixtures/if-with-string-literal.jsx');
  var IfExpressionContainer = require('./fixtures/if-with-expression-container.jsx');
  var ForExpressionContainer = require('./fixtures/for-with-expression-container.jsx');

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
