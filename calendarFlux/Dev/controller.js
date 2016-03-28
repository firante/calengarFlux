var Flux = require('flux');
var MicroEvent  = require('../js/microevent');

var AppDispatcher = new Flux.Dispatcher();

var monthDays = []; // days in the month

var Store = {
	// -- actual date --
	currentDate: {
		day: 0,
		month: 0,
		year: 0
	},

	actualView: null, // object for rendering
	

	setCurrentDate: function(newDate) {
		this.currentDate.day = newDate.day;
		this.currentDate.month = newDate.month;
		this.currentDate.year = newDate.year;
	},



	// -- function for actualize days view --
	actualizeMonthView: function() {
		var date = new Date(this.currentDate.year, this.currentDate.month, 1);
		if(parseInt(date.getDay()) === 0) {
			date = new Date(this.currentDate.year, this.currentDate.month, parseInt(date.getDate())-7);
		} else {
			date = new Date(this.currentDate.year, this.currentDate.month, parseInt(date.getDate()) - parseInt(getDay()));
		}

		for(var i = 0; i < 6; i += 1) {
				for(var j = 0; j < 7; j += 1) {
					monthDays[i][j] = {
						value: parseInt(date.getDate()),
						isActive: (parseInt(currentDate.month) === parseInt(date.getMonth()) ? 'thisMonth' : 'otherMonth')
					};
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
				this.setCurrentDate({
					day: parseInt(payload.day), 
					month: this.currentDate.month, 
					year: this.currentDate.year
				});
				return;
			} else {
				if(payload.day > 15) {
					this.setCurrentDate({
						day: parseInt(payload.day),
						month: (this.currentDate.month === 0 ? 11 : this.currentDate.month -= 1),
						year: (this.currentDate.month === '0' ? this.currentDate.year -= 1 : this.currentDate.year) 
					});
				} else {
					this.setCurrentDate({
						day: parseInt(payload.day),
						month: (this.currentDate.month === 11 ? 0 : this.currentDate.month += 1),
						year: (this.currentDate.month === 11 ? this.currentDate.year += 1 : this.currentDate.year) 
					});
				}
			}
		} else {
			var date = new Date();
			this.setCurrentDate({
				day: parseInt(date.getDate()),
				month: parseInt(date.getMonth()),
				year: parseInt(date.getFullYear())
			});
		}
		this.actualizeMonthView();
		this.actualView = monthDays;
	},

	// -- get actual view for rendering --
	getActualView: function() {
		if(!actualView) {
			this.calculateDay();
		}	
		return this.actualView;
	},

	getCurrentDate: function() {
		return this.currentDate;
	}


};

MicroEvent.mixin(Store);

/*
* Registering events
*/
AppDispatcher.register(function(payload) {
	switch(payload.eventName) {
		case "changeDay":
			Store.calculateDay(payload);
			if(payload.isActive === 'thisMonth') {
				Store.trigger('changeDate'); 	// -- change only textbox with date --
			} else {
				Store.trigger('changeView');	// -- change view calendar --
			}
			break;
		default:
			break;
	}
});

exports.Dispatcher = AppDispatcher;
exports.Store = Store; 
exports.monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 
						'November', 'December'];
