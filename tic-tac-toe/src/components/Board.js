import { useEffect, useMemo, useState } from 'react';


function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick = {onSquareClick}>{value}</button>
  );
}


export default function Board({ waitTime }) { 
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [totalGames, setTotalGames] = useState(0);
  const [xWins, setXWins] = useState(0);

  function handleRestart(){
    const winner = calculateWinner(squares);
    if(winner === 'X'){
      setXWins(prev => prev + 1);
    }
    setTotalGames(prev => prev + 1);
    setIsX(true);
    setSquares(Array(9).fill(null));
  }

  function handleClick(i) {
    if(calculateWinner(squares) || squares[i]){
      return;
    }

    setSquares(prev => {
      const newSqrs = [...prev];
      newSqrs[i] = isX ? 'X' : '🤖';
      return newSqrs;
    });
    setIsX(!isX)
  }


  const winner = useMemo(() => calculateWinner(squares), [squares]);
  let status;

  if( winner ){
    status = winner === 'X' ? '🎉 Winner: X 🎉' : '🎉 Winner: Agent 🎉';
  }
  else{
    status = (isX ? 'Your turn' : 'Thinking...');
  }

  useEffect(() => {
    if(!isX && !calculateWinner(squares)){
      const index = playedByComputer(squares, waitTime);
      setTimeout(() => handleClick(index), waitTime);
    }
  }, [squares]);


  return(
      <div className="container">
        <div className="score">
          <span>Your Score: </span>
          <span className='score-value'>{xWins} / {totalGames}</span>
        </div>
        

        <div className="status">
          {status}
        </div>

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

        <button className="restart" onClick = {handleRestart}>
          Restart Game
        </button>
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


function playedByComputer(squares, waitTime){
  const emptySquares = squares.map((val, i) => (val === null ? i : null)).filter(i => i !== null);

  if(waitTime < 1000) {
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }


  for (let i of emptySquares) {
    let tempSquares = [...squares];
    tempSquares[i] = '🤖';
    if (calculateWinner(tempSquares) === '🤖') return i;
  }
  for (let i of emptySquares) {
    let tempSquares = [...squares];
    tempSquares[i] = 'X';
    if (calculateWinner(tempSquares) === 'X') return i;
  }

  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
}