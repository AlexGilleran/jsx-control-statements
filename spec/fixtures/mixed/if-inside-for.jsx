var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <For each="blah" of={this.props.blahs}>
          <If condition={blah === "blah1"}>
            <span key={blah}>{blah}</span>
          </If>
        </For>
      </div>
    );
  }
};
