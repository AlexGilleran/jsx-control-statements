var React = require('react');

module.exports = React.createClass({
  render: function() {
    var x = 'i';
    return (
      <div>
        <For each="item" index={ x } of={[1, 2]}>
          <span>Fails</span>
        </For>
      </div>
    );
  }
});
