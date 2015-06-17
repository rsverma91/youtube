
//Adding trim functionality if not supported
if(typeof String.prototype.trim =='undefined'){
	String.prototype.trim = function (){ 
		return this.replace(/^\s+|\s+$/g, ''); 
	};
}

var root = this;
(function( jQuery ) {

if ( root.XDomainRequest ) {
  jQuery.ajaxTransport(function( s ) {
    if ( s.crossDomain && s.async ) {
      if ( s.timeout ) {
        s.xdrTimeout = s.timeout;
        delete s.timeout;
		}
      var xdr;
      return {
        send: function( _, complete ) {
          function callback( status, statusText, responses, responseHeaders ) {
            xdr.onload = xdr.onerror = xdr.ontimeout = jQuery.noop;
            xdr = undefined;
            complete( status, statusText, responses, responseHeaders );
          }
          xdr = new XDomainRequest();
          if(s.dataType){
              var headerThroughUriParameters = "header_Accept=" + encodeURIComponent(s.dataType);
              s.url = s.url + (s.url.indexOf("?") === -1 ? "?" : "&" ) + headerThroughUriParameters;
          }
          xdr.open( s.type, s.url );
          xdr.onload = function(e1, e2) {
            callback( 200, "OK", { text: xdr.responseText }, "Content-Type: " + xdr.contentType );
          };
          xdr.onerror = function(e) {
              
            callback( 404, "Not Found" );
          };
          if ( s.xdrTimeout ) {
            xdr.ontimeout = function() {
              callback( 0, "timeout" );
            };
            xdr.timeout = s.xdrTimeout;
          }
          xdr.send( ( s.hasContent && s.data ) || null );
        },
        abort: function() {
          if ( xdr ) {
            xdr.onerror = jQuery.noop();
            xdr.abort();
          }
        }
      };
		}
	});
}
})( jQuery );

(function() {
    


	var animationPrefixes = [
		'',
		'webkit',
		'Webkit',
		'o', 
		'O',
		'ms',
		'MS'
	];


	$.prototype.onAnimationEnd = function(callback){
		var event = getEventsForBrowser('animation', 'end');
		if(event !== null){
			this.on(event, function (e) {
				callback();
			});
		}else{
			callback();
		}
		
	};
	$.prototype.onTransitionEnd = function(callback){
		var event = getEventsForBrowser('transition', 'end');
		if(event !== null){
			this.on(event, function (e) {
				callback();
			});
		}else{
			callback();
		}
		
	};

	var getEventsForBrowser = function(event, eventTrigger){
		eventTrigger = eventTrigger.toLowerCase();
		var eventBase = getEventForBrowser(event);

		if(eventBase === null)
			return null;
		var cappedEventTrigger = eventTrigger.charAt(0).toUpperCase() + eventTrigger.substr(1);
		var eventString  = eventBase + cappedEventTrigger + ' ' + eventBase + eventTrigger;

		return eventString;
	};

	var getEventForBrowser = function(eventBase){
		var body = document.body || document.documentElement;
		var style = body.style;
		var animation = null;

		var trialName = eventBase;

		if(typeof style[trialName] == 'string') {
			animation = eventBase;
		}
		else{
			var v = ['webkit', 'Webkit', 'O', 'o', 'ms', 'MS'];
			trialName = trialName.charAt(0).toUpperCase() + trialName.substr(1);
			for(var i=0; i<animationPrefixes.length; i++) {
				if(typeof style[animationPrefixes[i] + trialName] == 'string') { 
					animation = animationPrefixes[i] + trialName;
					break;
				}
			}
		}

		return animation;
	};

})();
Array.prototype.contains = function(key){
	for(var i = 0; i < this.length; i++){
		if(this[i] === key)
			return true;
	}
	return false;
};

