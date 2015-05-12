var jsTransform = require('jstransform');
var visitors = require('./jstransform').visitorList;

module.exports = function (src) {
  var transformed = jsTransform.transform(visitors, src).code;

  return transformed;
};