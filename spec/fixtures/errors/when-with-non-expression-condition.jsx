var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Choose>
          <When condition="true">
            <span>IfBlock</span>
          </When>
        </Choose>
      </div>
    );
  }
});
