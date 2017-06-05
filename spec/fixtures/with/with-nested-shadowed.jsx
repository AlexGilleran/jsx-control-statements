var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <With attr="outer">
          <With attr="inner">
            <span>{attr}</span>
          </With>
        </With>
      </div>
    );
  }
});
