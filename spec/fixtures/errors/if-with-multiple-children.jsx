var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <If condition={this.props.condition === 'blah'}>
          <span />
          <span />
        </If>
      </div>
    );
  }
});