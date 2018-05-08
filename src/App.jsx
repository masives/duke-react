import React, { Component } from 'react';
import './App.scss';
// import BoardComponent from './board/board-component';
import GameHandlerComponent from './board/game-handler';

class App extends Component {
  user = {
    name: 'Jozef',
    surname: 'Piecyk'
  };

  render() {
    return (
      <div>
        <header className="main-header">Duke</header>
        <div className="App">
          {/* <BoardComponent /> */}
          <GameHandlerComponent />
          <div className="menu-wrapper">menu</div>
        </div>
      </div>
    );
  }
}

export default App;
