const progressBar = (function(){

	//cache DOM
	const barValue = document.getElementById('bar-value');

	function setValue(initialTime, actualTime){
		let percentageWidth=((initialTime-actualTime)/initialTime)*100;

		barValue.style.width = percentageWidth+'%';
	}

	return {
		setValue: setValue
	};
})();
