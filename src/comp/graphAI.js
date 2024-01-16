import checkConditions from "./checkConditions";

function findBestMove(boardState, depth, maximizingPlayer) {
    
    let bestScore = maximizingPlayer ? -Infinity : Infinity;
    let bestColumn = -1;

    for (let col = 0; col < boardState.length; col++) {
        if (isColumnPlayable(boardState, col)) {
            let tempBoardState = makeMove(boardState, col, maximizingPlayer);
            let score = makeNextMove(tempBoardState, depth - 1, !maximizingPlayer);

            if (maximizingPlayer ? score > bestScore : score < bestScore) {
                bestScore = score;
                bestColumn = col;
            }
        }
    }

    console.log(bestColumn)
    return bestColumn;
}

function makeMove(boardState, column, player) {
    let newState = [...boardState];
    for (let i = newState[column].length - 1; i >= 0; i--) {
        if (newState[column][i] === null) {
            newState[column][i] = player;
            break;
        }
    }
    return newState;
}

function makeNextMove(boardState, depth, isMaximizingPlayer) {
    console.log("makeNextMove triggered")
    let result = checkConditions(boardState);
    if (result !== null) {
        return scoreBasedOnResult(result); // Scores for win/lose/draw
    }

    if (depth === 0) {
        return evaluateBoard(boardState); // Evaluate based on active connections
    }

    if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        for (let col = 0; col < boardState.length; col++) {
            if (isColumnPlayable(boardState, col)) {
                 // Assuming AI is 'red'
                let tempBoardState = makeMove(boardState, col, isMaximizingPlayer ? 'red' : 'blue');

                let score = makeNextMove(tempBoardState, depth - 1, false);
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let col = 0; col < boardState.length; col++) {
            if (isColumnPlayable(boardState, col)) {
                 // Assuming human is 'blue'
                let tempBoardState = makeMove(boardState, col, isMaximizingPlayer ? 'red' : 'blue');

                let score = makeNextMove(tempBoardState, depth - 1, true);
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

//Evaluate score of the given board state.
function evaluateBoard(boardState) {
    let redScore = 0;
    let blueScore = 0;

    // Calculate scores for red player (AI)
    redScore += scoreConnections(boardState, 'red');
    redScore += scorePotentialWins(boardState, 'red');
    redScore += scoreCenterControl(boardState, 'red');
    redScore += scoreBottomRow(boardState, 'red');

    // Calculate scores for blue player (Human)
    blueScore += scoreConnections(boardState, 'blue');
    blueScore += scorePotentialWins(boardState, 'blue');
    blueScore += scoreCenterControl(boardState, 'blue');
    blueScore += scoreBottomRow(boardState, 'blue');

    
    console.log("score is: " + (redScore - blueScore))

    return redScore - blueScore;
}

    



//Board evaluations

function scoreConnections(boardState, player) {
    let score = 0;

    // Check horizontal connections
    for (let row = 0; row < boardState[0].length; row++) {
        score += checkLine(boardState, player, row, 0, 0, 1); // Horizontal
    }

    // Check vertical connections
    for (let col = 0; col < boardState.length; col++) {
        score += checkLine(boardState, player, 0, col, 1, 0); // Vertical
    }

    // Check diagonal connections (two directions)
    for (let col = 0; col < boardState.length; col++) {
        score += checkLine(boardState, player, 0, col, 1, 1); // Diagonal down-right
        score += checkLine(boardState, player, 0, col, 1, -1); // Diagonal up-right
    }

    return score;
}

function checkLine(boardState, player, startRow, startCol, stepRow, stepCol) {
    let score = 0;
    let count = 0;

    for (let row = startRow, col = startCol; 
         row < boardState[0].length && col < boardState.length && row >= 0 && col >= 0; 
         row += stepRow, col += stepCol) {
        if (boardState[col][row] === player) {
            count++;
            if (count === 2) score += 2;
            else if (count === 3) score += 3;
        } else {
            count = 0;
        }
    }

    return score;
}




function scorePotentialWins(boardState, player) {
    let score = 0;
    // Check for potential win situations (2 in a row with 2 free slots, 3 in a row with 1 free slot)
    // Add points for these scenarios
    return score;
}

function scoreCenterControl(boardState, player) {
    let score = 0;
    const centerColumns = [2, 3]; // Third and fourth columns

    for (let col of centerColumns) {
        for (let row = 0; row < boardState[col].length; row++) {
            if (boardState[col][row] === player) {
                // Add 0.25 points for each disc in the center columns
                score += 0.25;
            }
        }
    }

    return score;
}


function scoreBottomRow(boardState,player) {
    let score = 0;
    const bottomRowIndex = boardState[0].length - 1;
    
    for (let col = 0; col < boardState.length; col++) {
        if (boardState[col][bottomRowIndex] === player) {
            // Add 0.25 points for each disc in the bottom row
            score += 0.25;
        }
    }

    return score;
}



function scoreBasedOnResult(result) {
    // Assign scores based on game outcome
    if (result === "red") {
        return 1000; // Assuming red is the AI
    } else if (result === "blue") {
        return -1000; // Assuming blue is the human player
    } else if (result === "draw") {
        return 0;
    }
}


// Check if there are free slots for the given column.
function isColumnPlayable(boardState, col) {
    // Check if the top cell of the column is null (meaning the column is not full)
    //returns True of False
    return boardState[col][boardState[col].length - 1] === null;
}


export default findBestMove