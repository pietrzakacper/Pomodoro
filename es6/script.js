(function(){

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
		makeActive(stopButton);
	}

	function play(){
		if(timer==null){
			timer=new Timer(initialMinutes,renderTimer, stop);
		}
		if(timer.paused)timer.start.bind(timer)();
		makeActive(playButton);
	}

	function pause(){
		if(timer!=null){timer.pause.bind(timer)();
			makeActive(pauseButton);
		}
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

	function makeActive(obj){
		playButton.className = playButton.className.replace( ' button-active ', ' ' );
		pauseButton.className = pauseButton.className.replace( ' button-active ' , ' ' );
		if(obj!==stopButton)obj.className+=' button-active ';
	}

	//bind Events
	playButton.addEventListener('click', play);
	pauseButton.addEventListener('click', pause);
	stopButton.addEventListener('click', stop);
	increaseButton.addEventListener('click', increaseLengthOfSession);
	decreaseButton.addEventListener('click',	decreaseLengthOfSession);

})();
