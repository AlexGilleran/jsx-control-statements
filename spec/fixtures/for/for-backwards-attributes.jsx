var React = require("react");

module.exports = class extends React.Component {
  render() {
    this.test = "test";

    return (
      <div>
        <For of={this.props.items} each="item">
          <span key={item}>{item + this.test}</span>
        </For>
      </div>
    );
  }
};
