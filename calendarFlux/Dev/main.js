var React = require('react'),
	ReactDOM = require('react-dom'),
	InputField = require('./components/inputField');

var ready = function() {
	ReactDOM.render(<InputField />, document.getElementById('inputDateField'));
};

document.addEventListener("DOMContentLoaded", ready);