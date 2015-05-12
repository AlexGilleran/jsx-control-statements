var through = require("through");
var jsTransform = require('jstransform');
var visitors = require('./index').visitorList;

var browserify = module.exports = function (filename, opts) {
  return browserify.configure(opts)(filename);
};

browserify.configure = function (opts) {
  return function (filename) {
    var data = "";

    var write = function (buf) {
      data += buf;
    };

    var end = function () {
      try {
        var out = jsTransform.transform(visitors, data).code;
      }
      catch(err) {
        stream.emit("error", err);
        stream.queue(null);
        return;
      }

      stream.queue(out);
      stream.queue(null);
    };

    var stream = through(write, end);
    return stream;
  };
};
