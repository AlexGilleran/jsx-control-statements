var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <Choose>
          <When condition="true">
            <span>IfBlock</span>
          </When>
        </Choose>
      </div>
    );
  }
};
