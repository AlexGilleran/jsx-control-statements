var React = require('react');

module.exports = React.createClass({
  render: function() {
    this.test = 'test';

    return (
      <div>
        <For each="blah">
          <span key={blah}>{blah + this.test}</span>
        </For>
      </div>
    );
  }
});
