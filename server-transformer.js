var jsTransform = require('jstransform');
var visitors = require('./if-transform').visitorList;

module.exports = function (src) {
  return jsTransform.transform(visitors, src).code;
};