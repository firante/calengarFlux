var Flux = require('flux');
var MicroEvent  = require('../js/microevent');

var AppDispatcher = new Flux.Dispatcher();

var monthDays = [[],[],[],[],[],[],[]]; // days in the month

// -- actual date --
var currentDate = {
	day: 0,
	month: 0,
	year: 0
};

var actualView = null; // object for rendering

var setCurrentDate = function(newDate) {
	var date = new Date(newDate.year, newDate.getMonth, newDate.day);

	currentDate.day = parseInt(date.getDate());
	currentDate.month = parseInt(date.getMonth());
	currentDate.year = parseInt(date.getFullYear());
};

var StoreController = {
	// -- function for actualize days view --
	actualizeMonthView: function() {
		var date = new Date(currentDate.year, currentDate.month, 1);
		if(parseInt(date.getDay()) === 0) {
			date = new Date(currentDate.year, currentDate.month, parseInt(date.getDate())-7);
		} else {
			date = new Date(currentDate.year, currentDate.month, parseInt(date.getDate()) - parseInt(+date.getDay()-1));
		}

		for(var i = 0; i < 6; i += 1) {
				for(var j = 0; j < 7; j += 1) {
					monthDays[i].push({
						value: parseInt(date.getDate()),
						isActive: (parseInt(currentDate.month) === parseInt(date.getMonth()) ? 'thisMonth' : 'otherMonth')
					});
					date = new Date(+date.getFullYear(), +date.getMonth(), +date.getDate() + 1);
				}
			}

	},

	/* -- calculate and generate days matrix --
	*	@payload  object with cell that bean clicked --
	*/
	calculateDay: function(payload) {
		if(typeof payload !== 'undefined') {
			if(payload.actual === 'thisMonth') {
				setCurrentDate({
					day: parseInt(payload.day),
					month: currentDate.month,
					year: currentDate.year
				});
				return;
			} else {
				if(payload.day > 15) {
					setCurrentDate({
						day: parseInt(payload.day),
						month: (currentDate.month === 0 ? 11 : currentDate.month -= 1),
						year: (currentDate.month === '0' ? currentDate.year -= 1 : currentDate.year)
					});
				} else {
					setCurrentDate({
						day: parseInt(payload.day),
						month: (currentDate.month === 11 ? 0 : currentDate.month += 1),
						year: (currentDate.month === 11 ? currentDate.year += 1 : currentDate.year)
					});
				}
			}
		} else {
			var date = new Date();
			setCurrentDate({
				day: parseInt(date.getDate()),
				month: parseInt(date.getMonth()),
				year: parseInt(date.getFullYear())
			});
		}
		this.actualizeMonthView();
		actualView = monthDays;
	},

	// -- get actual view for rendering --
	getActualView: function() {
		if(!actualView) {
			this.calculateDay();
		}
		return actualView;
	},

	getCurrentDate: function() {
		return currentDate;
	}
};

MicroEvent.mixin(StoreController);

/*
* Registering events
*/
AppDispatcher.register(function(payload) {
	switch(payload.eventName) {
		case "changeDay":
			StoreController.calculateDay(payload);
			if(payload.isActive === 'thisMonth') {
				StoreController.trigger('changeDate'); 	// -- change only textbox with date --
			} else {
				StoreController.trigger('changeView');	// -- change view calendar --
			}
		break;
		case 'nextMonth':
			setCurrentDate({
				day: currentDate.day,
				month: (currentDate.month === 11 ? 0 : currentDate.month += 1),
				year: (currentDate.month === 11 ? currentDate.year += 1 : currentDate.year)
			});
			this.actualizeMonthView();
			StoreController.trigger('changeView');
		break;
		default:
			break;
	}
});

exports.Dispatcher = AppDispatcher;
exports.Store = StoreController;
exports.monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
						'November', 'December'];
