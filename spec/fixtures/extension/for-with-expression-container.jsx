var React = require('react');

module.exports = React.createClass({
  render: function() {
    this.test = 'test';

    return (
      <div>
        <For each="item" of={this.props.items}>
          {item}
        </For>
      </div>
    );
  }
});
