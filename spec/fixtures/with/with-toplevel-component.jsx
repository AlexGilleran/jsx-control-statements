var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <With attr="value">
        <span>{attr}</span>
      </With>
    );
  }
};
