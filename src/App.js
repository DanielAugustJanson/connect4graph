import { useState } from "react";
import "./App.css";

//Screens
import StartScreen from "./screen/startScreen";
import EndScreen from "./screen/endScreen";
import Footer from "./screen/footer";

//Components
import checkConditions from "./comp/checkConditions";
import findBestMove from "./comp/graphAI"

function App() {
  //0 for Player and 1 for AI
  const [playerTurn, setPlayerTurn] = useState(0);

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
                  cell === 0 ? "red" : cell === 1 ? "blue" : ""
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
    // Find the first null (empty) cell in the column
    const newBoardState = [...boardState];
    const emptySlotIndex = newBoardState[column].findIndex(
      (cell) => cell === null
    );
    if (emptySlotIndex !== -1) {
      // Fill the first empty slot with the current player's color
      newBoardState[column][emptySlotIndex] = playerTurn;
      setBoardState(newBoardState);

      //Check if game should be over
      let result = checkConditions(boardState)
      if(result === "red" || result === "blue"){
        //Notify of winning.
      }
      if(result === "draw"){
        //Notify that game is over
      }

      //At the end change player turn.
      changePlayer();
    }
  }

  function changePlayer() {
    setPlayerTurn(playerTurn === 0 ? 1 : 0);
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