//Adding Array.indexOf if not supported
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement , fromIndex) {
    var i,
        pivot = (fromIndex) ? fromIndex : 0,
        length;

    if (!this) {
      throw new TypeError();
    }

    length = this.length;

    if (length === 0 || pivot >= length) {
      return -1;
    }

    if (pivot < 0) {
      pivot = length - Math.abs(pivot);
    }

    for (i = pivot; i < length; i++) {
      if (this[i] === searchElement) {
        return i;
      }
    }
    return -1;
  };
}
if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisp */) {
        "use strict";

        if (this === void 0 || this === null)
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
            throw new TypeError();

        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, t))
                    res.push(val);
            }
        }

        return res;
    };
}
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
RB = RB || {};
//Cookie module
RB.Cookie = new function () {
	this.set = function (key, value, expMins) {
		var ex = new Date();
		expMins = expMins || (10 * 365 * 24 * 60);
		ex.addMins(expMins);
		value = escape(value) + ((ex === null) ? "" : "; expires=" + ex.toUTCString());
		document.cookie = key + "=" + value;
	};

	this.get = function (key) {
		var c_value = document.cookie;
		var c_start = c_value.indexOf(" " + key + "=");
		if (c_start == -1) {
			c_start = c_value.indexOf(key + "=");
		}
		if (c_start === -1) {
			c_value = null;
		}
		else {
			c_start = c_value.indexOf("=", c_start) + 1;
			var c_end = c_value.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = c_value.length;
			}
			c_value = unescape(c_value.substring(c_start, c_end));
		}
		return c_value;
	};

	this.clear = function (key) {
		this.set(key, '', -1);
	};
};
//End of cookie module



RB = RB || {};
/*
 *	Preference.js : Store all preferences related to the redBus.in web app
 *	
 *	Its basically a key value store persistance in clientside
 *	works on localStorage and gracefully degrades to cookies for unsupported browsers
 *	set(key,value)
 *	get(key)
 *	remove(key) 
 */

