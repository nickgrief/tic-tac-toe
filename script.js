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
        _grid[i] = new Array(size).fill("0");
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

  // Initialise board
  gameBoard.create(3);

  // Clears and redraws board
  const displayBoard = () => {
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
        const defaultColour = cellHolder.style.background;
        cellHolder.addEventListener("click", () => {
          cellHolder.style.background = 'pink';
          setTimeout(() => {
            cellHolder.style.background = defaultColour;
          }, 150);
        })
        cellHolder.textContent = gameBoard.grid()[row][column];
        rowHolder.appendChild(cellHolder);
      }
      gameHolder.appendChild(rowHolder);
    }
  };

  displayBoard();
  gameBoard.change(1, 1, "X");
  displayBoard();

  // Player factory
  const playerCreator = (symbol) => {
    return {};
  };

  // Players created using factory pattern
  player1 = playerCreator();
  player2 = playerCreator();

  return {
    createGrid: gameBoard.create,
    changeCell: gameBoard.change,
  }
})();
