var React = require("react");
var ReactDOMServer = require("react-dom/server");

exports.render = function(Fixture, args) {
  var fixture = React.createElement(Fixture, args);
  return ReactDOMServer.renderToString(fixture);
};

function getSpan(content) {
  return "<span[^>]*>" + content + "</span>";
}

function getDiv(content) {
  return "<div[^>]*>" + content + "</div>";
}

function buildRegExp(matcher) {
  return new RegExp("^" + matcher + "$");
}

exports.matchTextWithinSpan = function(text) {
  return buildRegExp(getSpan(text));
};

exports.matchTextWithinDiv = function(text) {
  return buildRegExp(getDiv(text));
};

exports.matchTextWithinSpanWithinDiv = function(text) {
  return buildRegExp(getDiv(getSpan(text)));
};

exports.matchTextWithinSpansWithinDiv = function(text1, text2) {
  return buildRegExp(getDiv(getSpan(text1) + getSpan(text2)));
};

exports.matchEmptyDiv = function() {
  return buildRegExp(getDiv(""));
};

var Builder = function(type) {
  var items = [];

  return {
    addReactText: function(content) {
      items.push({ text: content, type: "react-text" });
      return this;
    },
    addSpan: function(content) {
      items.push({ text: getSpan(content) });
      return this;
    },
    addDiv: function(content) {
      items.push({ text: getDiv(content) });
      return this;
    },
    build: function() {
      var result = "";

      for (var i = 0; i < items.length; i++) {
        result += items[i].text;
        var nextI = i + 1;

        if (
          nextI < items.length &&
          items[i].type === "react-text" &&
          items[nextI].type === "react-text"
        ) {
          result += "<!-- -->";
        }
      }

      return buildRegExp(type === "div" ? getDiv(result) : getSpan(result));
    }
  };
};

exports.createDivMatcher = function() {
  return new Builder("div");
};