RB.Preferences = new function(){
	var isLocalStorageSupported = function(){
		try {
			return 'sessionStorage' in window && window.localStorage !== null;
		} catch (e) {
			return false;
		}
	};

	this.set = function(key,value){
		if(isLocalStorageSupported())
			localStorage.setItem(key,value);
		else
			RB.Cookie.set(key,value);
	};

	this.get = function(key){
		var value = null;
		if(isLocalStorageSupported())
			value = localStorage.getItem(key);
		if(value === null)
			value = RB.Cookie.get(key);

		return value;
	};

	this.remove = function(key){
		if(isLocalStorageSupported())
			localStorage.removeItem(key);
		RB.Cookie.clear(key);
	};
};
RB = RB || {};
RB.Bookmark = new function(){
	this.add = function(title, url){
		title = title || document.title;
		url = url || location.href;

		var isBookmarked = true;

		var UA = navigator.userAgent.toUpperCase();
		if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
			window.sidebar.addPanel(title, url, '');
		} else if(window.external && ('AddFavorite' in window.external)) { // IE Favorite
			window.external.AddFavorite(url,title); 
		} else if(window.opera && window.print) { // Opera Hotlist
			this.title=document.title;return true;
		} else if (UA.indexOf('KONQUEROR') != -1) {
			alert('Please press CTRL+B to add this page to your Favorite.');
		} else { // webkit - safari/chrome
			alert('Press ' + (UA.indexOf('MAC') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
		}

		return isBookmarked;
	};

	this.isSupported = function(){
		return (window.sidebar || window.external || (window.opera && window.print));
	};
};
// This is a place for common helper for app
var CommonHelper = new function () {

    var _self = this;

    this.alertBox = function (txt) {
        alert(txt);
    };



    /*
    * {value} @param is boolean value 
    * showWaiting function add temporary mouse loader with whole UI blocked 
    * Can be used while waiting for webservice call
    */
    var _maxWaiting = 30000;
    var _clearWaitingTimeoutId = null;

    this.showWaiting = function (value) {
        if (value) {
            if (_clearWaitingTimeoutId !== null) {
                clearTimeout(_clearWaitingTimeoutId);
            }
            var div = document.getElementById("busyScreen");
            if (!div) {
                div = document.createElement("div");
                div.id = "busyScreen";
                $("body").append(div);
            }
            setTimeout(function () {
                $("#busyScreen").css("cursor", "wait");
            }, 10);
            /* Safeguard: schedule a minute timeout handler to return the cursor back to normal
            * to avoid blocking the app in case something goes wrong (which never happens of course)
            */
            setTimeout(function () {
                _clearWaitingTimeoutId = _self.showWaiting(false);
            }, _maxWaiting);
        } else {
            if (_clearWaitingTimeoutId !== null) {
                clearTimeout(_clearWaitingTimeoutId);
            }
            setTimeout(function () {
                $("#busyScreen").css("cursor", "default");
                setTimeout(function () {
                    $("#busyScreen").remove();
                }, 10);

            }, 10);
        }
    };


} ();


function RBxt_click(A, B, C, D, E, F, G) {
    if (typeof xt_click === "function" && xt_click !== "undefined") {
        xt_click(A, B, C, D, E, F, G);
    }
    else {

    }
}


RB = RB || {};
RB.URL = new function(){

	var qP = {};

	var parseURLParams = function(){
		var url = location.href;
		var paramPart = url.split('?')[1];
		if (paramPart) {
			var params = paramPart.split('&');
			for (var i = 0; i < params.length; i++) {
				var p = params[i].split('=');
				var key = p[0];
				p.splice(0,1);
				var value = p.join('=');
				qP[key] = decodeURIComponent(value);
			}
		}
	};

	this.create = function(url,params){
		var elements = [];

		for(var param in params){
			var key = param;
			var value = params[param];
			elements.push(key + '=' + value);
		}

		var finalurl = url + '?' + elements.join('&');

		return encodeURI(finalurl);
	};

	this.replaceQueryParam = function (obj, dontPush) {
		if (window.history.pushState) {
			var url = location.href;
			var segments = url.split('?');
			var path = segments[0];
			parseURLParams();

			for (var key in obj) {
				qP[key] = obj[key];
			}
			var newurl = this.create(path, qP);

			if(dontPush)
				window.history.replaceState({ path: newurl }, '', newurl);
			else
			window.history.pushState({ path: newurl }, '', newurl);
		}
	};

    this.replaceAndGetQueryParam = function (obj) {
        var url = location.href;
        var segments = url.split('?');
        var path = segments[0];
        parseURLParams();

        for (var key in obj) {
            qP[key] = obj[key];
        }

        var newurl = this.create(path, qP);

        return newurl;
    };


	this.getQueryParam = function(key){
		parseURLParams();
		if(typeof(qP)!='undefined' && typeof(qP[key])!='undefined')
			return qP[key];
		else
			return null;
	};

	parseURLParams();

}();
//Modal functionality to show the modal for sign in 
RB = RB || {};
RB.Modal = function (content, options) {

	var _this = this;

	var template = $('#modalTemplate').html();
	var container = document.createElement('div');
	$(container).html(template);
	$('body').append(container);


	var $el = $(container).find('.modal');
	this.el  = $el[0];
	var modalScroller = $el.find(".modalScroller");
	var modalFrame = $el.find(".modalFrame");
	var modalContent = $el.find(".modalContent");
	var modalClose = $el.find(".modalClose");
	var _self = this;

		options = options || {};
		options.height = options.height || 300;
		options.width = options.width || 300;
		options.showURL = options.showURL || false;

		options.isNonClosable = options.isNonClosable || false;

		options.onClose = options.onClose || function(){};

	this.show = function () {
		$el.show();
		this.resize();
		$('body').css({'overflow-y':'hidden'});
	};

	this.hide = function () {
		$el.hide();
		$('body').css({'overflow-y':'auto'});
		options.onClose();
	};

	this.setContent = function(content){
		modalContent.html(content);
		this.resize();
	};
	this.setOptions = function(opt){
		if(opt){
			options.height = opt.height ||  options.height;
			options.width = opt.width || options.width;
			options.showURL = opt.showURL || options.showURL;
		}
		this.resize();
	};

	this.close = function () {
		this.hide();
		if(!options.isPersistent)
			$(container).remove();
	};

	this.resize = function(){
		var sumHeights = 0;
		modalContent.children().each(function(){
			sumHeights += $(this).outerHeight(true);
		});
		var height = sumHeights+20;
		var width = options.width;

		if(height < options.height)
			height = options.height;

		setPositionAndSize(width,height);
	};

	var initialize = function (content, options) {
		
		if(!options.isNonClosable){
			modalClose.click(function (e) {
				_self.close();
				$(this).trigger("tracking");
			});

			modalScroller.click(function(e){
				_self.close();
				$(this).trigger("tracking");
			});
		}
		else{
			modalClose.hide();
		}
		modalFrame.click(function(e){
			e.stopPropagation();
		});
		if(options.showURL)
			content = '<iframe class=\'modalIframe\' src=' + content + '/>';
		
		modalContent.html(content);
		setPositionAndSize(options.width,options.height);
	};

	var setPositionAndSize = function(width,height){
		modalFrame.height(height);
		modalFrame.width(width);

		var modalPos = { top: -(height / 2), left: -(width / 2) };

		if(height > $(window).height())
			modalPos.top = 25 - ($(window).height()/2);

		modalFrame.css(modalPos);
	};

	initialize(content, options);
};
//End of Modal function
//Validation module
RB = RB || {};
RB.Validator = function(form) {

	var self = this;			

    var onChange = function () {
        self.validate(); 
    };

	this.validate = function () {
		var passAll = true;
        var elements = $(form).find('[data-validate]:visible').not(':disabled');

        elements.off('change', onChange);
        elements.on('change', onChange);
        $(form).find('.errorMessageFixed').text('').css('visibility', 'hidden');
        $(form).find('.errorMessage').remove();
        var isFocused = false;
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			$(element).parent().removeClass('errorParent');
			var validateResult = validateEach(element);
			if (validateResult !== -1) {
				var messages = $(element).attr('data-message').split('|');
				if (validateResult < messages.length) {
					
					var errorMessage =messages[validateResult];
					var errorDisplay = $(element).parent().find('.errorMessageFixed');
					$(element).parent().addClass('errorParent');
					if(errorDisplay.length > 0){
						errorDisplay.text(errorMessage);
						errorDisplay.css('visibility','visible');
					}else{
						var errorLabel = document.createElement('span');
						$(errorLabel).addClass('errorMessage');
						$(errorLabel).text(errorMessage);
						$(errorLabel).insertAfter(element);	
					}
					
                    if (!isFocused) {
                        $(element).focus();
                        isFocused = true;
                    }

				}
				passAll = false;
			}
		}
		return passAll;
	};

	var validateEach = function (element) {
		var validateFuntionStr = $(element).attr('data-validate');
		var valFuncs = validateFuntionStr.split('|');

		var flag = true;
		var n = valFuncs.length;
		for (var i = 0; i < n; i++) {
			if (self.rules[valFuncs[i]] && element) {
				var pass = self.rules[valFuncs[i]](element.value);
				if (!pass) {
					flag = false;
					break;
	}
		}
	}
		if (i >= n && flag) i = -1;
				
		return i;
	};

	this.addRule = function (name, ruleFunction) {
		this.rules[name] = ruleFunction;
	};

	//Default set of rules
	this.rules = {
		required: function (value) {
			if (value && value !== null && value.trim() !== "")
				return true;
			return false;
		},
		alpha: function (value) {
			var regex = /^[a-zA-Z_ -]+$/;
			return regex.test(value);
		},
		alphaName: function (value) {
			var regex = /^[a-zA-Z_ \.-]+$/;
			return regex.test(value);
		},
		alphaCity: function (value) {
			var regex = /^[a-zA-Z_() -]+$/;
			return regex.test(value);
		},
		alphanumeric: function (value) {
			var regex = /^[0-9a-zA-Z_-]+$/;
			return regex.test(value);
		},
		number: function (value) {
			var regex = /^[0-9]+$/;
			return regex.test(value);
		},
		phone: function (value) {
			var regex = /^(\+91[\-\s]?)?[789]\d{9}$/;
			return regex.test(value);
		},
		email: function (value) {
			var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return regex.test(value);
	}
	};
};
//End of validation module
/*
 * masterScript.js : HTML -> RBSiteNew.Master, CSS -> common.css
 * 
 * Dependencies
 * ------------
 * Fallback Module : modules/Fallbacks.js
 * Date Module : modules/Utility/Date.js
 * Cookie Module : modules/Utility/Cookie.js 
 * Preferences Module : modules/Utility/Preferences.js
 * Bookmark Module : modules/Utility/Bookmark.js
 * URL Module : modules/URL.js
 * Modal Module : modules/Modal.js, CSS -> common.css
 * Validator Module : modules/Validator.js, CSS -> common.css
 *
 */

