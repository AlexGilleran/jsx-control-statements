var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <For each="item" of={this.props.items}>
          <span key={item}>{item}</span>
          <span key={item + 'test'}>{item + 'test'}</span>
        </For>
      </div>
    );
  }
});
