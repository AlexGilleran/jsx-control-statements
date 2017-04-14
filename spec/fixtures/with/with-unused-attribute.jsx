var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <With attr1="used" attr2="unused">
          <span>{attr1}</span>
        </With>
      </div>
    );
  }
});
