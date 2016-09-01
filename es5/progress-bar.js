'use strict';

var progressBar = function () {

	//cache DOM
	var barValue = document.getElementById('bar-value');

	function setValue(initialTime, actualTime) {
		var percentageWidth = (initialTime - actualTime) / initialTime * 100;

		barValue.style.width = percentageWidth + '%';
	}

	return {
		setValue: setValue
	};
}();