var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <Choose>
          <When>WhenBlock</When>
        </Choose>
      </div>
    );
  }
};
