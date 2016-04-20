var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <For each="item" of={[1, 2, 3]}>

        </For>
      </div>
    );
  }
});
