var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <For each="item" of={this.props.items}>
          <span key={item}>{item}</span>
          <span key={item + "test"}>{item + "test"}</span>
        </For>
      </div>
    );
  }
};
