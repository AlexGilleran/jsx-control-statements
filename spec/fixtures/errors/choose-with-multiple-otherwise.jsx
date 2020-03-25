var React = require("react");

module.exports = class extends React.Component {
  render() {
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
};
