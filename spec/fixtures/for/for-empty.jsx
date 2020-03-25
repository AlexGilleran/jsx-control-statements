var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <For each="item" of={[1, 2, 3]}>

        </For>
      </div>
    );
  }
};
