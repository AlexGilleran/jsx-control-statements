var ifTransform = require('../index.js');
var jsTransform = require('jstransform');
var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;

describe('if transformation', function () {
  it('should handle a simple if/else', function () {
    var output = getTransformedFixture('if-with-else');
    var reg = /.*this.props.condition === 'blah' \? \(\s+<span>IfBlock<\/span>\s+\) : \(\s+<span>ElseBlock<\/span>\s+\)\s+.*/;
    expect(reg.test(output)).to.equal(true);
  });
  
  it('should put empty else block in if no else is supplied', function () {
    output = getTransformedFixture('if-without-else');
    var reg = /.*\{ this.props.condition === 'blah' \? \(\s+<span>IfBlock<\/span>\s+\) \: '' \}.*/;
    expect(reg.test(output)).to.equal(true);
  });
  
  // This just makes sure it's not adding the transformed code correctly but retaining the non-transformed version.
  it('should remove all <if><else /> and <if> tags', function () {
    var output = getTransformedFixture('if-with-else');

    expect(output).to.not.contain('<If>');
    expect(output).to.not.contain('<Else />');
    expect(output).to.not.contain('</If>');
  });
});

describe('for transformation', function() {
  it('should correctly transform', function() {
    var output = getTransformedFixture('for');
  });
});

function getTransformedFixture(name) {
  var filename = path.join(__dirname, './fixtures/' + name + '.jsx');
  var src = fs.readFileSync(filename, { encoding: 'utf8' });
  return jsTransform.transform(ifTransform.visitorList, src).code
}

