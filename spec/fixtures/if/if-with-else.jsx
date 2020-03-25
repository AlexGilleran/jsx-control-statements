var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <If condition={this.props.condition === "blah"}>
        <span>IfBlock</span>
      <Else />
        <span>ElseBlock</span>
      </If>
    );
  }
};
