var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <If condition={true}>
          {'outer1'}
          <span>outer2</span>
          <If condition={this.props.conditionInner}>
            <span>inner1</span>
            <span>inner2</span>
            <span>inner3</span>
          </If>
          <span>outer3</span>
          <span>outer4</span>
        </If>
      </div>
    );
  }
});
