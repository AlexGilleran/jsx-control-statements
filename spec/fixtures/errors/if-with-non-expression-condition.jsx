var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <If condition="true">
          <span>IfBlock</span>
        </If>
      </div>
    );
  }
});
