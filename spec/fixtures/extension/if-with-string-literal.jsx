var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <If condition={this.props.condition}>
          if rendered
        <Else />
          else rendered
        </If>
      </div>
    );
  }
};
