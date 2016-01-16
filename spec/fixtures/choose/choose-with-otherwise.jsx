var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <Choose>
        <When condition={this.props.when1}>
          <span>WhenBlock1</span>
        </When>
        <Otherwise>
          <span>OtherwiseBlock</span>
        </Otherwise>
      </Choose>
    );
  }
});
