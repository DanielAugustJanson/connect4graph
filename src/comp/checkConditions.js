function checkConditions(boardState) {
    // Helper function to check the line for a win
    const checkLine = (a, b, c, d) => {
      // Check if the first cell is non-null and all cells are the same
      return a !== null && a === b && a === c && a === d;
    }
  
    // Check rows for win
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 2; col++) {
        if (checkLine(boardState[col][row], boardState[col + 1][row], boardState[col + 2][row], boardState[col + 3][row])) {
          return boardState[col][row];
        }
      }
    }
  
    // Check columns for win
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 2; row++) {
        if (checkLine(boardState[col][row], boardState[col][row + 1], boardState[col][row + 2], boardState[col][row + 3])) {
          return boardState[col][row];
        }
      }
    }
  
    // Check diagonal (top-left to bottom-right)
    for (let col = 0; col < 2; col++) {
      for (let row = 0; row < 2; row++) {
        if (checkLine(boardState[col][row], boardState[col + 1][row + 1], boardState[col + 2][row + 2], boardState[col + 3][row + 3])) {
          return boardState[col][row];
        }
      }
    }
  
    // Check diagonal (bottom-left to top-right)
    for (let col = 0; col < 2; col++) {
      for (let row = 3; row < 5; row++) {
        if (checkLine(boardState[col][row], boardState[col + 1][row - 1], boardState[col + 2][row - 2], boardState[col + 3][row - 3])) {
          return boardState[col][row];
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