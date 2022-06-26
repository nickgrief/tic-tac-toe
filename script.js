// Game created using module pattern
// All game logic and object contains here
const game = (() => {
  // Gameboard created using module pattern
  const gameBoard = (() => {
    // Declare grid so we can operate on it
    let grid;

    const create = () => {
      grid = new Array(3).fill(0);
      grid.forEach((_, i) => {
        grid[i] = new Array(3).fill("0");
      });

      console.log(grid);
      return grid;
    };

    const change = (row, column, symbol) => {
      grid[row][column] = symbol;
      console.log(grid);
    };

    // Create and fill the grid array
    create();

    return {
      create,
      change,
    };
  })();

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
