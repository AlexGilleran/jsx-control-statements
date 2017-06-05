var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <With attr="outer">
          <span>{attr}</span>
          <With attr="inner">
            <span>{attr}</span>
          </With>
          <span>{attr}</span>
        </With>
      </div>
    );
  }
});
