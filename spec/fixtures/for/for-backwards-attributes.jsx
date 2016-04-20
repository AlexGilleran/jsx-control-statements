var React = require('react');

module.exports = React.createClass({
  render: function() {
    this.test = 'test';

    return (
      <div>
        <For of={this.props.items} each="item">
          <span key={item}>{item + this.test}</span>
        </For>
      </div>
    );
  }
});
