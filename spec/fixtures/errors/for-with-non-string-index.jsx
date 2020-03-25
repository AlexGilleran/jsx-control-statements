var React = require("react");

module.exports = class extends React.Component {
  render() {
    var x = "i";
    return (
      <div>
        <For each="item" index={ x } of={[1, 2]}>
          <span>Fails</span>
        </For>
      </div>
    );
  }
};
