var React = require('react');
var ReactDOMServer = require('react-dom/server');


exports.render = function(Fixture, args) {
  var fixture = React.createElement(Fixture, args);
  return ReactDOMServer.renderToString(fixture);
};

function getSpan(content) {
  return '<span[^>]*>' + content + '<\/span>';
}

function getDiv(content) {
  return '<div[^>]*>' + content + '<\/div>';
}

function buildRegExp(matcher) {
  return new RegExp('^' + matcher + '$');
}

exports.matchTextWithinSpan = function(text) {
  return buildRegExp(getSpan(text));
};

exports.matchTextWithinSpanWithinDiv = function(text) {
  return buildRegExp(getDiv(getSpan(text)));
};

exports.matchEmptyDiv = function() {
  return buildRegExp(getDiv(''));
};
