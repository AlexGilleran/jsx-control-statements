var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <For of={[1, 2, 3]}>
          ABC
        </For>
      </div>
    );
  }
};