var RB = RB || {};

//Facebook Script Init
function initFacebookScript() {
	//Facebook SDK Initialize
	window.fbAsyncInit = function () {
		// init the FB JS SDK
		FB.init({
			appId : Config.FACEBOOK_APP_ID,
			status: true,                                 
			xfbml: true                                  
		});
		FB.getLoginStatus(onFacebookLogin);
	};

	(function (d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) { return; }
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/all.js";
		fjs.parentNode.insertBefore(js, fjs);
	} (document, 'script', 'facebook-jssdk'));
}

var isGooglePlusScriptLoaded = false;
//Google Plus script init
function renderGooglePlusBtn() {
	gapi.signin.render('googlePlusBtn', {
		'callback': 'onGooglePlusLogin',
		'clientid': Config.GOOGLEPLUS_CLIENT_ID,
		'cookiepolicy': 'single_host_origin',
		'requestvisibleactions': 'http://schemas.google.com/AddActivity',
		'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
		'apppackagename': 'in.redbus.android',
		'redirecturi': 'postmessage',
		'approvalprompt': 'auto'
	});

	isGooglePlusScriptLoaded = true;
}
function initGooglePlusScript() {
	//Google + SDK
	(function() {
		var po = document.createElement('script');
		po.type = 'text/javascript'; po.async = true;
		po.src = 'https://apis.google.com/js/client:plusone.js?onload=renderGooglePlusBtn';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(po, s);
	})();

	
}
//End of Google Plus Script

