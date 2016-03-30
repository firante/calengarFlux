var Flux = require('flux');
var MicroEvent  = require('../../js/microevent');

var AppDispatcher = new Flux.Dispatcher();

var month; // days in the month

var	year = [
	[{value:'Jan', isActive:'otherDate'}, {value:'Feb', isActive:'otherDate'}, {value:'Mar', isActive:'otherDate'}] ,
	[{value:'Apr', isActive:'otherDate'}, {value:'May', isActive:'otherDate'}, {value:'Jun', isActive:'otherDate'}] ,
	[{value:'Jul', isActive:'otherDate'}, {value:'Aug', isActive:'otherDate'}, {value:'Sep', isActive:'otherDate'}] ,
	[{value:'Oct', isActive:'otherDate'}, {value:'Nov', isActive:'otherDate'}, {value:'Dec', isActive:'otherDate'}]
];

var year_range;

// -- actual date --
var currentDate = {
	day: 0,
	month: 0,
	monthText: '',
	year: 0
};

var actualView = null; // object for rendering

var actualViewType = 'month'; // actual view type

var actualAreaViewSwitched = null; // object for present actual data in area view switch

var monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
									'September','October', 'November', 'December'];

// --- function get key by value , value sliced to three first word ---

var setCurrentDate = function(newDate) {
	var date = new Date(newDate.year, newDate.month, newDate.day);
	currentDate.day = parseInt(date.getDate());
	currentDate.month = parseInt(date.getMonth());
	currentDate.monthText = monthList[date.getMonth()].slice(0, 3);
	currentDate.year = parseInt(date.getFullYear());
};

	// -- function for actualize month view --
var actualizeMonthView = function() {
	month = [[],[],[],[],[],[],[]];

	var date = new Date(currentDate.year, currentDate.month, 1);
	if(parseInt(date.getDay()) === 0) {
		date = new Date(currentDate.year, currentDate.month, parseInt(date.getDate())-7);
	} else {
		date = new Date(currentDate.year, currentDate.month, date.getDate() - date.getDay());
	}

	for(var i = 0; i < 6; i += 1) {
			for(var j = 0; j < 7; j += 1) {
				month[i].push({
					value: parseInt(date.getDate()),
					isActive: (parseInt(currentDate.month) === parseInt(date.getMonth()) ? 'thisDate' : 'otherDate')
				});
				date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
			}
		}
};

// -- function for actualize year-range view --
var actualizeYearView = function(side, val) {
	year_range = [[], [], [], []];
	var actualYear, i, j;
	if(!side) {
		actualYear = currentDate.year;
		actualYear -= 6;
		for(i = 0; i < 4; i += 1) {
			for(j = 0; j < 4; j += 1) {
				year_range[i].push({
					value: actualYear,
					isActive: 'otherDate'
				});
				actualYear += 1;
			}
		}
	} else {
		if(side === 'next') {
			actualYear = parseInt(val);
			for(i = 0; i < 4; i += 1) {
				for(j = 0; j < 4; j += 1) {
					year_range[i].push({
						value: actualYear,
						isActive: 'otherDate'
					});
					actualYear += 1;
				}
			}
		} else {
			actualYear = parseInt(val)-15;
			for(i = 0; i < 4; i += 1) {
				for(j = 0; j < 4; j += 1) {
					year_range[i].push({
						value: actualYear,
						isActive: 'otherDate'
					});
					actualYear += 1;
				}
			}
		}
	}
};

// -- function for return month index --
var getMonthIndex = function(mon) {
	for(var i = 0; i < 12; i += 1) {
		if(monthList[i].slice(0, 3) === mon) {
			return i;
		}
	}
};

