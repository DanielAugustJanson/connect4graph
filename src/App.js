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

/* 

REMOVING CONSOLE.lOG FROM CONNECTAI WILL REALLY SPEED IT UP!!!!!!!!!!!!!!!!!!!!!!!!!!!!

*/

function App() {
  //0 for Player and 1 for AI
  const [playerTurn, setPlayerTurn] = useState(1);

  //AiEnabled?
  const [aiEnabled, setAIEnabled] = useState(0)

  //0 - Game hasn't started, 1- Game ongoing, 2- Game Over
  const [gameState, setGameState] = useState(0);

  //Set winner for the endScreen
  const [winner,setWinner] = useState("")

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


    if (playerTurn === 2 && aiEnabled) {

      //Going above 5 REALLY slows it down, so tread carefully!
      let bestColumn = findBestMove(boardState,6,true)
      console.log(bestColumn)

      handleClick(bestColumn)
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

            //Check Win Conditions
            // Exit the loop after making the move
            break;
        }
    }
    if(checkConditions(boardState) !==null){
      setWinner(checkConditions(boardState));
      setGameState(2)
    }
}


  function changePlayer() {
    setPlayerTurn(playerTurn === 1 ? 2 : 1);
  }

  function startGame(ai){
    setGameState(1)
    setPlayerTurn(1)
    if(ai){
      setAIEnabled(true)
    }
    else{
      setAIEnabled(false)
    }
  }

  function resetBoard(){
    setGameState(0);
    setPlayerTurn(1);
    setBoardState([
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ])

  }


  return (
    <div>
      {gameState === 0 && <StartScreen startGame={startGame} />}
      {gameState === 1 && loadBoard()}
      {gameState === 2 && <EndScreen winner={winner} resetBoard={resetBoard} />}
      <Footer></Footer>
    </div>
  );
}

export default App;
