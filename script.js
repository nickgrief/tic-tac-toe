// Game created using module pattern
// All game logic and object contains here
const game = (() => {
  // Gameboard created using module pattern
  const gameBoard = ((size) => {
    // Declare grid so we can operate on it
    let grid;

    // Create initialises grid values so we can
    // both create and reset grid with this function
    const create = () => {
      grid = new Array(size).fill(0);
      grid.forEach((_, i) => {
        grid[i] = new Array(size).fill("0");
      });

      console.log(grid);
    };

    // Change allows us to modify any grid cell
    const change = (row, column, symbol) => {
      grid[row][column] = symbol;
      console.log(grid);
    };

    return {
      create,
      change,
    };
  })(4);
  console.log(gameBoard);

  gameBoard.create();

  // Player factory
  const playerCreator = () => {
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
