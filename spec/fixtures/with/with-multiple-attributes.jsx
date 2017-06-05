var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <With attr1="value1" attr2="value2" attr3="value3">
          <span>{attr1 + attr2 + attr3}</span>
        </With>
      </div>
    );
  }
});
