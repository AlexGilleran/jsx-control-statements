var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <With attr1="value1" attr2="value2" attr3="value3">
          <span>{attr1 + attr2 + attr3}</span>
        </With>
      </div>
    );
  }
};
