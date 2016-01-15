var React = require('react');
var ReactDOMServer = require('react-dom/server');
var expect = require('chai').expect;


describe('requiring in component with empty if', function() {
  var Fixture = require('../fixtures/if-empty.jsx');

  it('should render nothing when condition true, but if is empty', function () {
    var fixture = React.createElement(Fixture);
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.match(/^<div[^>]*><\/div>$/);
  });

});

describe('requiring in component with if', function () {
  var IfWithoutElse = require('../fixtures/if.jsx');

  it('should render if block when condition true', function () {
    var ifWithoutElse = React.createElement(IfWithoutElse, {condition: 'blah'});
    var rendered = ReactDOMServer.renderToString(ifWithoutElse);
    expect(rendered).to.contain('<span');
    expect(rendered).to.contain('IfBlock');
    expect(rendered).not.to.contain('ElseBlock');
  });

  it('should render nothing when condition false', function () {
    var ifWithoutElse = React.createElement(IfWithoutElse);
    var rendered = ReactDOMServer.renderToString(ifWithoutElse);
    expect(rendered).not.to.contain('<span');
    expect(rendered).not.to.contain('IfBlock');
  });

});

describe('requiring in component with if/else', function () {
  var IfWithElse = require('../fixtures/if-with-else.jsx');

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

describe('requiring in component with if and else if', function () {
  var Fixture = require('../fixtures/if-with-elseif.jsx');

  it('should render if block when condition true', function () {
    var fixture = React.createElement(Fixture, {ifCondition: true});
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.contain('>IfBlock<');
    expect(rendered).not.to.contain('>ElseIfBlock');
  });

  it('should render else if block when condition true', function () {
    var fixture = React.createElement(Fixture, {elseIfCondition: true});
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.contain('>ElseIfBlock<');
    expect(rendered).not.to.contain('>IfBlock<');
  });

  it('should render 2nd else if block when condition true', function () {
    var fixture = React.createElement(Fixture, {elseIf2Condition: true});
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.contain('>ElseIfBlock2<');
    expect(rendered).not.to.contain('>ElseIfBlock<');
    expect(rendered).not.to.contain('>IfBlock<');
  });

  it('should render nothing when if and else if condition false', function () {
    var fixture = React.createElement(Fixture);
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).not.to.contain('<span');
    expect(rendered).not.to.contain('IfBlock');
    expect(rendered).not.to.contain('ElseIfBlock');
  });
});

describe('requiring in component with if/elseIf/else', function () {
  var Fixture = require('../fixtures/if-with-elseif-else.jsx');

  it('should render if block when condition true', function () {
    var fixture = React.createElement(Fixture, {ifCondition: true});
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.contain('>IfBlock<');
    expect(rendered).not.to.contain('>ElseIfBlock<');
    expect(rendered).not.to.contain('>ElseBlock<');
  });

  it('should render else if block when condition true', function () {
    var fixture = React.createElement(Fixture, {elseIfCondition: true});
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.contain('>ElseIfBlock<');
    expect(rendered).not.to.contain('>IfBlock<');
  });

  it('should render else block when all conditions false', function () {
    var fixture = React.createElement(Fixture);
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.contain('>ElseBlock<');
    expect(rendered).not.to.contain('>ElseIfBlock<');
    expect(rendered).not.to.contain('>IfBlock<');
  });
});

describe('requiring in component with nested if/elseIf/else', function () {
  var Fixture = require('../fixtures/nested-if.jsx');

  it('should render if-if block when both conditions true', function () {
    var fixture = React.createElement(Fixture, {ifCondition: true, nestedIfCondition: true});
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.contain('>If-If<');
    expect(rendered).not.to.contain('Else');
  });

  it('should render if-elseif block when both conditions true', function () {
    var fixture = React.createElement(Fixture, {ifCondition: true, nestedElseIfCondition: true});
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.contain('>If-ElseIf<');
    expect(rendered).not.to.contain('-If<');
    expect(rendered).not.to.contain('Else<');
    expect(rendered).not.to.contain('>Else');
  });

  it('should render if-else block when outer condition true, inner false', function () {
    var fixture = React.createElement(Fixture, {ifCondition: true});
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.contain('>If-Else<');
    expect(rendered).not.to.contain('If<');
    expect(rendered).not.to.contain('>Else');
  });

  it('should render elseif-if block when both conditions true', function () {
    var fixture = React.createElement(Fixture, {elseIfCondition: true, nestedIfCondition: true});
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.contain('>ElseIf-If<');
    expect(rendered).not.to.contain('-Else');
    expect(rendered).not.to.contain('>If');
    expect(rendered).not.to.contain('>Else-');
  });

  it('should render elseif-elseif block when both conditions true', function () {
    var fixture = React.createElement(Fixture, {elseIfCondition: true, nestedElseIfCondition: true});
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.contain('>ElseIf-ElseIf<');
    expect(rendered).not.to.contain('-If<');
    expect(rendered).not.to.contain('Else<');
    expect(rendered).not.to.contain('>If-');
    expect(rendered).not.to.contain('>Else-');
  });

  it('should render elseif-else block when outer condition true, inner false', function () {
    var fixture = React.createElement(Fixture, {elseIfCondition: true});
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.contain('>ElseIf-Else<');
    expect(rendered).not.to.contain('If<');
    expect(rendered).not.to.contain('>Else-');
    expect(rendered).not.to.contain('>If-');
  });

  it('should render else-if block when outer condition false, inner true', function () {
    var fixture = React.createElement(Fixture, {nestedIfCondition: 'other'});
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.contain('>Else-If<');
    expect(rendered).not.to.contain('If-');
    expect(rendered).not.to.contain('-Else');
  });

  it('should render else-elseif block when outer condition false, inner true', function () {
    var fixture = React.createElement(Fixture, {nestedElseIfCondition: 'other'});
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.contain('>Else-ElseIf<');
    expect(rendered).not.to.contain('If-');
    expect(rendered).not.to.contain('Else<');
    expect(rendered).not.to.contain('-If');
  });

  it('should render else-else block when both conditions false', function () {
    var fixture = React.createElement(Fixture);
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.contain('Else-Else');
    expect(rendered).not.to.contain('If');
  });
});
