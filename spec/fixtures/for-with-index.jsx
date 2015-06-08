var React = require('react');

module.exports = React.createClass({
  render: function () {
    this.test = 'test';

    return (
      <div>
        <For each="blah" index="$index" of={this.props.blahs}>
          <span key={blah}>{blah + this.test + $index}</span>
        </For>
      </div>
    );
  }
});