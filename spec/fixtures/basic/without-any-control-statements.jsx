var React = require('react');

var Iff = React.createClass({
  render: function() {
    return (<span>Test</span>);
  }
});

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Iff />
      </div>
    );
  }
});
