function printBoard(boardState,score){
    for(let column = 0; column < 5; column++){
        console.log(boardState[column])
    }
    console.log("Current Board is:" + score)

}

export default printBoard