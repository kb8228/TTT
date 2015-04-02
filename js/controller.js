angular
	.module("tttApp")
	.controller("MainController", MainController);

	function MainController () {
		var self = this;
		self.picker;
		self.pickSymbol = pickSymbol;
		self.makeMove = makeMove;
		self.moveLog = [null, null, null, null, null, null, null, null, null];
		self.checkWin = checkWin;

		//value will later be x or o
		self.squares = [
			{symbol: null},
			{symbol: null},
			{symbol: null},
			{symbol: null},
			{symbol: null},
			{symbol: null},
			{symbol: null},
			{symbol: null},
			{symbol: null}
		];

		function pickSymbol(s) {
			self.picker = s;
			console.log(self.picker);
			return self.picker;
		}

		function makeMove(sq) {
			if(self.picker === "X"){
				sq.symbol = "x";
			}
			else if(self.picker === "O"){
				sq.symbol = "o";
			}
			//var sIndex = self.squares.indexOf(sq); <=disregard for now

			//trying to log moves in correct indices:
			self.moveLog.splice(self.squares.indexOf(sq), 1, sq.symbol);
			checkWin(sq.symbol);
		}

		// REVIEW FOR X or O - done
		function checkWin(symb){
			console.log(self.moveLog);
			var allSquaresTaken = self.moveLog.every(function(x){
				return x !== null && x !== undefined;
			});
			// check columns
			if((symb === self.moveLog[0] && symb === self.moveLog[3] && symb === self.moveLog[6]) || (symb === self.moveLog[1] && symb === self.moveLog[4] && symb === self.moveLog[7]) || (symb === self.moveLog[2] && symb === self.moveLog[5] && symb === self.moveLog[8])){
				alert(symb.toUpperCase() + " wins!");
			}
			// check rows
			else if ((symb === self.moveLog[0] && symb === self.moveLog[1] && symb === self.moveLog[2]) || (symb === self.moveLog[3] && symb === self.moveLog[4] && symb === self.moveLog[5]) || (symb === self.moveLog[6] && symb === self.moveLog[7] && symb === self.moveLog[8])){
				alert(symb.toUpperCase() + " wins!");
			}
			//check diagonals
			else if ((symb === self.moveLog[0] && symb === self.moveLog[4] && symb === self.moveLog[8]) || (symb === self.moveLog[2] && symb === self.moveLog[4] && symb === self.moveLog[6])){
				alert(symb.toUpperCase() + " wins!");
			}
			//check for tie
			else if ((self.moveLog.length === 9) && allSquaresTaken){
				alert("It's a tie!");
			}
		}//function checkWin END

	} // MainController END