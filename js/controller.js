angular
	.module("tttApp")
	.controller("MainController", MainController);

	function MainController () {
		var self = this;

		//value will later be x or o
		self.squares = [
			{sq: false,
			 value: null},
			{sq: false,
			 value: null},
			{sq: false,
			 value: null},
			{sq: false,
			 value: null},
			{sq: false,
			 value: null},
			{sq: false,
			 value: null},
			{sq: false,
			 value: null},
			{sq: false,
			 value: null},
			{sq: false,
			 value: null}
		];







	} // MainController END