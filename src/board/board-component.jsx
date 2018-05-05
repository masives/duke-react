// @flow

import React, { Component } from 'react';
import './board.scss';
import CellComponent from './cell/cell-component';
import InitialSetupHandlerComponent from './event-handlers/InitialSetupHandler';

const initialSetupHandler = new InitialSetupHandlerComponent();
type BoardState = {
  currentPlayer: string,
  gameStage: string,
  targetedCell: CellState | Object,
  boardCells: Array<Array>
};

export class Board extends Component<null, BoardState> {
  state = {
    currentPlayer: 'white',
    gameStage: 'initialSetup',
    boardCells: [],
    targetedCell: {}
  };
  componentDidMount() {
    this.initializeCells();
  }

  onCellClicked = (coordinates: Coordinates) => {
    this.setState(
      {
        targetedCell: this.state.boardCells[coordinates.x][coordinates.y]
      },
      this.dispatchClickHandling
    );
  };

  dispatchClickHandling = () => {
    console.log('strzał na handling');
    if (this.state.gameStage === 'initialSetup') {
      initialSetupHandler.handleInitialSetup(this.state.targetedCell, this.state.currentPlayer);
      // initialSetupHandler.handleInitialSetup(cell, this.state.currentPlayer);
    }
  };

  initializeCells() {
    const Cells: Array<CellState> = initialSetupHandler.generateCells();
    this.setState({ boardCells: Cells });
  }

  render() {
    return (
      <div className="board">
        <h1>tu będą celki, na poszczególne</h1>
        <h2>obecny gracz: {this.state.currentPlayer}</h2>
        <div className="board-wrapper">
          {this.state.boardCells.map((cellRow: Array<CellState>) =>
            cellRow.map((cell: CellState) => (
              <CellComponent
                key={`cell-${cell.coordinates.x}-${cell.coordinates.y}`}
                cellState={cell}
                onCellClicked={this.onCellClicked}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Board;
