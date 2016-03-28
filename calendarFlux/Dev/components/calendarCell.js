var React = require('react');
var Controller = require('../controller');

var AppDispatcher = Controller.Dispatcher;

var Td = React.createClass({
  // - handle click day -
  handleTdClick: function() {
    AppDispatcher.dispatch({
      eventName: 'changeDay',
      item: {day: this.props.td.value, isActive: this.props.td.isActive}
    });
  },
  render: function() {
    return (
      <td
        calssName = {this.props.callData.isActive}
        onClick = { this.handleTdClick }>
        {this.props.callData.value}
      </td>
    );
  }
});

module.exports = Td;
