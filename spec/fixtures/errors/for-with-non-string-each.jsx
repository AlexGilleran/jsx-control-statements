var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <For each={ 'item' } index="i" of={[1, 2]}>
          <span>Fails</span>
        </For>
      </div>
    );
  }
});
