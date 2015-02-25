var ifTransform = require('../index.js');
var jsTransform = require('jstransform');
var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;

describe('direct transformation', function () {
  it('should handle a simple if/else', function () {
    var output = getTransformedFixture('if-with-else');
    var reg = /.*this.props.condition === 'blah' \? \(\s+<span>IfBlock<\/span>\s+\) : \(\s+<span>ElseBlock<\/span>\s+\)\s+.*/;
    expect(reg.test(output)).to.equal(true);
  });
  
  it('should put empty else block in if no else is supplied', function () {
    output = getTransformedFixture('if-without-else');
    console.log(output);
    var reg = /.*\{ this.props.condition === 'blah' \? \(\s+<span>IfBlock<\/span>\s+\) \: '' \}.*/;
    expect(reg.test(output)).to.equal(true);
  });
  
  // This just makes sure it's not adding the transformed code correctly but retainin the non-transformed version.
  it('should remove all <if><else /> and <if> tags', function () {
    var output = getTransformedFixture('if-with-else');

    expect(output).to.not.contain('<If>');
    expect(output).to.not.contain('<Else />');
    expect(output).to.not.contain('</If>');
  });
});

function getTransformedFixture(name) {
  var filename = path.join(__dirname, './fixtures/' + name + '.jsx');
  var src = fs.readFileSync(filename, { encoding: 'utf8' });
  return jsTransform.transform(ifTransform.visitorList, src).code
}

