var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <With attr1="outer">
          <With attr2="inner">
            <span>{attr1 + attr2}</span>
          </With>
        </With>
      </div>
    );
  }
};
