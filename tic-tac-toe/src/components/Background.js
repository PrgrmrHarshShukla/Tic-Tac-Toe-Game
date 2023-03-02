import React from 'react';

import Board from './Board'


class Background extends React.Component {

    render(){ 
      return (
        <div className="fullPage">
          <Board />    
        </div>
      );
    }
  }
  
  export default Background;