var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            <If condition={this.props.ifCondition}>
                <If condition={this.props.nestedIfCondition}>
                    <span>If-If</span>
                <ElseIf condition={this.props.nestedElseIfCondition} />
                    <span>If-ElseIf</span>
                <Else />
                    <span>If-Else</span>
                </If>
            <ElseIf condition={this.props.elseIfCondition} />
                <If condition={this.props.nestedIfCondition}>
                    <span>ElseIf-If</span>
                <ElseIf condition={this.props.nestedElseIfCondition} />
                    <span>ElseIf-ElseIf</span>
                <Else />
                    <span>ElseIf-Else</span>
                </If>
            <Else />
                <If condition={this.props.nestedIfCondition}>
                    <span>Else-If</span>
                <ElseIf condition={this.props.nestedElseIfCondition} />
                  <span>Else-ElseIf</span>
                <Else />
                    <span>Else-Else</span>
                </If>
            </If>
        );
    }
});
