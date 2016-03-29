var React = require('react');
var controller = require('../controllers/flux_store_disp_modul');

var Td = React.createClass({
  // - handle click day -
  handleTdClick: function() {

    controller.Dispatcher.dispatch({
      eventName: 'changeDate',
      item: {cellValue: this.props.callData.value, isActive: this.props.callData.isActive}
    });
  },
  render: function() {
    var toDateClass = '';
    switch(this.props.viewType) {
      case 'month':
        if(this.props.callData.isActive == 'thisDate') {
          toDateClass = this.props.callData.value == this.props.currentDate.day ? 'toDate' : '';
        }
      break;

      case 'year':
        if(this.props.callData.value === this.props.currentDate.monthText) {
          toDateClass = 'toDate';
        }

      break;

      case 'year-range':
        toDateClass = this.props.callData.value == this.props.currentDate.year ? 'toDate' : '';
      break;

      default:
      break;
    }

    return (
      <td
        className = {(this.props.viewType === 'month' ? this.props.callData.isActive +" "+toDateClass : toDateClass)}
        ref = 'cell'
        onClick = { this.handleTdClick }>
        {this.props.callData.value}
      </td>
    );
  }
});

module.exports = Td;
