var React = require('react'),
	ReactDOM = require('react-dom'),
	InputField = require('./components/inputField'),
	binds = require('./controllers/binds.js')

var ready = function() {
	ReactDOM.render(<InputField />, document.getElementById('inputDateField'));
};

document.addEventListener("DOMContentLoaded", ready);
