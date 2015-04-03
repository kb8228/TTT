angular
	.module("tttApp")
	.controller("MainController", MainController);

	MainController.$inject = ['$firebaseArray', '$firebaseObject'];

	function MainController ($firebaseArray, $firebaseObject) {
		var self = this;
		//self.picker;
		self.pickSymbol = pickSymbol;
		self.makeMove = makeMove;
		self.checkWin = checkWin;
		self.squares = getSquares();
		self.stats = getStatsObj();
		//self.gameEnd = false;
		self.resetBoard = resetBoard;
		////////////////////////////////////////
		//OBJECT stats:
		function getStatsObj(){
			var ref = new Firebase('https://kstictactoeapp.firebaseio.com/stats');
			var stats = $firebaseObject(ref);

			// stats.picker = " ";
			// stats.gameEnd = false;
			// stats.playerOneId;
			// stats.playerTwoId;

   //    stats.$save();

			// PROMISE in action:
			stats.$loaded(function(){
				stats.picker = " ";
				stats.gameEnd = false;
				stats.$save();
				console.log(stats.picker);
			});

			return stats;
		}
		////////////////////////////////////////
		//ARRAY of squares
		function getSquares(){

			//constructor function to reference DB:
			var ref = new Firebase('https://kstictactoeapp.firebaseio.com/tictactoe');

			// use AngularFire library to download data to local array:
			var tictactoe = $firebaseArray(ref);

			//add initial array or reset DB:
			tictactoe.$loaded(function(){
				if(tictactoe.length === 0){
					for(var i = 0; i < 9; i++){
				  	tictactoe.$add({symbol: " ", status: "free"});
					}
				}
				else{
					for(var i = 0; i < 9; i++){
				  	tictactoe[i].symbol = " ";
						tictactoe[i].status = "free";
						tictactoe.$save(i);
					}
				}
			});
			console.dir(tictactoe);

			// return a synced Firebase array
			return tictactoe;
		} // getSquares END

		function resetBoard () {
			for(var i = 0; i < 9; i++){
				self.squares[i].symbol = " ";
				self.squares[i].status = "free";
				self.squares.$save(i);
			}
			self.stats.gameEnd = false;
			self.stats.picker = " ";
			self.stats.$save();
		}
		// X or O picker:
		function pickSymbol(s) {
			if(self.stats.picker === " "){
				self.stats.picker = s;
				console.log(self.stats.picker);
				self.stats.$save();
				return self.stats.picker;
			}
		}

		// sets symbol value and status "occupied" in db:
		function makeMove(sq) {
			//checks if game has not ended:
			if(self.stats.gameEnd === false){
				// checks that symbol was picked
				if(self.stats.picker !== " "){
					//checks that square is free
					if(sq.status === "free"){
						if(self.stats.picker === "X"){
							sq.symbol = "X";
							self.stats.picker = "O";
							self.stats.$save();
						}
						else if(self.stats.picker === "O"){
							sq.symbol = "O";
							self.stats.picker = "X";
							self.stats.$save();
						}
					}
					else{
						alert("Illegal move - square already taken!");
					}// free square checker END
					sq.status = "occupied";
					self.squares.$save(sq);
					//runs winner check for the player who made latest move:
					checkWin(sq.symbol);
				}
				else{
					alert("Pick your side first!");
				}//picker checker END
			}//gameEnd checker END
		}

		// REVIEW FOR X or O - done
		function checkWin(symb){
			console.dir(self.squares);
			var allSquaresTaken = self.squares.every(function(x){
				return x.symbol !== " ";
			});
			// check columns
			if((symb === self.squares[0].symbol && symb === self.squares[3].symbol && symb === self.squares[6].symbol) || (symb === self.squares[1].symbol && symb === self.squares[4].symbol && symb === self.squares[7].symbol) || (symb === self.squares[2].symbol && symb === self.squares[5].symbol && symb === self.squares[8].symbol)){
				alert(symb + " wins!");
				self.stats.gameEnd = true;
				self.stats.$save();
			}
			// check rows
			else if ((symb === self.squares[0].symbol && symb === self.squares[1].symbol && symb === self.squares[2].symbol) || (symb === self.squares[3].symbol && symb === self.squares[4].symbol && symb === self.squares[5].symbol) || (symb === self.squares[6].symbol && symb === self.squares[7].symbol && symb === self.squares[8].symbol)){
				alert(symb + " wins!");
				self.stats.gameEnd = true;
				self.stats.$save();
			}
			//check diagonals
			else if ((symb === self.squares[0].symbol && symb === self.squares[4].symbol && symb === self.squares[8].symbol) || (symb === self.squares[2].symbol && symb === self.squares[4].symbol && symb === self.squares[6].symbol)){
				alert(symb + " wins!");
				self.stats.gameEnd = true;
				self.stats.$save();
			}
			//check for tie
			else if (allSquaresTaken){
				alert("It's a tie!");
				self.stats.gameEnd = true;
				self.stats.$save();
			}
		}//function checkWin END

	} // MainController END