/* -- calculate and generate days matrix --
*	@payload  object with cell that bean clicked --
*/
var calculateDay = function(payload) {
	if(typeof payload !== 'undefined') {
		if(payload.item.isActive === 'thisDate') {
			setCurrentDate({
				day: parseInt(payload.item.cellValue),
				month: currentDate.month,
				year: currentDate.year
			});
			return;
		} else {
			if(payload.item.cellValue > 15) {
				setCurrentDate({
					day: parseInt(payload.item.cellValue),
					month: (currentDate.month === 0 ? 11 : currentDate.month -= 1),
					year: (currentDate.month === '0' ? currentDate.year -= 1 : currentDate.year)
				});
			} else {
				setCurrentDate({
					day: parseInt(payload.item.cellValue),
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
	actualizeMonthView();
	actualView = month;
	actualAreaViewSwitched = monthList[currentDate.month] + " " + currentDate.year;
};

var StoreController = {
	// -- get actual view for rendering --
	getActualView: function() {
		if(!actualView) {
			calculateDay();
		}
		return actualView;
	},

	getCurrentDate: function() {
		return currentDate;
	},

	getAreaViewSwitched () {
		return actualAreaViewSwitched;
	},

	getActualViewType: function() {
		return actualViewType;
	},

	getMonthList: function() {
		return monthList;
	}
};

MicroEvent.mixin(StoreController);

/*
* Registering events
*/
AppDispatcher.register(function(payload) {
	switch(payload.eventName) {
		// -- register dispatcher for click cell events
		case "changeDate":
			clickCellChangeButtonEvents(payload);
		break;

		// -- register dispatcher for next date --
		case 'dateNext':
			registersDateNext();
		break;

		// -- register dispatcher for previouse date --
		case 'datePrev':
			registersDatePrevious();
		break;

		// -- register dispatcher for change view --
		case 'changeView':
			changeViewButton();
		break;

		default:
			break;
	}
});

/*
* function-expressions for register click cell event and change date
*/
var clickCellChangeButtonEvents = function(payload) {
	switch(actualViewType) {
		case 'month':
			calculateDay(payload);
			StoreController.trigger('changeView');
			StoreController.trigger('changeInput');
		break;

		case 'year':
			setCurrentDate({
				day: 1,
				month: getMonthIndex(payload.item.cellValue),
				year: currentDate.year
			});
			actualizeMonthView();
			actualView = month;
			actualViewType = 'month';
			actualAreaViewSwitched = monthList[currentDate.month] + " " + currentDate.year;
			StoreController.trigger('changeView');
		break;

		case 'year-range':
			setCurrentDate({
				day: currentDate.day,
				month: currentDate.month,
				year: payload.item.cellValue
			});
			actualView = year;
			actualViewType = 'year';
			actualAreaViewSwitched = currentDate.year;
			StoreController.trigger('changeView');	// -- change view calendar --
		break;

		default:
		break;
	}
}

/*
* function-expresions for registered Next caret events in calendar
*/
var registersDateNext = function() {
	switch(actualViewType) {
		case 'month':
			setCurrentDate({
				day: 1,
				year: (currentDate.month === 11 ? currentDate.year += 1 : currentDate.year),
				month: (currentDate.month === 11 ? 0 : currentDate.month += 1)
			});
			actualizeMonthView();
			actualView = month;
			actualAreaViewSwitched = monthList[currentDate.month] + " " + currentDate.year;
			StoreController.trigger('changeView');
		break;

		case 'year':
			setCurrentDate({
				day: currentDate.day,
				month: currentDate.month,
				year: currentDate.year += 1
			});
			actualAreaViewSwitched = currentDate.year;
			StoreController.trigger('changeView');
		break;

		case 'year-range':
			actualizeYearView('next', year_range[3][3].value);
			actualView = year_range;
			actualAreaViewSwitched = actualView[0][0].value + '-' + actualView[3][3].value;
			StoreController.trigger('changeView');
		break;

		default:
		break;
	}
};

/*
* function-expresions for register previous caret events in calendar
*/
var registersDatePrevious = function() {
	switch(actualViewType) {
		case 'month':
			setCurrentDate({
				day: 1,
				year: (currentDate.month === 0 ? currentDate.year -= 1 : currentDate.year),
				month: (currentDate.month === 0 ? 11 : currentDate.month -= 1)
			});
			actualizeMonthView();
			actualView = month;
			actualAreaViewSwitched = monthList[currentDate.month] + " " + currentDate.year;
			StoreController.trigger('changeView');
		break;

		case 'year':
		setCurrentDate({
			day: currentDate.day,
			month: currentDate.month,
			year: currentDate.year -= 1
		});
		actualAreaViewSwitched = currentDate.year;
		StoreController.trigger('changeView');
		break;

		case 'year-range':
			actualizeYearView('prev', year_range[0][0].value);
			actualView = year_range;
			actualAreaViewSwitched = actualView[0][0].value + '-' + actualView[3][3].value;
			StoreController.trigger('changeView');
		break;

		default:
		break;
	}
};

/*
* function-expresions for register change-view button events
*/
var changeViewButton = function() {
	switch (actualViewType) {
		case 'month':
			actualViewType = 'year';
			actualView = year;
			actualAreaViewSwitched = currentDate.year;
			StoreController.trigger('changeView');
		break;

		case 'year':
			actualizeYearView();
			actualViewType = 'year-range';
			actualView = year_range;
			actualAreaViewSwitched = actualView[0][0].value + '-' + actualView[3][3].value;
			StoreController.trigger('changeView');
		break;

		default: break;
	}
};

exports.Dispatcher = AppDispatcher;
exports.Store = StoreController;
exports.monthList = monthList;
