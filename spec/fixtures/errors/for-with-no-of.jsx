var React = require("react");

module.exports = class extends React.Component {
  render() {
    this.test = "test";

    return (
      <div>
        <For each="blah">
          <span key={blah}>{blah + this.test}</span>
        </For>
      </div>
    );
  }
};
