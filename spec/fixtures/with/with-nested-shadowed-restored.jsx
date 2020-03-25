var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <With attr="outer">
          <span>{attr}</span>
          <With attr="inner">
            <span>{attr}</span>
          </With>
          <span>{attr}</span>
        </With>
      </div>
    );
  }
};
