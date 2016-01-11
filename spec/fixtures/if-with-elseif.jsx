var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <If condition={this.props.ifCondition}>
        <span>IfBlock</span>
      <ElseIf condition={this.props.elseIfCondition} />
        <span>ElseIfBlock</span>
      <ElseIf condition={this.props.elseIf2Condition} />
        <span>ElseIfBlock2</span>
      </If>
    );
  }
});
