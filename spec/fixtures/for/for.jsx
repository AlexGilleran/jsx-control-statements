var React = require("react");

module.exports = class extends React.Component {
  render() {
    this.test = "test";

    return (
      <div>
        <For each="item" of={this.props.items}>
          <span key={item}>{item + this.test}</span>
        </For>
      </div>
    );
  }
};
