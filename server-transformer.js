var jsTransform = require('jstransform');
var visitors = require('./index').visitorList;

module.exports = function (src) {
  return jsTransform.transform(visitors, src).code;
};