"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
	function Timer(minutes, renderFunc, onStop) {
		_classCallCheck(this, Timer);

		this._minutes = this._initialMinutes = minutes;
		this._seconds = this._initialSeconds = 0;
		this.render = renderFunc;
		this.render(this._minutes, this._seconds, this._initialMinutes);
		this.onStop = onStop;
		this.paused = true;
	}

	_createClass(Timer, [{
		key: "start",
		value: function start() {
			this.intervalID = setInterval(this.update.bind(this), 1000);
			this.render(this._minutes, this._seconds, this._initialMinutes);
			this.paused = false;
		}
	}, {
		key: "update",
		value: function update() {
			if (--this._seconds === -1) {
				if (--this._minutes === -1) {
					this.stop();
				} else {
					this._seconds = 59;
				}
			}
			this.render(this._minutes, this._seconds, this._initialMinutes);
		}
	}, {
		key: "stop",
		value: function stop() {
			this._minutes = this._initialMinutes;
			this._seconds = this._initialSeconds;
			this.pause();
			this.onStop();
		}
	}, {
		key: "pause",
		value: function pause() {
			clearInterval(this.intervalID);
			this.render(this._minutes, this._seconds, this._initialMinutes);
			this.paused = true;
		}
	}]);

	return Timer;
}();