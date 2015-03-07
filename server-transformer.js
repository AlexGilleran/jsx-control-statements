var jsTransform = require('jstransform');
var visitors = require('./index').visitorList;

module.exports = function (src) {
  console.log(jsTransform.transform(visitors, src).code);
  return jsTransform.transform(visitors, src).code;
};