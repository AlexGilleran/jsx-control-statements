var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <With attr="string">
          <span>{attr}</span>
        </With>
      </div>
    );
  }
});
