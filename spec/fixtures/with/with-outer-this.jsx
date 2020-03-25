var React = require("react");

module.exports = class extends React.Component {
  render() {
    this.foo = "outer"
    return (
      <div>
        <With foo="attribute">
          <span>{foo + this.foo}</span>
        </With>
      </div>
    );
  }
};
