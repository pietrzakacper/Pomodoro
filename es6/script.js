(function(){

	class Timer{
		constructor(minutes,renderFunc,onStop){
			this._minutes = this._initialMinutes = minutes;
			this._seconds = this._initialSeconds = 0;
			this.render = renderFunc;
			this.render(this._minutes,this._seconds,this._initialMinutes);
			this.onStop = onStop;
			this.paused = true;
		}
		start(){
			this.intervalID = setInterval(this.update.bind(this),1000);
			this.render(this._minutes,this._seconds,this._initialMinutes);
			this.paused = false;
		}

		update(){
			if(--this._seconds === -1){
				if(--this._minutes === -1){
					this.stop();
				} else{
					this._seconds=59;
				}
			}
			this.render(this._minutes,this._seconds,this._initialMinutes);
		}

		stop(){
			this._minutes=this._initialMinutes;
			this._seconds = this._initialSeconds;
			this.pause();
			this.onStop();
		}

		pause(){
			clearInterval(this.intervalID);
			this.render(this._minutes,this._seconds,this._initialMinutes);
			this.paused = true;
		}
	}

	//cache DOM
		//timer
	const clock = document.getElementById('clock');
	const playButton = document.getElementById('play');
	const pauseButton = document.getElementById('pause');
	const stopButton = document.getElementById('stop');
		//options
	const sessionLength = document.getElementById('session-length');
	const increaseButton = document.getElementById('increase-button');
	const decreaseButton = document.getElementById('decrease-button');

	// declare variables
	let timer,initialMinutes=25;

	//define functions
	function renderOptions(){
		sessionLength.innerHTML = initialMinutes;
	}

	function renderTimer(minutes,seconds,initialMinutes){
		clock.innerHTML = `${(minutes<10)?'0'+minutes:minutes}:${(seconds<10)?'0'+seconds:seconds}`;
		progressBar.setValue(initialMinutes*60,minutes*60 + seconds);
	}

	function stop(){
		pause();
		timer = null;
		renderTimer(initialMinutes,0,initialMinutes);
	}

	function play(){
		if(timer==null){
			timer=new Timer(initialMinutes,renderTimer, stop);
		}
		if(timer.paused)timer.start.bind(timer)();
	}

	function pause(){
		if(timer!=null)timer.pause.bind(timer)();
	}

	function increaseLengthOfSession(){
		if(++initialMinutes>60){
			initialMinutes=60;
		}
		renderOptions();
		if(timer==null){
			renderTimer(initialMinutes,0);
		}
	}

	function decreaseLengthOfSession(){
		if(--initialMinutes<1){
			initialMinutes=1;
		}
		renderOptions();
		if(timer==null){
			renderTimer(initialMinutes,0);
		}
	}


	//bind Events
	playButton.addEventListener('click', play);
	pauseButton.addEventListener('click', pause);
	stopButton.addEventListener('click', stop);
	increaseButton.addEventListener('click', increaseLengthOfSession);
	decreaseButton.addEventListener('click',	decreaseLengthOfSession);

})();
