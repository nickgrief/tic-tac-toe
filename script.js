// Game created using module pattern
// All game logic and object contains here
const game = (() => {
  // Gameboard created using module pattern
  const gameBoard = (() => {
    // Declare private grid so we can operate on it
    let _grid;

    // Create initialises grid values so we can
    // both create and reset grid with this function
    const create = (size) => {
      _grid = new Array(size).fill(0);
      _grid.forEach((_, i) => {
        _grid[i] = new Array(size).fill("");
      });
    };

    // Change allows us to modify any grid cell
    const change = (row, column, symbol) => {
      _grid[row][column] = symbol;
    };

    // Public getter for grid so we can display it
    const grid = () => {
      return _grid;
    };

    return {
      grid,
      create,
      change,
    };
  })();

  const makeTurn = (row, column) => {
    if (gameBoard.grid()[row][column] === "") {
      gameBoard.change(row, column, activePlayer.symbol);

      if (checkWin(row, column, activePlayer.symbol)) {
        console.log(activePlayer, "won");
      }
      if (activePlayer === player1) {
        activePlayer = player2;
      } else {
        activePlayer = player1;
      }
    }
    resetBoard();
  }

  // Input is last plays row, column and symbol
  // Algorithm shoud work for arbitratily sized boards
  // Checks for 3 symbols in a row
  const checkWin = (row, column, symbol) => {
    // Make sure row and column are number and not strings
    // (gotta love javasript)
    row = Number(row);
    column = Number(column);
    // Cache grid sizes
    let grigWidth = gameBoard.grid()[0].length;
    let gridHeight = gameBoard.grid().length;

    let symbolCounter;
    // Check vertical
    symbolCounter = 0;
    for (i in gridHeight) {
      if (gameBoard.grid()[i][column] === symbol) {
        symbolCounter++;
        if (symbolCounter === 3) return true;
      } else {
        symbolCounter = 0;
      }
    }
    // Check horizontal
    symbolCounter = 0;
    for (i in gameBoard.grid()[row]) {
      if (gameBoard.grid()[row][i] === symbol) {
        symbolCounter++;
        if (symbolCounter === 3) return true;
      } else {
        symbolCounter = 0;
      }
    }

    // Check diagonals

    // Check negative diagonals
    // (from top-left to bottom-right)
    symbolCounter = 0;

    if (column > row) {
      let firstColumn = column - row;
      for (let i = firstColumn, j = 0; i < grigWidth; i++, j++) {
        if (gameBoard.grid()[j][i] === symbol) {
          symbolCounter++;
          if (symbolCounter === 3) return true;
        } else {
          symbolCounter = 0;
        }
      }
    } else {
      let firstRow = row - column;
      for (let i = firstRow, j = 0; i < gridHeight; i++, j++) {
        if (gameBoard.grid()[i][j] === symbol) {
          symbolCounter++;
          if (symbolCounter === 3) return true;
        } else {
          symbolCounter = 0;
        }
      }
    }

    // Check positive diagonals
    // From bottom-left to top-right
    symbolCounter = 0;

    if (row + column < gridHeight) {
      let firstColumn = column + row;
      for (let i = firstColumn, j = 0; i >= 0; i--, j++) {
        if (gameBoard.grid()[j][i] === symbol) {
          symbolCounter++;
          if (symbolCounter === 3) return true;
        } else {
          symbolCounter = 0;
        }
      }
    } else {
      let firstRow = row - (grigWidth - 1 - column);
      for (let i = firstRow, j = gridHeight - 1; i < gridHeight; i++, j--) {
        if (gameBoard.grid()[i][j] === symbol) {
          symbolCounter++;
          if (symbolCounter === 3) return true;
        } else {
          symbolCounter = 0;
        }
      }
    }

    return false;
  }

  // Clears and redraws board
  const resetBoard = () => {
    const gameHolder = document.querySelector(".game");
    while (gameHolder.hasChildNodes()) {
      gameHolder.removeChild(gameHolder.lastChild);
    }
    for (row in gameBoard.grid()) {
      const rowHolder = document.createElement("div");
      rowHolder.classList.toggle("row");
      for (column in gameBoard.grid()[row]) {
        const cellHolder = document.createElement("div");
        cellHolder.classList.toggle("cell");
        cellHolder.dataset.row = row;
        cellHolder.dataset.column = column;
        const defaultColour = cellHolder.style.background;
        cellHolder.addEventListener("click", (event) => {
          makeTurn(event.target.dataset.row, event.target.dataset.column);
        })
        cellHolder.textContent = gameBoard.grid()[row][column];
        rowHolder.appendChild(cellHolder);
      }
      gameHolder.appendChild(rowHolder);
    }
  };

  // Player factory
  const playerCreator = (symbol) => {
    return { symbol };
  };

  // Players created using factory pattern
  player1 = playerCreator("X");
  player2 = playerCreator("0");

  let activePlayer = player1;

  // Initialise board
  gameBoard.create(6);

  resetBoard();

  return {
    createGrid: gameBoard.create,
    changeCell: gameBoard.change,
  }
})();
