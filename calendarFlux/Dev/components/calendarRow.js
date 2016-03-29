	var React = require('react');
var Td = require('./calendarCell');

var Tr = React.createClass({
	render: function() {
		var viewType = this.props.viewType;
		var currentDate = this.props.currentDate;
		var tdList = this.props.rowData.map(function(value, index) {
			return(<Td currentDate={currentDate} viewType={viewType} callData = {value} key = {index} />)
		});
		return (
			<tr>
				{tdList}
			</tr>
		);
	}
});

module.exports = Tr;
