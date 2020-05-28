/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])


/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  const grid = (x, y) => [ ...Array(x) ].map(val => Array(y).fill(null))
  // const board = new Array(HEIGHT).fill(null).map(() => new Array(WIDTH).fill(null));
  board = grid(WIDTH, HEIGHT)

  // const grid = [
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  // ];

  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board")

  // TODO: add comment for this code
  const top = document.createElement("tr"); //<-- create TableRow for the top
  top.setAttribute("id", "column-top"); //<-- set ID to column-top
  top.addEventListener("click", handleClick); //<-- add a click event for it

  // Since "WIDTH" is not iterable, we cannot use array methods,
  // and have to use the for loop rather than forEach or For Of.
  for (let x = 0; x < WIDTH; x++) { //<-- iterate through the board array
    const headCell = document.createElement("td"); //<-- create the table data cell
    headCell.setAttribute("id", x); //<-- set the id to the index of array, one for each column
    top.append(headCell); //<-- append it to the top of the table
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // Since "HEIGHT & WIDTH" are not iterable, we cannot use array methods, 
  // and have to use the for loop rather than forEach or For Of.
  for (let y = 0; y < HEIGHT; y++) { //<-- iterate through the board array to create columns
    const row = document.createElement("tr"); //<-- create row in the table
    for (let x = 0; x < WIDTH; x++) { //<-- iterate through the board array to create rows
      const cell = document.createElement("td"); //<-- create the table data cell
      cell.setAttribute("id", `${y}-${x}`); //<-- set id of cell to the index on the grid
      row.append(cell); //<-- append to the board
    }
    htmlBoard.append(row); //<-- append the entire row to the board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y > -1; y--) { //<-- Height - 1 = index of col
    if (!board[ y ][ x ]) {
      return y
    }
  }
  return null;
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div")
  piece.classList.add("piece")
  piece.classList.add(`_${currPlayer}`)
  // piece.style.top = -50 * (y + 2)
  const spot = document.getElementById(`${y}-${x}`)
  spot.append(piece)
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert("Game over!") //<-- for now, until we get the winner/loser logic
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
  console.log("event target at x: ", x)

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[ y ][ x ] === currPlayer

  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  board.every(row => row.every(cell => cell)) && endGame("Tie")

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1



}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([ y, x ]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[ y ][ x ] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
      const vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
      const diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
      const diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
