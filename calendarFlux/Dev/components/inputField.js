var React = require('react'),
	ReactDOM = require('react-dom'),
	controller = require('../controllers/flux_store_disp_modul'),
	CalendarTable = require('./calendarTable');

var InputField = React.createClass({
	showWidget: function() {
		if(!$('#selectDateWidget').children().length) {
			ReactDOM.render(<CalendarTable />, document.getElementById('selectDateWidget'));
		}
	},

	render: function() {
		var date = '';

		if (parseInt(controller.Store.getCurrentDate().year) !== 0) {
			date = controller.monthList[parseInt(controller.Store.getCurrentDate().month)] + ' ' +
			controller.Store.getCurrentDate().day + ' ' + controller.Store.getCurrentDate().year;
		}

		return(
			<div
				className='input-group has-feedback inputDateField'>
				<input
					type = 'text'
					className = 'form-control'
					value = {date}
					onClick = {this.showWidget}/>
				<span className='glyphicon glyphicon-modal-window form-control-feedback' aria-hidden='true'> </span>
			</div>
		);
	}
});

module.exports = InputField;
