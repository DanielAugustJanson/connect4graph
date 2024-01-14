import { useState } from 'react';
import './App.css';

function App() {
  
  //Connect 4 main Manager
  const [boardState,setBoardState] = useState(
    //Using 6x6 grid for now
    [
      [null,null,null,null,null,null],
      [null,null,null,null,null,null],
      [null,null,null,null,null,null],
      [null,null,null,null,null,null],
      [null,null,null,null,null,null],
      [null,null,null,null,null,null]
    ]
  )


  //Load the board
  function loadBoard(){
    return
  }


  //Handle Click
  function handleClick(column){
    //Do stuff
  }


  return (
    <div></div>
  );
}

export default App;
