var React = require('react');
var ReactDOM = require('react-dom');
var Tr = require('./calendarRow');
var controller = require('../controller');

var CalendarTable = React.createClass({
	componentDidMonth: function() {
		controller.Store.bind('changeView', this.changeView);
	},

	componentWillUnmonth: function() {
		controller.Store.unbind('changeView', this.changeView);
	},

	changeView: function() {
		ReactDOM.render(<CalendarTable />, document.getElementById('selectDateWidget'));
	},

	handlerNextMonth: function() {
		controller.dispatch({
			eventName: 'nextMonth',
      item: {month: controller.Store.getCurrentDate().month}
		});
	},

	render: function() {
		var trList = controller.Store.getActualView().map(function(value, index) {
			return (<Tr rowData={value} key={index} />);
		});

		return(
			<div className='widget-block'>
				<div className='div-navbar'>
					<div className='div-gliphicon'>
						<span
							className="glyphicon glyphicon-menu-left"
							aria-hidden='true'>
						</span>
					</div>
					<div className='div-range'>
						<span>
							{ controller.monthList[controller.Store.getCurrentDate().month] }
						</span>
					</div>
					<div
						className='div-gliphicon'
						onClick={this.handlerNextMonth}
						>
						<span
							className="glyphicon glyphicon-menu-right"
							aria-hidden='true'>
						</span>
					</div>
				</div>
				<div>
					<table
						className='content-table'>
						<thead>
							<tr>
								<td>SU</td>
								<td>MO</td>
								<td>TU</td>
								<td>WE</td>
								<td>TH</td>
								<td>FR</td>
								<td>SA</td>
							</tr>
						</thead>
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
