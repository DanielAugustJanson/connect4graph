import React from "react";
import "../screen/startScreen.css";

const startScreen = ({ startGame }) => {
  return (
    <div className="startScreen">
      <p>Connect 4, the game <br/> where you try to connect 4 dots</p>

      <div className="choice">
        <p>Choose your challenger</p>
        <div className="startButtons">
          <button
            onClick={() => {
              startGame(false);
            }}
          >
            You vs You
          </button>
          <button
            onClick={() => {
              startGame(true);
            }}
          >
            You vs AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default startScreen;
