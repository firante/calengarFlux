var React = require('react');
var ReactDOM = require('react-dom');
var CalendarTable = require('../components/calendarTable');
var InputField = require('../components/inputField');
var controller = require('./flux_store_disp_modul');

(function () {
  var changeView = function () {
    ReactDOM.render(<CalendarTable />, document.getElementById('selectDateWidget'));
  };

  var changeInput = function () {
    ReactDOM.render(<InputField />, document.getElementById('inputDateField'));
  };

  controller.Store.bind('changeView', changeView);

  controller.Store.bind('changeInput', changeInput);

}());
