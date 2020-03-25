var React = require("react");

class Iff extends React.Component {
  render() {
    return (<span>Test</span>);
  }
}

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <Iff />
      </div>
    );
  }
};
