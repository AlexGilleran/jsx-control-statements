var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <Choose>
          <When condition={this.props.when}>
            <span>When1</span>
            <span {...this.props}>When2</span>
          </When>
          <Otherwise>
            <span>Other1</span>
            <span>Other2</span>
          </Otherwise>
        </Choose>
      </div>
    );
  }
});
