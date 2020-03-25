var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <For index="$index" of={this.props.items}>
          <span key={$index}>{$index}</span>
        </For>
      </div>
    );
  }
};
