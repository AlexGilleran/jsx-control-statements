var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      <If condition={this.props.condition === "blah"}>
        <span>IfBlock</span>
      <Else />
        <span>ElseBlock</span>
      </If>
    );
  }
});
