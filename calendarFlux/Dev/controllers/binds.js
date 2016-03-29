var React = require('react');
var ReactDOM = require('react-dom');
var CalendarTable = require('../components/calendarTable');
var controller = require('./flux_store_disp_modul');

(function () {
  var changeView = function () {
    ReactDOM.render(<CalendarTable />, document.getElementById('selectDateWidget'));
  };


  controller.Store.bind('changeView', changeView);

}());
