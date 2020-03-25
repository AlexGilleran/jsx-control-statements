var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <If condition={this.props.condition}>
          {"if rendered"}
          <span {...this.props}>test</span>
        <Else />
          {"else rendered"}
          <span>test</span>
        </If>
      </div>
    );
  }
};
