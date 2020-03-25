var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <With attr1="used" attr2="unused">
          <span>{attr1}</span>
        </With>
      </div>
    );
  }
};
