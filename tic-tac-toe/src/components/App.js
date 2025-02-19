import React from 'react';

import './App.css';

import Board from './Board'
import Timer from './Timer';


const App = () => {
  const [showBoard, setShowBoard] = React.useState(false);
  const [waitTime, setWaitTime] = React.useState(300);

  if(!showBoard) {
    return <Timer setWaitTime={setWaitTime} setShowBoard={setShowBoard} />
  }

  return (
      <Board waitTime={waitTime} /> 
  );
}

export default App;