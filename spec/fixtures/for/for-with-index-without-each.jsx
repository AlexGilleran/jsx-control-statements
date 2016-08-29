var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <For index="$index" of={this.props.items}>
          <span key={$index}>{$index}</span>
        </For>
      </div>
    );
  }
});
