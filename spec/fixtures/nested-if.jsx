var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            <If condition={this.props.condition === 'blah'}>
                <If condition={this.props.otherCondition === 'other'}>
                    <span>If-If</span>
                <Else />
                    <span>If-Else</span>
                </If>
            <Else />
                <If condition={this.props.otherCondition === 'other'}>
                    <span>Else-If</span>
                <Else />
                    <span>Else-Else</span>
                </If>
            </If>
        );
    }
});