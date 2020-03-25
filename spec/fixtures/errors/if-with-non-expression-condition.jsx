var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <If condition="true">
          <span>IfBlock</span>
        </If>
      </div>
    );
  }
};
