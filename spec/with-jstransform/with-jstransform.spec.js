var nodeJsx = require('node-jsx');
var serverTransformer = require('../../server-transformer');

nodeJsx.install({
  extension: '.jsx',
  additionalTransform: serverTransformer
});

var tests = require('../tests');

describe('through jstransform', function() {
  tests();
});