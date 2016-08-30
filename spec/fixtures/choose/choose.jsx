var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      // Can"t have "If" as the root because if the condition isn"t true then render returns undefined.
      // Note that this means that this fixture also tests if behaviour when the If tag is not the root of render().
      <div>
        <Choose>
          <When condition={this.props.when1}>
            <span>WhenBlock1</span>
          </When>
          <When condition={this.props.when2}>
            <span>WhenBlock2</span>
          </When>
        </Choose>
      </div>
    );
  }
});
