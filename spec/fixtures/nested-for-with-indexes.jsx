var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <For each="otherBlah" index="$index1" of={this.props.otherBlahs}>
          <For each="blah" index="$index2" of={this.props.blahs}>
            <span key={otherBlah + blah}>{otherBlah + blah + $index1 + $index2}</span>
          </For>
        </For>
      </div>
    );
  }
});