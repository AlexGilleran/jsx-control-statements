var React = require("react");

module.exports = class extends React.Component {
  render() {
    var foo = "variable"
    return (
      <div>
        <span>{foo}</span>
        <With foo="attribute">
          <span>{foo}</span>
        </With>
        <span>{foo}</span>
      </div>
    );
  }
};