//Authentication in Redbus

//Callbacks for button clicks and autologin
function onFacebookLogin(data) {
	Auth.Facebook(data);
}

function onGooglePlusLogin(data) {
	//callback = googlePlusCallback || onAutoSignIn;
	Auth.GooglePlus(data);
}

function onRedbusLoginClick(data, callback) {
	Auth.Redbus(data);
}

//Makes calls to redbus api to access
var UMS = function () {
	//Ajax call for reset for password
	this.resetPassword = function (email, callback) {
		var refUrl = location.href;
		var url = '/Forgot_PassAjax.aspx?refUrl=' + refUrl + '&e=' + email;
		$.get(url, callback, 'json');
	};

	//Ajax call for register new user
	this.registerUser = function (email, password, callback) {
		var refUrl = location.href;
        var postdata = 'e=' + email + '&p=' + password;
		var url = '/RegisteruserAjax.aspx?refUrl=' + refUrl;
		$.post(url, postdata, callback, 'json');
	};

	//sign in ums call
	this.signIn = function (data, callback) {
		var signInApiUrl = '/UserLoginAjax.aspx';
		$.post(signInApiUrl, { data: JSON.stringify(data) }, callback, 'json')
		.fail(function () { data.status = 'FAIL'; callback(data); });
	};

	this.signOut = function () {

	};
};

//Handles first level authentication
var Auth = new function () {
	var _this = this;
	//flag to prevent login by more than one method in autologin scenario
	var isAuthorized = false;

	this.LoginActionType = 'AUTO'; //AUTO, CLICK Describes the way the code has reached here. Auto login for single sign on or by button click

	//Generic function where all logins ends up.This function initiates UMS login (UserLoginAjax)
	this.onAuthorize = function (data) {
		//Check type of login and if the user has logged out
		if (RB.Cookie.get('ums') === null || RB.Cookie.get('loggedInType')== 'AUTO') {
		if ((RB.Cookie.get('preventAutoLogin') != 'true' && this.LoginActionType == 'AUTO') || (this.LoginActionType == 'CLICK' && this.LoginAccount == data.type)) {
		//if the first level auth is success and he is signed out or forced login
			if (data.status == 'SUCCESS') {
			if (!isAuthorized || data.type == 'REDBUS') {
				//What happens when login is completed
				isAuthorized = true;
				var ums = new UMS();
				ums.signIn(data, function (respData) { onUMSLoginComplete(respData); });
			}
		}
				if (typeof this.onFirstAuthComplete == 'function') {
					this.onFirstAuthComplete(data);
				}
		}
		}
	};

	//UMS callback for second level authentication. Calls final callback to UI-onLoginComplete and set cookies to identify login state
	var onUMSLoginComplete = function (data) {
		if (data.status != 'SUCCESS') {
			isAuthorized = false;
		}
		_this.onSecondAuthComplete(data);
	};

	//Convert api response to standart format to be consumed by UMS userloginajax call
	this.GooglePlus = function (authResult) {
		var data;
		if (authResult.code) {
			data = {
				status: 'SUCCESS',
				type: 'GOOGLEPLUS',
				credential: { code: authResult.code }
			};
		} else if (authResult.error) {
			data = {
				status: 'FAIL',
				type: 'GOOGLEPLUS',
				message: 'Access denied'
			};
		}
		this.onAuthorize(data);
	};

	this.Facebook = function (authResult) {
		var data;
		if (authResult.status == 'connected') {
			data = {
				status: 'SUCCESS',
				type: 'FACEBOOK',
				credential: { token: authResult.authResponse.accessToken }
			};
		} else {
			data = {
				status: 'FAIL',
				type: 'FACEBOOK',
				message: 'Access denied'
			};
		}
		this.onAuthorize(data);
	};

	this.Redbus = function (authResult) {
		var data = {
			status: 'SUCCESS',
			type: 'REDBUS',
			credential: { username: authResult.username, password: authResult.password, rememberMe: authResult.rememberMe }
		};
		this.onAuthorize(data);
	};


} ();

