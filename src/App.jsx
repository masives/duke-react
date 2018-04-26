import React, { Component } from 'react';
import './App.scss';

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
          <div className="board-wrapper">Game Board</div>
          <div className="menu-wrapper">menu</div>
        </div>
      </div>
    );
  }
}

export default App;
