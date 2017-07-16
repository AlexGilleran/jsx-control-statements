var chai = require("chai");
var spies = require("chai-spies");
var util = require("../testUtil");

chai.use(spies);
var expect = chai.expect;


describe("requiring in component with empty if", function() {
  var Fixture = require("../fixtures/if/if-empty.jsx");

  it("should render nothing when condition true, but if is empty", function() {
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<div[^>]*><\/div>$/);
  });
});

describe("requiring in component with if", function() {
  var IfWithoutElse = require("../fixtures/if/if.jsx");

  it("should render if block when condition true", function() {
    var rendered = util.render(IfWithoutElse, {condition: "blah"});
    expect(rendered).to.contain("<span");
    expect(rendered).to.contain("IfBlock");
    expect(rendered).not.to.contain("ElseBlock");
  });

  it("should render nothing when condition false", function() {
    var rendered = util.render(IfWithoutElse);
    expect(rendered).not.to.contain("<span");
    expect(rendered).not.to.contain("IfBlock");
  });
});

describe("requiring in component with if/else", function() {
  var IfWithElse = require("../fixtures/if/if-with-else.jsx");

  it("should render if block when condition true", function() {
    var rendered = util.render(IfWithElse, {condition: "blah"});
    expect(rendered).to.contain("<span");
    expect(rendered).to.contain("IfBlock");
    expect(rendered).not.to.contain("ElseBlock");
  });

  it("should render else block when condition false", function() {
    var rendered = util.render(IfWithElse);
    expect(rendered).to.contain("<span");
    expect(rendered).to.contain("ElseBlock");
    expect(rendered).not.to.contain("IfBlock");
  });
});

describe("requiring in component with nested if/else", function() {
  var Fixture = require("../fixtures/if/nested-if.jsx");
  var consoleSpy;

  beforeEach(function() {
    consoleSpy = chai.spy.on(console, "error");
  });

  it("should render if-if block when both conditions true", function() {
    var rendered = util.render(Fixture, {ifCondition: true, nestedIfCondition: true});
    expect(rendered).to.contain(">If-If<");
    expect(rendered).not.to.contain("Else");
    expect(consoleSpy).to.not.have.been.called();
  });

  it("should render if-else block when outer condition true, inner false", function() {
    var rendered = util.render(Fixture, {ifCondition: true});
    expect(rendered).to.contain(">If-Else<");
    expect(rendered).not.to.contain("If<");
    expect(rendered).not.to.contain(">Else");
    expect(consoleSpy).to.not.have.been.called();
  });

  it("should render else-if block when outer condition false, inner true", function() {
    var rendered = util.render(Fixture, {nestedIfCondition: "other"});
    expect(rendered).to.contain(">Else-If<");
    expect(rendered).not.to.contain("If-");
    expect(rendered).not.to.contain("-Else");
    expect(consoleSpy).to.not.have.been.called();
  });

  it("should render else-else block when both conditions false", function() {
    var rendered = util.render(Fixture);
    expect(rendered).to.contain("Else-Else");
    expect(rendered).not.to.contain("If");
    expect(consoleSpy).to.not.have.been.called();
  });
});
