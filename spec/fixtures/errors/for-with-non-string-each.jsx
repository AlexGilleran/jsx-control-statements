var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <For each={ "item" } index="i" of={[1, 2]}>
          <span>Fails</span>
        </For>
      </div>
    );
  }
};
