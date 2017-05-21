var React = require("react");

module.exports = React.createClass({
  render: function() {
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
});
