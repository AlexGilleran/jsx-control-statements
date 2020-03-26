var React = require("react");

module.exports = class extends React.Component {
  render() {
    const {condition, ...passdown} = this.props;

    return (
      <div>
        <If condition={condition}>
          {"if rendered"}
          <span {...passdown}>test</span>
        <Else />
          {"else rendered"}
          <span>test</span>
        </If>
      </div>
    );
  }
};
