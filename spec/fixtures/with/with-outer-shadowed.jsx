var React = require("react");

module.exports = class extends React.Component {
  render() {
    var foo = "variable"
    return (
      <div>
        <With foo="attribute">
          <span>{foo}</span>
        </With>
      </div>
    );
  }
};
