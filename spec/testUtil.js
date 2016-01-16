var React = require('react');
var ReactDOMServer = require('react-dom/server');


exports.render = function(Fixture, args) {
  var fixture = React.createElement(Fixture, args);
  return ReactDOMServer.renderToString(fixture);
};

