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

    return bestColumn;
}

function makeNextMove(boardState, depth, maximizingPlayer) {
    let result = checkConditions(boardState);
    if (result !== null) {
        return scoreBasedOnResult(result); // Scores: 1000 for AI win, -1000 for player win, 0 for draw
    }

    if (depth === 0) {
        return 0; // Score for maximum depth reached
    }

    // Recursively explore further moves
    // Similar logic as in findBestMove, alternating between maximizing and minimizing
}

function scoreBasedOnResult(result) {
    if (result === "red") { // Assuming AI is "red"
        return 1000;
    } else if (result === "blue") {
        return -1000;
    } else if (result === "draw") {
        return 0;
    }
}

function isColumnPlayable(boardState, col) {
    // Check if the top cell of the column is null (meaning the column is not full)
    //returns True of False
    return boardState[col][boardState[col].length - 1] === null;
}

function makeMove(boardState, col, isMaximizingPlayer) {
    // Clone the boardState and apply the move
    // If isMaximizingPlayer is true, it's AI's turn, otherwise it's the human player's turn
    // Return the new board state
}

export default findBestMove