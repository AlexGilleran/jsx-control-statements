var chai = require("chai");
var spies = require("chai-spies");
var util = require("../testUtil");

chai.use(spies);
var expect = chai.expect;


describe("requiring in component with empty ifnot", function() {
  var Fixture = require("../fixtures/ifnot/ifnot-empty.jsx");

  it("should render nothing when condition true, but ifnot is empty", function() {
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<div[^>]*><\/div>$/);
  });
});

describe("requiring in component with ifnot", function() {
  var IfWithoutElse = require("../fixtures/ifnot/ifnot.jsx");

  it("should render if block when condition false", function() {
    var rendered = util.render(IfWithoutElse, {condition: false});
    expect(rendered).to.contain("<span");
    expect(rendered).to.contain("IfNotBlock");
  });

  it("should render nothing when condition true", function() {
    var rendered = util.render(IfWithoutElse, {condition: true});
    expect(rendered).not.to.contain("<span");
    expect(rendered).not.to.contain("IfNotBlock");
  });
});

describe("requiring in component with nested ifnot", function() {
  var Fixture = require("../fixtures/ifnot/nested-ifnot.jsx");
  var consoleSpy = chai.spy.on(console, "error");

  it("should render ifnot-ifnot block when both conditions false", function() {
    var rendered = util.render(Fixture, {ifNotCondition: false, nestedIfNotCondition: false});
    expect(rendered).to.contain(">IfNot-IfNot<");
    expect(consoleSpy).to.not.have.been.called();
  });

  it("should render nothing when outer condition true", function() {
    var rendered = util.render(Fixture, {ifNotCondition: true});
    expect(rendered).not.to.contain(">IfNot");
    expect(consoleSpy).to.not.have.been.called();
  });

  it("should render if block when outer condition false, inner true", function() {
    var rendered = util.render(Fixture, {ifNotCondition: false, nestedIfNotCondition: true});
    expect(rendered).to.contain(">test<");
    expect(rendered).not.to.contain("IfNot-");
    expect(consoleSpy).to.not.have.been.called();
  });

  it("should render nothing block when both conditions true", function() {
    var rendered = util.render(Fixture, {ifNotCondition: true, nestedIfNotCondition: true});
    expect(rendered).not.to.contain("IfNot");
    expect(consoleSpy).to.not.have.been.called();
  });
});
