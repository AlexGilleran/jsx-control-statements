var React = require("react");

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <IfNot condition={this.props.ifNotCondition}>
                    <span>test</span>
                    <IfNot condition={this.props.nestedIfNotCondition}>
                        <span>IfNot-IfNot</span>
                    </IfNot>
                </IfNot>
            </div>
        );
    }
});
