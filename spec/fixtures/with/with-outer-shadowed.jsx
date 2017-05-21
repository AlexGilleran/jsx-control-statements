var React = require("react");

module.exports = React.createClass({
  render: function() {
    var foo = "variable"
    return (
      <div>
        <With foo="attribute">
          <span>{foo}</span>
        </With>
      </div>
    );
  }
});