//View for link in header
var SignInLinkView = function () {
	var signInModal;

	var signInTemplate = null;
	var signInPromise;

	this.initialize = function () {
		bindEvents();
		this.update();

		// Enable FE-2 only for specific page
	};

	//Called whenever login state changes
	this.update = function () {
		if (RB.Cookie.get('ums') !== null) {
			$('#signedOut').hide();
			$('#signedIn').show();
			if(signInModal)
				signInModal.hide();
		}
		else {
			$('#signedOut').show();
			$('#signedIn').hide();
		}
	};

	var bindEvents = function () {
		$("#signInLink").click(onSignInClick);
		$("#signOutLink").click(onSignOutClick);
	};

	var onSignInClick = function () {
		// Enable FE-2 only for specific page
		if(window.location.pathname.substring(1) === 'mobile.aspx') {
			var signInView = new SignInView();
			signInView.initialize();

			if (!isGooglePlusScriptLoaded && !isIE7()) {
				initFacebookScript();
				initGooglePlusScript();
			}

			var iframeUrl = RB.URL.create('/login.aspx');
			signInModal = new RB.Modal(iframeUrl, { width: 410, height: 375, showURL: true });

			// Check if iFrame is loaded in redbus site only. Else reload parent
			if (top.location.href != self.location.href)
				top.location.reload();	

			signInModal.show();		
			$("#username").focus();
		}
		else {
			if(isGooglePlusScriptLoaded)
				signInModal.show();

			$("#username").focus();
		}
	};

	var onSignOutClick = function () {
		RB.Cookie.set('preventAutoLogin', 'true', 200 * 24 * 60);
		window.location.href = '/Logout.aspx';
	};
};

