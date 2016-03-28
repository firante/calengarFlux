var React = require('react');
var Tr = require('./calendarRow');
var controller = require('../controller');

var CalendarTable = React.createClass({
	render: function() {
		var trList = controller.getActualView().map(function(value, index) {
			return (<Tr rowData={value} key={index} />);
		});

		return(
			<div>
				/*
				* header calendar table
				*/
				<div
					className = 'collapse navbar-collapse headerCalendar'>
					<ul
						className='nav navbar-nav'>
						<li>
							<span 
								className="glyphicon glyphicon-menu-left"
								aria-hidden='true'>
							</span>	
						</li> 
						<li>
							<span> 
								{ controller.monthList[controller.Store.getCurrentDate.month] } 
							</span>
						</li> 
						<li>
							<span 
								className="glyphicon glyphicon-menu-right"
								aria-hidden='true'>
							</span>	
						</li> 
					</ul>
				</div>

				/*
				* body calendar table
				*/
				<div>
					<table 
						className='table'>
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

				/*
				* footer calendar table
				*/
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