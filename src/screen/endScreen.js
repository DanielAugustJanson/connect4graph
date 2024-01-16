import React from 'react';
import "../screen/endScreen.css";

const EndScreen = ({ winner, resetBoard }) => {
  return (
    <div className='endScreen'>
        <p>Game Over</p>
        <p>Winner is: - {winner}</p>
        <button onClick={resetBoard}>Restart</button>
    </div>
  );
};

export default EndScreen;
