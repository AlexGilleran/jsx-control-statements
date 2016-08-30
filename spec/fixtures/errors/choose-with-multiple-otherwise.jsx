var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Choose>
          <When condition={true}/>
          <Otherwise>
            Fails here!
          </Otherwise>
          <Otherwise />
        </Choose>
      </div>
    );
  }
});
