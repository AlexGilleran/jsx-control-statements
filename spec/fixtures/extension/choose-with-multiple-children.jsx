var React = require("react");

module.exports = class extends React.Component {
  render() {
    const {when, ...otherProps} = this.props;

    return (
      <div>
        <Choose>
          <When condition={when}>
            <span>When1</span>
            <span {...otherProps}>When2</span>
          </When>
          <Otherwise>
            <span>Other1</span>
            <span>Other2</span>
          </Otherwise>
        </Choose>
      </div>
    );
  }
};
