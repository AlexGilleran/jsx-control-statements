var React = require("react");

module.exports = React.createClass({
  render: function() {
    this.foo = "outer"
    return (
      <div>
        <With foo="attribute">
          <span>{foo + this.foo}</span>
        </With>
      </div>
    );
  }
});
