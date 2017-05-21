var React = require("react");

module.exports = React.createClass({
  render: function() {
    let test = "test"
    return (
      <div>
        <With>
          <span>{test}</span>
        </With>
      </div>
    );
  }
});
