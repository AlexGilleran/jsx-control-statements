var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <With attr={() => "expr" + "ession"}>
          <span>{attr()}</span>
        </With>
      </div>
    );
  }
});
