var React = require("react");

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <If condition={this.props.ifCondition}>
                    <span>test</span>
                    <If condition={this.props.nestedIfCondition}>
                        <span>If-If</span>
                    <Else />
                        <span>If-Else</span>
                    </If>
                <Else />
                    <span>test2</span>
                    <If condition={this.props.nestedIfCondition}>
                        <span>Else-If</span>
                    <Else />
                        <span>Else-Else</span>
                    </If>
                </If>
            </div>
        );
    }
});
