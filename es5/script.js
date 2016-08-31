'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
	var Timer = function () {
		function Timer(minutes, renderFunc, onStop) {
			_classCallCheck(this, Timer);

			this._minutes = this._initialMinutes = minutes;
			this._seconds = this._initialSeconds = 0;
			this.render = renderFunc;
			this.render(this._minutes, this._seconds);
			this.onStop = onStop;
			this.paused = true;
		}

		_createClass(Timer, [{
			key: 'start',
			value: function start() {
				this.intervalID = setInterval(this.update.bind(this), 1000);
				this.render(this._minutes, this._seconds);
				this.paused = false;
			}
		}, {
			key: 'update',
			value: function update() {
				if (--this._seconds === -1) {
					if (--this._minutes === -1) {
						this.stop();
					} else {
						this._seconds = 59;
					}
				}
				this.render(this._minutes, this._seconds);
			}
		}, {
			key: 'stop',
			value: function stop() {
				this._minutes = this._initialMinutes;
				this._seconds = this._initialSeconds;
				this.pause();
				this.onStop();
			}
		}, {
			key: 'pause',
			value: function pause() {
				clearInterval(this.intervalID);
				this.render(this._minutes, this._seconds);
				this.paused = true;
			}
		}]);

		return Timer;
	}();

	//cache DOM
	//timer


	var clock = document.getElementById('clock');
	var playButton = document.getElementById('play');
	var pauseButton = document.getElementById('pause');
	var stopButton = document.getElementById('stop');
	//options
	var sessionLength = document.getElementById('session-length');
	var increaseButton = document.getElementById('increase-button');
	var decreaseButton = document.getElementById('decrease-button');

	var timer = void 0,
	    initialMinutes = 22;
	renderOptions();
	renderTimer(initialMinutes, 0);

	function renderOptions() {
		sessionLength.innerHTML = initialMinutes;
	}

	function renderTimer(minutes, seconds) {
		clock.innerHTML = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
	}

	function stop() {
		pause();
		timer = null;
		renderTimer(initialMinutes, 0);
	}

	function play() {
		if (timer == null) {
			timer = new Timer(initialMinutes, renderTimer, stop);
		}
		if (timer.paused) timer.start.bind(timer)();
	}

	function pause() {
		if (timer != null) timer.pause.bind(timer)();
	}

	function increaseLengthOfSession() {
		if (++initialMinutes > 60) {
			initialMinutes = 60;
		}
		renderOptions();
		if (timer == null) {
			renderTimer(initialMinutes, 0);
		}
	}

	function decreaseLengthOfSession() {
		if (--initialMinutes < 1) {
			initialMinutes = 1;
		}
		renderOptions();
		if (timer == null) {
			renderTimer(initialMinutes, 0);
		}
	}

	//bind Events
	playButton.addEventListener('click', play);
	pauseButton.addEventListener('click', pause);
	stopButton.addEventListener('click', stop);
	increaseButton.addEventListener('click', increaseLengthOfSession);
	decreaseButton.addEventListener('click', decreaseLengthOfSession);
})();