var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <If condition={this.props.condition}>
          {'if rendered'}
        <Else />
          {'else rendered'}
        </If>
      </div>
    );
  }
});
