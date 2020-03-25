var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <Choose>
        <When condition={this.props.when1}>
          <span>WhenBlock1</span>
        </When>
        <Otherwise>
          <span>OtherwiseBlock</span>
        </Otherwise>
      </Choose>
    );
  }
};
