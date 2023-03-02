import { useState } from 'react';


function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick = {onSquareClick}>{value}</button>
  );
}


export default function Board() { 
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  // console.log(squares)

    function handleClick(i) {
     if( calculateWinner(squares) || squares[i] ){
      return;
     }

     squares[i] = (isX ? 'X' : 'O')
     setSquares(squares)
     setIsX(!isX)
    }


    const winner = calculateWinner(squares);
    let status;

    if( winner ){
      status = 'Winner: ' + winner;
    }
    else{
      status = 'Next Player: ' + (isX ? 'X' : 'O');
    }


    function handleRestart(){
      setIsX(true);
      setSquares(Array(9).fill(null));
    }

    // function renderSquare(i) {
    //   return <Square value = {squares[i]} onSquareClick = {() => handleClick(i)} />
    // }

    return(
        <div className="container">
          <div className="status">{status}</div>
          <div className="board-row">
          <Square value = {squares[0]} onSquareClick = {() => handleClick(0)} />
          <Square value = {squares[1]} onSquareClick = {() => handleClick(1)} />
          <Square value = {squares[2]} onSquareClick = {() => handleClick(2)} />
          </div>
          <div className="board-row">
          <Square value = {squares[3]} onSquareClick = {() => handleClick(3)} />
          <Square value = {squares[4]} onSquareClick = {() => handleClick(4)} />
          <Square value = {squares[5]} onSquareClick = {() => handleClick(5)} />
          </div>
          <div className="board-row">
          <Square value = {squares[6]} onSquareClick = {() => handleClick(6)} />
          <Square value = {squares[7]} onSquareClick = {() => handleClick(7)} />
          <Square value = {squares[8]} onSquareClick = {() => handleClick(8)} />
          </div>
          <button className="restart" onClick = {handleRestart}>Restart Game</button>
        </div>
    );
}

function calculateWinner(squares) {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
 
  for( let i = 0; i < winningPatterns.length; i++ ){
    const [a,b,c] = winningPatterns[i];
    if( squares[a] &&  squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}