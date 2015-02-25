var React = require('react');

var conditionVariable = 'blah';

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <If condition={this.props.condition === 'blah'}>
          <span>IfBlock</span>
        </If>
      </div>
    );
  }
});