var ifTransform = require('../index.js');
var jsTransform = require('jstransform');
var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;

describe('direct transformation', function () {
  it('should handle a simple if/else', function () {
    var output = getTransformedFixture('if-with-else');
    var reg = /.*{\s+conditionVariable === 'blah' \?\s+<span>IfBlock<\/span>\s+\:\s+<span>ElseBlock<\/span>\s+}.*/;
    expect(reg.test(output)).to.equal(true);
  });
  
  it('should if without else', function () {
    output = getTransformedFixture('if-without-else');
    var reg = /.*{\s+conditionVariable === 'blah' \?\s+<span>IfBlock<\/span>\s+\:\s''\s+}.*/;
    expect(reg.test(output)).to.equal(true);
  });
});

function getTransformedFixture(name) {
  var filename = path.join(__dirname, './fixtures/' + name + '.jsx');
  var src = fs.readFileSync(filename, { encoding: 'utf8' });
  return jsTransform.transform(ifTransform.visitorList, src).code
}

