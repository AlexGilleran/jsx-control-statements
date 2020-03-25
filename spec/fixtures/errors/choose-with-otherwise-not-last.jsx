var React = require("react");

module.exports = class extends React.Component {
  render() {
    return (
      <div>
        <Choose>
          <Otherwise>
            Fails here!
          </Otherwise>
          <When condition={true}/>
        </Choose>
      </div>
    );
  }
};
