cheats = (function() {
	let cheats = [];

	let addCheat = function(code) {
		cheats.push(code.toUpperCase());
	}

	let removeCheat = function(code) {

		cheats = cheats.filter((item) => item !== code.toUpperCase());

	}

	let checkForCheat = function(code) {
		return cheats.indexOf(code.toUpperCase()) !== -1;
	}

	return {
		add: addCheat,
		remove: removeCheat,
		check: checkForCheat,
	}
})()