function checkConditions(boardState) {
    // Helper function to check the line for a win
    const checkLine = (a, b, c, d) => {
      // Check if the first cell is non-null and all cells are the same
      return a !== null && a === b && a === c && a === d;
    }
  
    // Check rows for win
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 3; col++) {
        if (checkLine(boardState[col][row], boardState[col + 1][row], boardState[col + 2][row], boardState[col + 3][row])) {
          return boardState[col][row] === 0 ? 'red' : 'blue';
        }
      }
    }
  
    // Check columns for win
    for (let col = 0; col < 6; col++) {
      for (let row = 0; row < 3; row++) {
        if (checkLine(boardState[col][row], boardState[col][row + 1], boardState[col][row + 2], boardState[col][row + 3])) {
          return boardState[col][row] === 0 ? 'red' : 'blue';
        }
      }
    }
  
    // Check diagonal (top-left to bottom-right)
    for (let col = 0; col < 3; col++) {
      for (let row = 0; row < 3; row++) {
        if (checkLine(boardState[col][row], boardState[col + 1][row + 1], boardState[col + 2][row + 2], boardState[col + 3][row + 3])) {
          return boardState[col][row] === 0 ? 'red' : 'blue';
        }
      }
    }
  
    // Check diagonal (bottom-left to top-right)
    for (let col = 0; col < 3; col++) {
      for (let row = 3; row < 6; row++) {
        if (checkLine(boardState[col][row], boardState[col + 1][row - 1], boardState[col + 2][row - 2], boardState[col + 3][row - 3])) {
          return boardState[col][row] === 0 ? 'red' : 'blue';
        }
      }
    }
  
    // Check for draw
    if (boardState.every(column => column.every(cell => cell !== null))) {
      return 'draw';
    }
  
    // No winner or draw
    return null;
  }

  export default checkConditions;