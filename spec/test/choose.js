var expect = require('chai').expect;
var util = require('../testUtil');


describe('requiring in component with empty when', function() {
  var Fixture = require('../fixtures/choose/choose-empty.jsx');

  it('should render nothing when condition true, but when is empty', function () {
    var rendered = util.render(Fixture);
    expect(rendered).to.match(util.matchEmptyDiv());
  });

});

describe('requiring in component with choose', function () {
  var Fixture = require('../fixtures/choose/choose.jsx');

  it('should render first when block when condition true', function () {
    var rendered = util.render(Fixture, {when1: true});
    expect(rendered).to.match(util.matchTextWithinSpanWithinDiv('WhenBlock1'));
  });

  it('should render first when block when both conditions true', function () {
    var rendered = util.render(Fixture, {when1: true, when2: true});
    expect(rendered).to.match(util.matchTextWithinSpanWithinDiv('WhenBlock1'));
  });

  it('should render second when block when condition true', function () {
    var rendered = util.render(Fixture, {when2: true});
    expect(rendered).to.match(util.matchTextWithinSpanWithinDiv('WhenBlock2'));
  });

  it('should render nothing when condition false', function () {
    var rendered = util.render(Fixture);
    expect(rendered).to.match(util.matchEmptyDiv());
  });

});

describe('requiring in component with choose/otherwise', function () {
  var Fixture = require('../fixtures/choose/choose-with-otherwise.jsx');

  it('should render choose block when condition true', function () {
    var rendered = util.render(Fixture, { when1: true });
    expect(rendered).to.match(util.matchTextWithinSpan('WhenBlock1'));
  });

  it('should render else block when condition false', function () {
    var rendered = util.render(Fixture);
    expect(rendered).to.match(util.matchTextWithinSpan('OtherwiseBlock'));
  });
});

describe('requiring in component with nested choose', function () {
  var Fixture = require('../fixtures/choose/nested-choose.jsx');

  it('should render when-when block when both conditions true', function () {
    var rendered = util.render(Fixture, {outerWhen: true, innerWhen: true});
    expect(rendered).to.match(util.matchTextWithinSpan('When-When'));
  });

  it('should render when-otherwise block when outer condition true, inner false', function () {
    var rendered = util.render(Fixture, {outerWhen: true});
    expect(rendered).to.match(util.matchTextWithinSpan('When-Otherwise'));
  });

  it('should render otherwise-when block when outer condition false, inner true', function () {
    var rendered = util.render(Fixture, {innerWhen: true});
    expect(rendered).to.match(util.matchTextWithinSpan('Otherwise-When'));
  });

  it('should render otherwise-otherwise block when both conditions false', function () {
    var rendered = util.render(Fixture);
    expect(rendered).to.match(util.matchTextWithinSpan('Otherwise-Otherwise'));
  });
});
