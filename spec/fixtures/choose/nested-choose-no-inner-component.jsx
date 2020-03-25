var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <Choose key="blah">
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
            Otherwise
          </Otherwise>
        </Choose>
      </div>
    );
  }
};
