var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <With attr="value">
          text child {attr}
        </With>
      </div>
    );
  }
};
