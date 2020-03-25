var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <With attr={() => "expr" + "ession"}>
          <span>{attr()}</span>
        </With>
      </div>
    );
  }
};
