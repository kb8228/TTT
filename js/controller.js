angular
	.module("tttApp")
	.controller("MainController", MainController);

	function MainController () {
		var self = this;
		self.picker;
		self.pickSymbol = pickSymbol;
		self.makeMove = makeMove;
		self.checkWin = checkWin;

		//value will later be x or o
		self.squares = [
			{symbol: null, status: "free"},
			{symbol: null, status: "free"},
			{symbol: null, status: "free"},
			{symbol: null, status: "free"},
			{symbol: null, status: "free"},
			{symbol: null, status: "free"},
			{symbol: null, status: "free"},
			{symbol: null, status: "free"},
			{symbol: null, status: "free"}
		];

		function pickSymbol(s) {
			self.picker = s;
			console.log(self.picker);
			return self.picker;
		}

		// sets symbol value and status "occupied" in db:
		function makeMove(sq) {
			// checks that symbol was picked
			if(self.picker){
			//checks that square is free
			if(sq.status === "free"){
				if(self.picker === "X"){
					sq.symbol = "x";
					pickSymbol("O");
				}
				else if(self.picker === "O"){
					sq.symbol = "o";
					pickSymbol("X");
				}
			}
			else{
				alert("Illegal move - square already taken!");
			}
			sq.status = "occupied";
			//runs winner check for the player who made latest move:
			checkWin(sq.symbol);
			}
			else{
				alert("Pick your side first!");
			}
		}

		// REVIEW FOR X or O - done
		function checkWin(symb){
			console.dir(self.squares);
			var allSquaresTaken = self.squares.every(function(x){
				return x.symbol !== null;
			});
			// check columns
			if((symb === self.squares[0].symbol && symb === self.squares[3].symbol && symb === self.squares[6].symbol) || (symb === self.squares[1].symbol && symb === self.squares[4].symbol && symb === self.squares[7].symbol) || (symb === self.squares[2].symbol && symb === self.squares[5].symbol && symb === self.squares[8].symbol)){
				alert(symb.toUpperCase() + " wins!");
			}
			// check rows
			else if ((symb === self.squares[0].symbol && symb === self.squares[1].symbol && symb === self.squares[2].symbol) || (symb === self.squares[3].symbol && symb === self.squares[4].symbol && symb === self.squares[5].symbol) || (symb === self.squares[6].symbol && symb === self.squares[7].symbol && symb === self.squares[8].symbol)){
				alert(symb.toUpperCase() + " wins!");
			}
			//check diagonals
			else if ((symb === self.squares[0].symbol && symb === self.squares[4].symbol && symb === self.squares[8].symbol) || (symb === self.squares[2].symbol && symb === self.squares[4].symbol && symb === self.squares[6].symbol)){
				alert(symb.toUpperCase() + " wins!");
			}
			//check for tie
			else if ((self.squares.length === 9) && allSquaresTaken){
				alert("It's a tie!");
			}
		}//function checkWin END

	} // MainController END