import { useEffect, useState } from "react";
import "./App.css";

//Screens
import StartScreen from "./screen/startScreen";
import EndScreen from "./screen/endScreen";
import Footer from "./screen/footer";

//Components
import checkConditions from "./comp/checkConditions";
import evaluateBoard from "./comp/evaluateScore";

//Old iteration of the algorithm
//import findBestMove from "./comp/graphAI";
import findBestMove from "./comp/connectAI";

function App() {
  //0 for Player and 1 for AI
  const [playerTurn, setPlayerTurn] = useState(1);

  //0 - Game hasn't started, 1- Game ongoing, 2- Game Over
  const [gameState, setGameState] = useState(1);

  //Connect 4 main Manager
  const [boardState, setBoardState] = useState(
    //Using 6x6 grid for now

    //Each list is representing a column, filled from bottom to top (here: left to right)
    [
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ]
  );

  //Make AI move when state changes
  useEffect(() => {


    if (playerTurn === 2) {
      let column = findBestMove(boardState,5,true)
      console.log(column)
    }
  }, [playerTurn, boardState]);

  //Load the board
  function loadBoard() {
    return (
      <div className="board">
        {boardState.map((column, colIndex) => (
          <div key={colIndex} className="column">
            {column.map((cell, rowIndex) => (
              <div
                key={`${colIndex}-${rowIndex}`}
                className={`cell ${
                  cell === "red" ? "red" : cell === "blue" ? "blue" : ""
                }`}
                onClick={() => handleClick(colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  //Handle Click
  function handleClick(column) {
    // Iterate through the selected column
    for (let i = 0; i < boardState[column].length; i++) {
        if (boardState[column][i] === null) {
            // Create a deep copy of the boardState
            const newBoardState = boardState.map(col => [...col]);

            // Update the first empty slot in the column with the current player's color
            newBoardState[column][i] = playerTurn === 1 ? 'blue' : 'red';

            // Update the board state and change the player
            setBoardState(newBoardState);
            changePlayer();

            // Exit the loop after making the move
            break;
        }
    }
}


  function changePlayer() {
    setPlayerTurn(playerTurn === 1 ? 2 : 1);
  }

  return (
    <div>
      {gameState === 0 && <StartScreen setGameState={setGameState} />}
      {gameState === 1 && loadBoard()}
      {gameState === 2 && <EndScreen setGameState={setGameState} />}
      <Footer></Footer>
    </div>
  );
}

export default App;
