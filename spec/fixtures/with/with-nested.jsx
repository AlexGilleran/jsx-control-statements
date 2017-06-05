var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <With attr1="outer">
          <With attr2="inner">
            <span>{attr1 + attr2}</span>
          </With>
        </With>
      </div>
    );
  }
});
