// connectAI.js

//Check Conditions Component
import checkConditions from "./checkConditions";
import evaluateBoard from "./evaluateScore";
import printBoard from "./printBoard";

// This function will be called by the main game logic to find the best move
function findBestMove(boardState, depthLimit, isMaximizing) {
  // Implement the logic to find the best move
  let bestMove = -1;
  let bestScore = isMaximizing ? -Infinity : Infinity;


  //Create deep copy of our board;

  for (let column = 0; column < 5; column++) {
    for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
      if (boardState[column][rowIndex] === null) {
        //Simulate the move
        boardState[column][rowIndex] = isMaximizing ? "red" : "blue";

        //Evaluate the move
        let score = makeMinMaxMove(
          JSON.parse(JSON.stringify(boardState)),
          depthLimit - 1,
          (!isMaximizing)
        );

        

        // Update the best score and best move
        if (isMaximizing && score > bestScore) {
          bestScore = score;
          bestMove = column;
          //printBoard(boardState,bestScore)

        } else if (!isMaximizing && score < bestScore) {
          bestScore = score;
          bestMove = column;
          //printBoard(boardState,bestScore)

        }
        
        // Undo the move for the next iteration
        boardState[column][rowIndex] = null;

        // Since we can only add to the first free slot in a column, break after trying this slot
        break;
      }
    }
  }

  // TODO: Implement MinMax algorithm here

  return bestMove;
}

function makeMinMaxMove(boardState, depthLimit, isMaximizing) {
  let score = 0;

  //console.log(isMaximizing)

  //Check if we have reached a terminal state
  let terminalState = checkConditions(boardState);
  if (terminalState !== null) {
    //console.log("Terminal Stage Reached")
    switch (terminalState) {
      case "red":
        score = 1000;
        break;
      case "blue":
        score = -1000;
        break;
      case "draw":
        score = 0;
        break;
      default:
        score = 0;
        break;
    }
    return score;
  }

  //Evaluate board
  score = evaluateBoard(boardState);
  //console.log("Evaluating score of the move is: "+ score)

  //Check if we have reached the maximum depth
  if (depthLimit <= 0) {
    return score;
  }

  //Recursion starts here
  if (isMaximizing) {
    let bestScore = -Infinity;

    //Run through to see if any moves can be made from here
    for (let column = 0; column < 5; column++) {
      for (let rowIndex = 0; rowIndex < 5; rowIndex++) {

        //Create a copy of our board
        let newBoardState = JSON.parse(JSON.stringify(boardState));

        if (newBoardState[column][rowIndex] === null) {
          //Apply move as red
          newBoardState[column][rowIndex] = "red";
          let score = makeMinMaxMove(newBoardState, depthLimit - 1, false);

          bestScore = Math.max(score, bestScore);

          //printBoard(newBoardState, score)

          //Reset the value for next iteration
          newBoardState[column][rowIndex] = null;
          break;
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;

    for (let column = 0; column < 5; column++) {
      for (let rowIndex = 0; rowIndex < 5; rowIndex++) {

        //Create a copy of our board
        let newBoardState = JSON.parse(JSON.stringify(boardState));

        if (newBoardState[column][rowIndex] === null) {
          //Apply move as blue
          newBoardState[column][rowIndex] = "blue";
          let score = makeMinMaxMove(newBoardState, depthLimit - 1, true);

          bestScore = Math.min(score, bestScore);
          //printBoard(newBoardState, score)

          //Reset the value for next iteration
          newBoardState[column][rowIndex] = null;
          
          break;
        }
      }
    }
    return bestScore;
  }
}

// Export the findBestMove function so it can be imported in App.js
export default findBestMove;
