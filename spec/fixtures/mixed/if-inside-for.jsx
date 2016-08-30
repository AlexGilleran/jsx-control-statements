var React = require("react");

module.exports = React.createClass({
  render: function() {
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
});
