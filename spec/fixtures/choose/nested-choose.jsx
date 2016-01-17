var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <Choose>
        <When condition={this.props.outerWhen}>
          <Choose>
            <When condition={this.props.innerWhen}>
              <span>When-When</span>
            </When>
            <Otherwise>
              <span>When-Otherwise</span>
            </Otherwise>
          </Choose>
        </When>
        <Otherwise>
          <Choose>
            <When condition={this.props.innerWhen}>
              <span>Otherwise-When</span>
            </When>
            <Otherwise>
              <span>Otherwise-Otherwise</span>
            </Otherwise>
          </Choose>
        </Otherwise>
      </Choose>
    );
  }
});
