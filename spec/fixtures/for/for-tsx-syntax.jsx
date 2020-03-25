var React = require("react");

module.exports = class extends React.Component {
  render() {
    this.test = "test";

    return (
      <div>
        <For
          of={this.props.items}
          body={(item, index) => <span key={item}>{item + this.test}</span>}
        />
      </div>
    );
  }
};
