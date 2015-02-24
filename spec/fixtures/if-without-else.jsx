var React = require('react');

var conditionVariable = 'blah';

module.exports = React.createClass({
  render: function () {
    return (
      <If condition={conditionVariable === 'blah'}>
        <span>IfBlock</span>
      </If>
    );
}
});