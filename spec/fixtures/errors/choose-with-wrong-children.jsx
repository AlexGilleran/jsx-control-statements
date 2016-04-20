var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Choose>
          <When condition={true}/>
          <div>not allowed!</div>
        </Choose>
      </div>
    );
  }
});
