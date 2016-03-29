var React = require('react');
var ReactDOM = require('react-dom');
var Tr = require('./calendarRow');
var controller = require('../controllers/flux_store_disp_modul');

var CalendarTable = React.createClass({

	handlerNext: function() {
		controller.Dispatcher.dispatch({
			eventName: 'dateNext',
      item: {month: controller.Store.getCurrentDate().month}
		});
	},

	handlePrevious: function() {
		controller.Dispatcher.dispatch({
			eventName: 'datePrev',
      item: {month: controller.Store.getCurrentDate().month}
		});
	},

	handleChangeView: function() {
		controller.Dispatcher.dispatch({
			eventName: 'changeView',
		});
	},

	render: function() {
		var trList = controller.Store.getActualView().map(function(value, index) {
			return (<Tr currentDate={controller.Store.getCurrentDate()} viewType={controller.Store.getActualViewType()} rowData={value} key={index} />);
		});

		var thead;

		if(controller.Store.getActualViewType() === 'month') {
			thead = <thead>
				<tr>
					<td>SU</td>
					<td>MO</td>
					<td>TU</td>
					<td>WE</td>
					<td>TH</td>
					<td>FR</td>
					<td>SA</td>
				</tr>
			</thead>;
		}

		return(
			<div className='widget-block'>
				<div className='div-navbar'>
					<div
						className='div-gliphicon'
						onClick={this.handlePrevious}>
						<span
							className="glyphicon glyphicon-menu-left"
							aria-hidden='true'>
						</span>
					</div>
					<div
						className='div-range'
						onClick={this.handleChangeView}>
						<span>
							{ controller.Store.getAreaViewSwitched()}
						</span>
					</div>
					<div
						className='div-gliphicon'
						onClick={this.handlerNext}
						>
						<span
							className="glyphicon glyphicon-menu-right"
							aria-hidden='true'>
						</span>
					</div>
				</div>
				<div className='div-content'>
					<table
						className='content-table'>
							{thead}
						<tbody>
							{trList}
						</tbody>
					</table>
				</div>
				<div
					className = 'footerCalendar'>
					<button
						type='button'
						className='btn btn-calendar'>
							Today
					</button>
				</div>
			</div>
		);
	}
});

module.exports = CalendarTable;