var SignInView = function () {
	var $el;
	var _this = this;
	var autoSignInFailCount = 0;
	var AUTOSIGNIN_FAILCOUNT_MAX = 2;

	this.initialize = function () {
		$el = $('#signIn');
		bindEvents();
		fillRememberMe();
	};

	var bindEvents = function () {
		if (isIE7()) {
			$('#signInView .socialContainer').hide();
			$('#signInView .or').css('visibility','hidden');
		} else {

			$('#facebookBtn').click(function () {
				//$el.find('#loginSpinner').show();
				Auth.LoginActionType = 'CLICK';
				Auth.LoginAccount = 'FACEBOOK';
				FB.login(onFacebookLogin, { scope: 'email' });
			});

			//attachGooglePlusBtn('googlePlusBtn');
			$('#googlePlusBtn').click(function () {
				Auth.LoginActionType = 'CLICK';
				Auth.LoginAccount = 'GOOGLEPLUS';
				//$el.find('#loginSpinner').show();
			});
		}

		Auth.onFirstAuthComplete = function (data) {
			if(data.status == 'SUCCESS'){
				$el.find('#loginSpinner').show();
			}
			else{
				//Code to logout of redbus if there
				autoSignInFailCount++;
				if (autoSignInFailCount >= AUTOSIGNIN_FAILCOUNT_MAX && RB.Cookie.get('ums') !== null && RB.Cookie.get('loggedInType') == 'AUTO') {
					$.get('logout.aspx', function () {
						RB.Master.signInLink.update();
					});
				}
			}
		};

		Auth.onSecondAuthComplete = onCompleteLogin;

		$el.find("#createAccountLink").click(showRegistration);
		$el.find('#password').keydown(onPasswordChange);
		$el.find('#forgotPasswordLink').click(showForgotPassword);
		$el.find('#signInBtn').click(signIn);
		$el.find('.backLink').click(backToSignIn);

		$el.find('#resetPasswordBtn').click(resetPassword);
		$el.find('#createAccountBtn').click(createAccount);
	};
	var onCompleteLogin = function (data) {
		$("#signInView .spinnerLoading").hide();
		
		if (data.status == "SUCCESS") {
			RB.Cookie.set('loggedInType', Auth.LoginActionType, 200 * 24 * 60);
			if(Auth.LoginActionType == "CLICK")
				location.reload();
			else 
				RB.Master.signInLink.update();
		}
		else {
			RB.Cookie.set('loggedInType', 'NONE', 200 * 24 * 60);
			$("#signInView .loginSpinner").hide();
			if (data.type == 'REDBUS')
				$('#loginMessage').text('The email id or password you entered is incorrect').show();
			else if (data.type == 'FACEBOOK')
				$('#loginMessage').text('Error occured while connecting to Facebook. Try some other login method').show();
			else if (data.type == 'GOOGLEPLUS')
				$('#loginMessage').text('Error occured while connecting to Google. Try some other login method').show();

		}

	};

	var signIn = function () {
		var vldtr = new RB.Validator("#signInView");
		var isValid = vldtr.validate();
		if (isValid) {
			Auth.LoginActionType = 'CLICK';
			Auth.LoginAccount = 'REDBUS';
			forceUMSLogin = true;
			var appendQS = "";
			var refUrl = location.href;

			data = {
				username: $el.find('input[name=username]').val(),
				password: $el.find('input[name=password]').val(),
				rememberMe: $el.find("#rememberMe").is(':checked')
			};

			$("#signInView .spinnerLoading").show();
			Auth.Redbus(data, onCompleteLogin);
		}
	};

	var showRegistration = function () {
		$el.find("#createAccountView").show();
		$el.find("#signInView").hide();
		$el.find("#forgotPasswordView").hide();
	};

	var onPasswordChange = function (event) {
		if (event.keyCode == '13') {
			signIn();
			return false;
		}
	};

	var showForgotPassword = function () {
		$el.find("#forgotPasswordView").show();
		$el.find("#signInView").hide();
		$el.find("#createAccountView").hide();
		$el.find("#EMAIL").val($el.find("#userId").val());
	};

	var backToSignIn = function () {
		$el.find("#forgotPasswordView").hide();
		$el.find("#signInView").show();
		$el.find("#createAccountView").hide();
	};

	var resetPassword = function () {
		var vldtr = new RB.Validator("#forgotPasswordView");
		var isValid = vldtr.validate();
		if (isValid) {
			var email = $('#reset_username').val();
			var ums = new UMS();
			$("#forgotPasswordView .spinnerLoading").show();
			ums.resetPassword(email, function (data) {
				$("#forgotPasswordView .spinnerLoading").hide();
				if (data.status == 200) {
					$("#forgotPasswordView .statusMessage").html('A confirmation email has been sent to your address <span>' + email + '</span>');
				} else {
					$("#forgotPasswordView .statusMessage").text('Reseting password failed');
				}
				$("#forgotPasswordView .statusMessage").show();
			});
		}
	};

	var createAccount = function () {
		var vldtr = new RB.Validator("#createAccountView");
		vldtr.addRule('minLength', function () { return ($('#new_password').val().length > 5); });
		vldtr.addRule('matchPassword', function () { return ($('#new_password').val() == $('#new_confirmPassword').val()); });
		var isValid = vldtr.validate();

		if (isValid) {
			var email = $('#new_username').val();
			var password = $('#new_password').val();
			var confirm_password = $('#new_confirmPassword').val();

			if (password == confirm_password) {
				var ums = new UMS();
				$("#createAccountView .spinnerLoading").show();
				ums.registerUser(email, password, function (data) {
					$("#createAccountView .spinnerLoading").hide(); 
					if (data.status == 200) {
						location.reload();
						return false;
						//$("#createAccountView .statusMessage").html('A mail has been sent to : <span>' + email + '</span>. Please follow the instructions in the mail to activate your account.');
					} else {
						$("#createAccountView .statusMessage").text(data.message);
						$("#createAccountView .statusMessage").show();
					}
					
				});
			}
			else {
				$("#createAccountView .statusMessage").text('Passwords not matching').show();
			}
		}
	};

	var fillRememberMe = function () {
		var username = RB.Cookie.get('ums_user_name');
		var randomstring = RB.Cookie.get('ums_user_random');
		var isRememberMe = RB.Cookie.get('ums_user_re');
		if (username !== null) {
			$el.find("#username").val(username);
		}
		if (randomstring !== null) {
			$el.find("#password").val(randomstring);
		}
		if (isRememberMe !== null && isRememberMe == "1") {
			$el.find("#rememberMe").attr("checked", true);
		}
	};
};


