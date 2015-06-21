//Start of Date module
function getRBMonth(d) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[d.getMonth()];
}

Date.prototype.addMins = function(mins) {
    this.setMinutes(this.getMinutes() + mins);
    return this;
};

Date.prototype.addHours = function(hours) {
    this.setHours(this.getHours() + hours);
    return this;
};

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
    return this;
};

Date.prototype.addMonths = function(months) {
    this.setMonth(this.getMonth() + months);
    return this;
};

Date.prototype.addYears = function(years) {
    this.setFullYear(this.getFullYear() + years);
    return this;
};

Date.prototype.toDateOnly = function() {
    var dateOnly = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    return dateOnly;
};

Date.prototype.toRBString = function() {
    return ((this.getDate() >= 10 ? this.getDate() : '0' + this.getDate()) + "-" + getRBMonth(this) + "-" + this.getFullYear());
};

Date.prototype.toRBTimeString = function() {
    var hours = this.getHours();
    var mins = this.getMinutes();

    var hoursString = hours > 12 ? hours - 12 : hours;
    if (hoursString < 10) {
        hoursString = "0" + hoursString;
    }

    var minString = mins;
    if (minString < 10) {
        minString = "0" + minString;
    }

    var AMPMString = hours < 12 ? 'AM' : 'PM';

    return hoursString + ':' + minString + ' ' + AMPMString;
};

Date.getFromRBDate = function(str) {
    var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    var arr = str.split('-');
    if (arr.length == 3)
        return new Date(parseInt(arr[2], 10), months.indexOf(arr[1].toUpperCase()), parseInt(arr[0], 10));
    else
        return undefined;
};

Date.getdifferenceinDay = function(a, b) {
    return (Date.getTimeDifferenceInMins(a, b)) / (60 * 24);
};

Date.getDurationString = function(durationInMins) {

    var hoursString = Math.floor(durationInMins / 60);
    if (hoursString < 10) {
        hoursString = "0" + hoursString;
    }

    var minString = durationInMins % 60;
    if (minString < 10) {
        minString = "0" + minString;
    }

    return hoursString + ':' + minString + ' Hrs';
};

Date.getTimeDifferenceInMins = function(a, b) {
    var diff = b.getTime() - a.getTime();
    var diffMins = Math.floor(diff / (1000 * 60));

    return diffMins;
};

Date.getTimeDifferenceString = function(a, b) {
    var diffMins = Date.getTimeDifferenceInMins(a, b);
    return Date.getDurationString(diffMins);
};

Date.toDateFromJson = function(dateString) {
    return new Date(parseInt(dateString.substr(6), 10)).getLocalEquivalent();
};

Date.prototype.getLocalEquivalent = function() {
    return this.addMins(this.getTimezoneOffset()).addMins(330);
};

/* date in long format*/
function dateInLong(d) {
    var DOY = Math.ceil((new Date(d) - new Date(new Date(d).getFullYear(), 0, 1)) / 86400000);
    var Year = new Date(d).getFullYear() * 1000;
    return (DOY + Year);
}


/*datetime to unix time format*/
function unixTimeStamp(dToUnix) {
        return Math.floor(new Date(dToUnix).getTime() / 1000.0);
    }
    //End of Date module
    /// <reference path="../../../Hotels/js/hoteldetailSourceMap.js" />

Date.prototype.equalsMonth = function(d) {
    return (d.getFullYear() == this.getFullYear() && d.getMonth() == this.getMonth());
};

Date.prototype.equalsDate = function(d) {
    return (d.getFullYear() == this.getFullYear() && d.getDate() == this.getDate() && d.getMonth() == this.getMonth());
};

Date.prototype.toIndianString = function() {
    var day = this.getDate();
    var month = this.getMonth() + 1;
    var year = this.getFullYear();
    if (month < 10)
        month = '0' + month;

    if (day < 10)
        day = '0' + day;

    var str = day + '/' + month + '/' + year;

    return str;
};

Date.prototype.toStandardString = function() {
    var day = this.getDate();
    var month = this.getMonth() + 1;
    var year = this.getFullYear();
    if (month < 10)
        month = '0' + month;

    if (day < 10)
        day = '0' + day;

    var str = year + '-' + month + '-' + day;

    return str;
};
Date.prototype.toDayString = function () {
    var myDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return myDays[this.getDay()];
};
Date.toLongDateString = function(d) {

    var myDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var m_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var myDate = Date.getFromRBDate(d);
    var dayn = myDays[myDate.getDay()].substring(0, 3);
    var monV = m_names[myDate.getMonth()];

    var dateVal = Date.getFromRBDate(d).toStandardString();
    dateVal = dateVal.split('-');

    var suffix = "";
    if (parseInt(dateVal[2], 10) > 20 || parseInt(dateVal[2], 10) < 10) {
        switch (parseInt(dateVal[2], 10) % 10) {
            case 1:
                suffix = "st";
                break;
            case 2:
                suffix = "nd";
                break;
            case 3:
                suffix = "rd";
                break;
            default:
                suffix = "th";
                break;
        }
    } else {
        suffix = "th";
    }

    var str = dayn + ", " + monV + " " + dateVal[2] + suffix + " " + dateVal[0];
    return str;
};

/**
 * Get the date in DDMMYYYY format
 * @param  none
 * @return {Number} date
 */
Date.prototype.getDDMMYYYY = function() {
    var _this = this;
    var day   = _this.getDate();
    var month = _this.getMonth() + 1;
    var year  = _this.getFullYear().toString().substr(2,2);

    // Prepend '0' if date or month < 10
    if(day < 10)
        day = '0' + day;
    if(month < 11)
        month = '0' + month;

    // Convert to string to concatenate
    var date = '' + day + month + year;

    // parse to int before return
    return parseInt(date, 10);
};

/**
 * Check validity of any date
 * @param  {String}  date
 * @return {Boolean}
 */
function isValidDate (currDate) {
    // Parse and see if it makes a valid date object
    var date  = new Date(currDate);

    if (!date || !date.getTime())
        return false;

    return true;
}
c=atob;