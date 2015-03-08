var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <For each="otherBlah" of={this.props.otherBlahs}>
          <For each="blah" of={this.props.blahs}>
            <span key={otherBlah + blah}>{otherBlah + blah}</span>
          </For>
        </For>
      </div>
    );
  }
});