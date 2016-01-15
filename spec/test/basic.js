var React = require('react');
var ReactDOMServer = require('react-dom/server');
var expect = require('chai').expect;


describe('Other JSXElements should not be affected', function() {
  var Fixture = require('../fixtures/without-any-control-statements');

  it('should not affect other JSXElements', function() {
    var fixture = React.createElement(Fixture);
    var rendered = ReactDOMServer.renderToString(fixture);
    expect(rendered).to.match(/<div[^>]*><span[^>]*>Test<\/span><\/div>/)
  });

});
