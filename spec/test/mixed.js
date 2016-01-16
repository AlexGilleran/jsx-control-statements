var expect = require('chai').expect;
var util = require('../testUtil');


describe('nesting if within for', function () {
  var IfInsideFor = require('../fixtures/mixed/if-inside-for.jsx');

  it('should render only the item where if condition is true', function () {
    var rendered = util.render(IfInsideFor, {blahs: ['blah1', 'blah2', 'blah3']});
    expect(rendered).to.contain('blah1');
    expect(rendered).to.not.contain('blah2');
  });

  it('should render nothing if condition is false', function () {
    var rendered = util.render(IfInsideFor, {blahs: ['nope', 'nope2', 'nope3']});
    expect(rendered).to.not.contain('Not Rendered');
    expect(rendered).to.not.contain('<span');
  });
});

describe('nesting for within if', function () {
  var ForInsideIf = require('../fixtures/mixed/for-inside-if.jsx');

  it('should render only the first loop when if condition is true', function () {
    var rendered = util.render(ForInsideIf, {
      blahs: ['blah1', 'blah2', 'blah3'],
      otherBlahs: ['notBlah1', 'notBlah2', 'notBlah3'],
      test: true
    });

    expect(rendered).to.contain('blah1');
    expect(rendered).to.contain('blah2');
    expect(rendered).to.contain('blah3');
    expect(rendered).not.to.contain('notBlah');
  });

  it('should render the second loop when if condition is false', function () {
    var rendered = util.render(ForInsideIf, {
      blahs: ['blah1', 'blah2', 'blah3'],
      otherBlahs: ['notBlah1', 'notBlah2', 'notBlah3'],
      test: false
    });

    expect(rendered).to.contain('notBlah1');
    expect(rendered).to.contain('notBlah2');
    expect(rendered).to.contain('notBlah3');
    expect(rendered).not.to.contain('blah');
  });
});
