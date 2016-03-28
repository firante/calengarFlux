var React = require('react');
var Td = require('./calendarCell');

var Tr = React.createClass({
	render: function() {
		
		var tdList = this.props.rowData.map(function(value, index) {
			return(<Td callData = {value} key = {index} />)
		});
		return (
			<tr>
				{tdList}
			</tr>
		);
	}
});

module.exports = Tr;