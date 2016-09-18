var React = require("react");

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <If condition={true}>
          <Choose>
            <When condition={this.props.type === "a"}>
            <span>
              Blah A
            </span>
            </When>
            <When condition={this.props.type === "b"}>
            <span>
              Blah B
            </span>
            </When>
          </Choose>

          <Choose>
            <When condition={this.props.type === "a"}>
            <span>
              Blah C
            </span>
            </When>
            <When condition={this.props.type === "b"}>
            <span>
              Blah D
            </span>
            </When>
          </Choose>
        </If>
      </div>
    );
  }
});
