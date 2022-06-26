// Game created using module pattern
// All game logic and object contains here
const game = (() => {
  // Gameboard created using module pattern
  const gameBoard = (() => {
    // Create and fill the grid array
    let grid = new Array(3).fill(0);
    grid.forEach((_, i) => {
      grid[i] = new Array(3).fill("0");
    });
    console.log(grid);
    const changeCell = (row, column, symbol) => {
      grid[row][column] = symbol;
      console.log(grid);
    };
    return {
      changeCell,
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
    changeCell: gameBoard.changeCell,
  }
})();
