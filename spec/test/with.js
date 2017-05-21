var expect = require("chai").expect;
var util = require("../testUtil");


describe("With control statement", function() {
  it("should render without attributes", function() {
    var Fixture = require("../fixtures/with/with-no-attributes.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<div[^>]*><span[^>]*>test<\/span><\/div>$/);
  });

  it("should render with a single attribute", function() {
    var Fixture = require("../fixtures/with/with-single-attribute.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<div[^>]*><span[^>]*>value<\/span><\/div>$/);
  });

  it("should render with multiple attributes", function() {
    var Fixture = require("../fixtures/with/with-multiple-attributes.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<div[^>]*><span[^>]*>value1value2value3<\/span><\/div>$/);
  });

  it("should render with an unused attribute", function() {
    var Fixture = require("../fixtures/with/with-unused-attribute.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<div[^>]*><span[^>]*>used<\/span><\/div>$/);
  });

  it("should render a string attribute", function() {
    var Fixture = require("../fixtures/with/with-string-attribute.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<div[^>]*><span[^>]*>string<\/span><\/div>$/);
  });

  it("should render an expression attribute", function() {
    var Fixture = require("../fixtures/with/with-expression-attribute.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<div[^>]*><span[^>]*>expression<\/span><\/div>$/);
  });

  it("should inherit nested attributes", function() {
    var Fixture = require("../fixtures/with/with-nested.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<div[^>]*><span[^>]*>outerinner<\/span><\/div>$/);
  });

  it("should shadow nested attributes", function() {
    var Fixture = require("../fixtures/with/with-nested-shadowed.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<div[^>]*><span[^>]*>inner<\/span><\/div>$/);
  });

  it("should restore shadowed nested attributes", function() {
    var Fixture = require("../fixtures/with/with-nested-shadowed-restored.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(
      /^<div[^>]*><span[^>]*>outer<\/span><span[^>]*>inner<\/span><span[^>]*>outer<\/span><\/div>$/
    );
  });

  it("should preserve access to outer variables", function() {
    var Fixture = require("../fixtures/with/with-outer.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<div[^>]*><span[^>]*>variableattribute<\/span><\/div>$/);
  });

  it("should shadow outer variables", function() {
    var Fixture = require("../fixtures/with/with-outer-shadowed.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<div[^>]*><span[^>]*>attribute<\/span><\/div>$/);
  });

  it("should restore shadowed outer variables", function() {
    var Fixture = require("../fixtures/with/with-outer-shadowed-restored.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(
      /^<div[^>]*><span[^>]*>variable<\/span><span[^>]*>attribute<\/span><span[^>]*>variable<\/span><\/div>$/
    );
  });

  it("should preserve access to outer this", function() {
    var Fixture = require("../fixtures/with/with-outer-this.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<div[^>]*><span[^>]*>attributeouter<\/span><\/div>$/);
  });

  it("should render nothing if content is empty", function() {
    var Fixture = require("../fixtures/with/with-empty-content.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<div[^>]*><\/div>$/);
  });

  it("should render a text child", function() {
    var Fixture = require("../fixtures/with/with-text-child.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<div[^>]*><![^>]*>text child <![^>]*><![^>]*>value<![^>]*><\/div>$/);
  });

  it("should render a single element child", function() {
    var Fixture = require("../fixtures/with/with-element-child.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<div[^>]*><span[^>]*>value<\/span><\/div>$/);
  });

  it("should render multiple children", function() {
    var Fixture = require("../fixtures/with/with-multiple-children.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(
      /^<div[^>]*><span[^>]*>value<\/span><span[^>]*>value<\/span><span[^>]*>value<\/span><\/div>$/
    );
  });

  it("should render as toplevel component", function() {
    var Fixture = require("../fixtures/with/with-toplevel-component.jsx");
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/^<span[^>]*>value<\/span>$/);
  });
});
