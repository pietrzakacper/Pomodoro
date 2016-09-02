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
