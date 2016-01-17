var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <If condition={this.props.condition}>
          {'if rendered'}
          <span>test</span>
        <Else />
          {'else rendered'}
          <span>test</span>
        </If>
      </div>
    );
  }
});
