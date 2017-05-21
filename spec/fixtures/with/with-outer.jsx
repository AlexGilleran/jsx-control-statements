var React = require("react");

module.exports = React.createClass({
  render: function() {
    var foo = "variable"
    return (
      <div>
        <With bar="attribute">
          <span>{foo + bar}</span>
        </With>
      </div>
    );
  }
});
