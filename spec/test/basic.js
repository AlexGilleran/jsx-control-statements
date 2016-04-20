var util = require('../testUtil');
var expect = require('chai').expect;

describe('Other JSXElements should not be affected', function() {
  var Fixture = require('../fixtures/basic/without-any-control-statements');

  it('should not affect other JSXElements', function() {
    var rendered = util.render(Fixture);
    expect(rendered).to.match(/<div[^>]*><span[^>]*>Test<\/span><\/div>/);
  });
});
