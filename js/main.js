window.onload = function () {
	document.getElementById("solve").onclick = getSolution;
}

function readBoard () {
	var puzzle = [];
	for (var i = 0; i < 9; i++) {
		puzzle[i] = [];
		for (var j = 0; j < 9; j++) {
			puzzle[i][j] = document.getElementById((i + 1) + "-" + (j + 1)).value * 1;
		}
	}

	return new Sudoku(puzzle);
}

function setBoard (puzzle) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			document.getElementById((i + 1) + "-" + (j + 1)).value = puzzle.get(i, j);
		}
	}
}

function getSolution () {
	var puzzle = readBoard();
	if (puzzle.isSolvable()) {
		document.getElementById("error").innerHTML = "";
		var solution = puzzle.getSolution();
		if (solution) {
			setBoard(solution);
		} else {
			document.getElementById("error").innerHTML = "No valid solution found. ";
		}
	} else {
		document.getElementById("error").innerHTML = "Enter more numbers to get a solution!";
	}
}

function Sudoku (p) {
	var self = this;
	var puzzle = p;

	this.get = function (row, col) {
		return puzzle[row][col];
	}

	this.isSolvable = function () {
		var nums = 0;
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				if (!isEmpty(puzzle[i][j])) {
					nums++;
				}
			}
		}
		return nums > 20;
	}

	this.getSolution = function () {
		return solutionHelper();
	}

	function solutionHelper () {
		var row = 0;
		var col = 0;

		while (row < puzzle.length && !isEmpty(puzzle[row][col])) {
			col = 0;
      while (col < puzzle[row].length && !isEmpty(puzzle[row][col])) {
      	col++;
      }
      if (!isEmpty(puzzle[row][col])) {
				row++;
			}
    }
    
		if (row >= puzzle.length) {
			return self; 
		}

		for (var i = 1; i <= 9; i++) {
			if (isValid(i, row, col)) {
				puzzle[row][col] = i;
				var solution = solutionHelper();
				if (solution != false) {
					return solution;
				}
				puzzle[row][col] = 0;
			}
		}
		return false; 
	}

	function isValid (num, row, col) {
		// Check if the row is valid
		for (var i = 0; i < puzzle[row].length; i++) {
			if (num === puzzle[row][i]) {
				return false;
			}
		}

		// Check if the column is valid
		for (var i = 0; i < puzzle.length; i++) {
			if (num === puzzle[i][col]) {
				return false;
			}
		}

		// Check if the box is valid
		var rowStart = Math.floor(row / 3) * 3;
		var colStart = Math.floor(col / 3) * 3;
		for (var i = rowStart; i < (rowStart + 3); i++) {
			for (var j = colStart; j < (colStart + 3); j++) {
				if (num === puzzle[i][j]) {
					return false;
				}
			}
		}

		return true;
	}

	function isEmpty (num) {
		num *= 1;
		return num == 0 || num == null || num == NaN || num == false || num == undefined;
	}
}