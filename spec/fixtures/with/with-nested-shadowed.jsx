var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <With attr="outer">
          <With attr="inner">
            <span>{attr}</span>
          </With>
        </With>
      </div>
    );
  }
};
