var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <For each="otherItem" of={this.props.otherItems}>
          <For each="item" of={this.props.items}>
            <span key={otherItem + item}>{otherItem + item}</span>
          </For>
        </For>
      </div>
    );
  }
});
