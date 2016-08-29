var expect = require('chai').expect;
var util = require('../testUtil');


describe('requiring in component with minimalistic for', function () {
  var FixtureEmpty = require('../fixtures/for/for-empty.jsx');
  var FixtureNoEach = require('../fixtures/for/for-without-each.jsx');

  describe('should render nothing if loop is empty', function() {
    var rendered = util.render(FixtureEmpty);
    expect(rendered).to.match(/<div[^>]*><\/div>/);
  });

  describe('should simply iterate without each', function() {
    var rendered = util.render(FixtureNoEach);
    expect(rendered).to.match(/<div[^>]*>(<span[^>]*>ABC<\/span>){3}<\/div>/);
  });
});

describe('requiring in component with for', function () {
  var ForView = require('../fixtures/for/for.jsx');
  var ForViewRevAttrs = require('../fixtures/for/for-backwards-attributes.jsx');

  describe('when attributes in normal order', runForTests.bind(this, ForView));
  describe('when attributes in reverse order', runForTests.bind(this, ForViewRevAttrs));

  function runForTests(ComponentDefinition) {
    it('should render list of items', function () {
      var rendered = util.render(ComponentDefinition, {items: ['item1', 'item2', 'item3']});
      expect(rendered).to.match(/.*span.*item1test..*span.*span.*item2test.*span.*item3test.*span.*/);
    });

    it('should render empty list of items as blank', function () {
      var rendered = util.render(ComponentDefinition, {items: []});
      expect(rendered).to.match(/<div.*><\/div>/);
    });
  }
});

describe('requiring in component with for with index', function () {
  var ForWithIndex = require('../fixtures/for/for-with-index.jsx');
  var ForWithIndexWithoutEach = require('../fixtures/for/for-with-index-without-each.jsx');

  it('should render list of items', function () {
    var rendered = util.render(ForWithIndex, {items: ['item1', 'item2', 'item3']});
    expect(rendered).to.match(/.*span.*item1test0..*span.*span.*item2test1.*span.*item3test2.*span.*/);
  });

  it('should render empty list of items as blank', function () {
    var rendered = util.render(ForWithIndex, {items: []});
    expect(rendered).to.match(/<div.*><\/div>/);
  });

  it('should render indices without values', function() {
    var rendered = util.render(ForWithIndexWithoutEach, {items: ["one", "two", "three"]});
    expect(rendered).to.match(/.*span.*0.*1.*2.*/);
  });

});

describe('nesting for within for', function () {
  var ForInsideFor = require('../fixtures/for/nested-for.jsx');

  it('should render only the first loop when if condition is true', function () {
    var rendered = util.render(ForInsideFor, {
      items: ['item1', 'item2', 'item3'],
      otherItems: ['1hlab', '2hlab', '3hlab'],
      test: true
    });

    expect(rendered).to.contain('1hlabitem1');
    expect(rendered).to.contain('1hlabitem2');
    expect(rendered).to.contain('1hlabitem3');
    expect(rendered).to.contain('2hlabitem1');
    expect(rendered).to.contain('2hlabitem2');
    expect(rendered).to.contain('2hlabitem3');
    expect(rendered).to.contain('3hlabitem1');
    expect(rendered).to.contain('3hlabitem2');
    expect(rendered).to.contain('3hlabitem3');
  });
});

describe('nesting for within for with indexes', function () {
  var ForInsideFor = require('../fixtures/for/nested-for-with-indexes.jsx');

  it('should render a list of items using indexes from both Fors', function () {
    var rendered = util.render(ForInsideFor, {
      items: ['item1', 'item2', 'item3'],
      otherItems: ['1hlab', '2hlab', '3hlab'],
      test: true
    });

    expect(rendered).to.contain('1hlabitem100');
    expect(rendered).to.contain('1hlabitem210');
    expect(rendered).to.contain('1hlabitem320');
    expect(rendered).to.contain('2hlabitem101');
    expect(rendered).to.contain('2hlabitem211');
    expect(rendered).to.contain('2hlabitem321');
    expect(rendered).to.contain('3hlabitem102');
    expect(rendered).to.contain('3hlabitem212');
    expect(rendered).to.contain('3hlabitem322');
  });
});
