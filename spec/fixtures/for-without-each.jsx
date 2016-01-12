var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <For of={[1, 2, 3]}>
          ABC
        </For>
      </div>
    );
  }
});
