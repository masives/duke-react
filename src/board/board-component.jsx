// @flow

import React, { Component } from 'react';
import './board.scss';
import configuration from '../config/index.json';
import CellComponent from './cell/cell-component';

export class Board extends Component<null, { currentPlayer: string, targetedCell: CellState }> {
  state = {
    currentPlayer: 'white',
    targetedCell: {
      color: '',
      coordinates: { x: 0, y: 0 },
      unitType: '',
      polarity: '',
      selected: false
    }
  };

  onCellClicked = (clickedCellProps: CellState) => {
    console.log('received from cell', clickedCellProps);
    this.setState({
      targetedCell: clickedCellProps
    });
    console.log('current target cell', this.state.targetedCell);

    this.dispatchClickHandling(clickedCellProps);
  };
  gameStage = 'initialSetup';
  dispatchClickHandling = (cell: CellState) => {
    if (this.gameStage === 'initialSetup') {
      console.log('time to check something', cell);
    }
  };

  initializeCells() {
    const Cells = [];
    for (let i = 0; i < this.width; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        Cells.push({ x: i, y: j, key: `cell-${i}-${j}` });
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
