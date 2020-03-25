var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <Choose>
          <When condition={this.props.outerWhen}>
            <span>test</span>
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
            <span>test</span>
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
      </div>
    );
  }
};
