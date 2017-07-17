var chai = require("chai");
var spies = require("chai-spies");
var util = require("../testUtil");

chai.use(spies);
var expect = chai.expect;

describe("extension: data type handling", function() {
  var IfStringLiteral = require("../fixtures/extension/if-with-string-literal.jsx");
  var IfExpressionContainer = require("../fixtures/extension/if-with-expression-container.jsx");
  var ForExpressionContainer = require("../fixtures/extension/for-with-expression-container.jsx");

  it("should handle string literals within if tag", function() {
    var rendered = util.render(IfStringLiteral, {condition: true});
    expect(rendered).to.match(util.matchTextWithinDiv("if rendered"));
  });

  it("should handle string literals within else tag", function() {
    var rendered = util.render(IfStringLiteral, {condition: false});
    expect(rendered).to.match(util.matchTextWithinDiv("else rendered"));
  });

  it("should handle expression containers within if tag", function() {
    var rendered = util.render(IfExpressionContainer, {condition: true});
    expect(rendered).to.match(util.matchTextWithinDiv("if rendered"));
  });

  it("should handle expression containers within else tag", function() {
    var rendered = util.render(IfExpressionContainer, {condition: false});
    expect(rendered).to.match(util.matchTextWithinDiv("else rendered"));
  });

  it("should handle expression containers within for tag", function() {
    var rendered = util.render(ForExpressionContainer, {items: ["test1", "test2", "test3"]});

    expect(rendered).to.match(
      util.createDivMatcher()
        .addReactText("test1")
        .addReactText("test2")
        .addReactText("test3")
        .build()
    );
  });
});

describe("extension: multiple children", function() {
  var FixtureIf = require("../fixtures/extension/if-with-multiple-children.jsx");
  var FixtureIfNested = require("../fixtures/extension/if-with-multiple-children-nested.jsx");
  var FixtureChoose = require("../fixtures/extension/choose-with-multiple-children.jsx");
  var FixtureFor = require("../fixtures/extension/for-with-multiple-children.jsx");

  var consoleSpy;

  beforeEach(function() {
    consoleSpy = chai.spy.on(console, "error");
  });


  it("should allow for multiple children within <If>", function() {
    var rendered = util.render(FixtureIf, {condition: true});

    expect(rendered).to.contain("if rendered");
    expect(rendered).to.contain("test");
    expect(consoleSpy).to.not.have.been.called();
  });

  it("should allow for multiple children within nested <If>s", function() {
    var rendered = util.render(FixtureIfNested, {conditionInner: true});

    expect(rendered).to.match(
      util.createDivMatcher()
        .addReactText("outer1")
        .addSpan("outer2")
        .addSpan("inner1")
        .addSpan("inner2")
        .addSpan("inner3")
        .addSpan("outer3")
        .addSpan("outer4")
        .build()
    );
    expect(consoleSpy).to.not.have.been.called();
  });

  it("should allow for multiple children within <Else>", function() {
    var rendered = util.render(FixtureIf);

    expect(rendered).to.match(
      util.createDivMatcher()
        .addReactText("else rendered")
        .addSpan("test")
        .build()
    );
    expect(consoleSpy).to.not.have.been.called();
  });

  it("should allow for multiple children within <When>", function() {
    var rendered = util.render(FixtureChoose, {when: true});

    expect(rendered).to.match(
      util.createDivMatcher()
        .addSpan("When1")
        .addSpan("When2")
        .build()
    );
    expect(consoleSpy).to.not.have.been.called();
  });

  it("should allow for multiple children within <Otherwise>", function() {
    var rendered = util.render(FixtureChoose);

    expect(rendered).to.match(
      util.createDivMatcher()
        .addSpan("Other1")
        .addSpan("Other2")
        .build()
    );
    expect(consoleSpy).to.not.have.been.called();
  });

  it("should allow for multiple children within <For>", function() {
    var rendered = util.render(FixtureFor, {items: [1, 2, 3]});

    expect(rendered).to.match(
      util.createDivMatcher()
        .addSpan("1")
        .addSpan("1test")
        .addSpan("2")
        .addSpan("2test")
        .addSpan("3")
        .addSpan("3test")
        .build()
    );
    expect(consoleSpy).to.not.have.been.called();
  });
});
