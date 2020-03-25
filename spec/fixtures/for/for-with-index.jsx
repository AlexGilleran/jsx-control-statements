var React = require("react");

module.exports = class extends React.Component {
  render() {
    this.test = "test";

    return (
      <div>
        <For each="item" index="$index" of={this.props.items}>
          <span key={item}>{item + this.test + $index}</span>
        </For>
      </div>
    );
  }
};
