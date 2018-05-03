// @flow

import React, { Component } from 'react';
import './board.scss';
import configuration from '../config/index.json';
import CellComponent from './cell/cell-component';
import InitialSetupHandlerComponent from './event-handlers/InitialSetupHandler';

const initialSetupHandler = new InitialSetupHandlerComponent();

export class Board extends Component<null, { currentPlayer: string, gameStage: string, targetedCell: CellState }> {
  state = {
    currentPlayer: 'white',
    gameStage: 'initialSetup',
    targetedCell: {}
  };

  onCellClicked = (clickedCellProps: CellState) => {
    this.setState({
      targetedCell: clickedCellProps
    });
    console.log('current target cell', this.state.targetedCell);
    this.dispatchClickHandling(clickedCellProps);
  };

  dispatchClickHandling = (cell: CellState) => {
    if (this.state.gameStage === 'initialSetup') {
      initialSetupHandler.handleInitialSetup(cell, this.state.currentPlayer);
    }
  };

  initializeGame = () => {
    this.state.gameStage = 'initialSetup';
  };

  initializeCells() {
    const Cells = [];
    for (let i = 0; i < this.width; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        Cells.push({ x: j, y: i, key: `cell-${j}-${i}` });
      }
    }
    return Cells;
  }
  width = configuration.boardSize.width;
  height = configuration.boardSize.height;
  Cells = this.initializeCells();

  render() {
    return (
      <div className="board">
        <h1>tu będą celki, na poszczególne</h1>
        <h2>obecny gracz: {this.state.currentPlayer}</h2>
        <div className="board-wrapper">
          {this.Cells.map(cell => (
            <CellComponent
              key={cell.key}
              coordinatex={cell.x}
              coordinatey={cell.y}
              onCellClicked={this.onCellClicked}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Board;
