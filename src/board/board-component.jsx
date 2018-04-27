import React, { Component } from 'react';
import './board.scss';
import configuration from '../config/index.json';

export class Board extends Component {
  state = {
    currentPlayer: 'white'
  };

  render() {
    return (
      <div className="board-wrapper">
        <h1>tu będą celki, na poszczególne</h1>
        <h2>obecny gracz: {this.state.currentPlayer}</h2>
        <pre>
          <code>{configuration.boardSize.width}</code>
        </pre>
      </div>
    );
  }
}

export default Board;
