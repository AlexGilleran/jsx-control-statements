var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      <With attr="value">
        <span>{attr}</span>
      </With>
    );
  }
});
