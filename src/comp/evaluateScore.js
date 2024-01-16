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

    
    //console.log("score is: " + (redScore - blueScore))

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

export default evaluateBoard