var CustomerCareView = function(){

	var _this = this;

	var $dropDownEl = $('#tollphOptions');

	this.initialize = function(){
		bindEvents();
		loadFromPreferences();
	};

	var bindEvents = function(){
		$('html').on('click', hideDropDown);
		$('#contact').on('click', showDropDown);
		$('ul#tollphOptions > li').on('click', onOptionClick);
	};

	var hideDropDown = function(){
		$dropDownEl.hide();
		$('#contact').removeClass("CustomerCareCityHolder");
	};

	var showDropDown = function(event){
		$dropDownEl.toggle();
		$('#contact').toggleClass("CustomerCareCityHolder"); 
		event.stopPropagation(); 
	};

	var onOptionClick = function(event){
		var cityId = $(this).attr('id');
		_this.selectCity(cityId);
		hideDropDown();	
		event.stopPropagation(); 
	};

	var loadFromPreferences = function(){
		var cityId = RB.Preferences.get('tollCityId');
		if(cityId !== null){
			_this.selectCity(cityId);
		}
	};


	this.selectCity = function(cityId){
		$cityEl = $dropDownEl.find('li#'+cityId);

		if($cityEl.length > 0){
			var cityNumber = $cityEl.attr('data-cityNumber');
			var cityName = $cityEl.attr('data-cityName');

			$('#tollcustcareNum').html(cityNumber);
			$('#tollcityName').html(cityName);

			RB.Preferences.set('tollCityId', cityId); 
		}else{
			$('#tollcustcareNum').html($('#tollcustcareNum').attr('data-default'));
			$('#tollcityName').html($('#tollcityName').attr('data-default'));
			RB.Preferences.set('tollCityId', -1); 
		}
		
	};

};
var RemoveActiveClass = function () {
    $('.bCrumbs a').each(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        }
    });
    $('.footerBG').hide();
};



RB.Master = new function(){

	this.signInLink = null;
	this.customerCareView = null;

	this.initialize = function(){

		//If browser is older than IE7 show message
		if(!isSupportedBrowser()){
			showNotSupportMessage();
		}


		//Initialize the customer care view
		this.customerCareView = new CustomerCareView();
		this.customerCareView.initialize();


		//Initialize the sign in view
		this.signInLink = new SignInLinkView();
		this.signInLink.initialize();
        $('footer .buses').show();
        $('footer .packages').hide();
        $('footer .hotels').hide();
        $('.adImages').removeClass('hotelAdImages');
        $("#tollCity").removeClass("Hide");
        $("#hotelCallcenter").addClass("Hide");
        $(".SignInBlock").show();

        //Postion footer at bottom
        postionFooterAtBottom();


	};	

	this.setHeader = function(text){
		$('.adserverBlock').html(text);
		$('.adserverBlock').attr('title', text);
	};

    this.initHotels = function () {
        //switch breadcrums
        RemoveActiveClass();
        $('.bCrumbs .hotels').addClass('active');
        $('.adImages').addClass('hotelAdImages');
        //hide/show footer links
        $('footer .buses').hide();
        $('footer .packages').hide();
        $('footer .hotels').show();
        $("#tollCity").addClass("Hide");
        $("#hotelCallcenter").removeClass("Hide");
        $(".SignInBlock").hide();
        postionFooterAtBottom();
        $('#browserHappy').show();
    };

    this.initPackages = function () {
        //switch breadcrums
        RemoveActiveClass();
        $('.bCrumbs .packages').addClass('active');

        // hide/show footer
        $('footer .buses').hide();
        $('footer .hotels').hide();
        $('footer .packages').show();
        postionFooterAtBottom();
    };
	//For bigger screens the footer should come at the end of the screen
	var postionFooterAtBottom = function(){
		var footerHeight = $("footer").outerHeight(true) + 'px';
		$(".mContent").css({ "padding-bottom": footerHeight });
	};  

	var isSupportedBrowser = function() {
		var is = true;
		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
		{ 
			var ieversion = Number(RegExp.$1);
			if (ieversion < 7)
			{
				is = false;
			}
		}
		return is;
	};


	var showNotSupportMessage = function(){
		alert('The browser you are using is not supported by redBus.in. Please update or download another browser');
	};

	this.initialize();

}();


function isIE7() {
	var is = false;
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
	{ 
		var ieversion = Number(RegExp.$1);
		if (ieversion == 7)
		{
			is = true;
		}
	}
	return is;
}

// Start of Unique visitor Identifier
function uniqueVisitorIdentifier(){
	if( RB.Cookie.get('ums') === null ) 
		return null; 
	else 
		return RB.Cookie.get('ums').split("=")[1];
}
// End of Unique visitor Identifier