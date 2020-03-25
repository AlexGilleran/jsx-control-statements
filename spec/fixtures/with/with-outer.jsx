var React = require("react");

module.exports = class extends React.Component {
  render() {
    var foo = "variable"
    return (
      <div>
        <With bar="attribute">
          <span>{foo + bar}</span>
        </With>
      </div>
    );
  }
};
