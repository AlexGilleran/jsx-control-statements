var React = require("react");

module.exports = class extends React.Component {
  render() {
    let test = "test"
    return (
      <div>
        <With>
          <span>{test}</span>
        </With>
      </div>
    );
  }
};
