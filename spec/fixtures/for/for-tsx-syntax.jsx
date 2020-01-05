var React = require("react");

module.exports = React.createClass({
  render: function() {
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
});
