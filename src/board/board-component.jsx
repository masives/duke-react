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
  boardCells: BoardCells
};

export class Board extends Component<null, BoardState> {
  state = {
    currentPlayer: 'white',
    gameStage: 'initialSetup',
    boardCells: initialSetupHandler.generateCells(),
    targetedCell: {}
  };

  onCellClicked = (coordinates: Coordinates) => {
    this.setState({ targetedCell: this.state.boardCells[coordinates.x][coordinates.y] }, this.dispatchClickHandling);
  };

  dispatchClickHandling = () => {
    if (this.state.gameStage === 'initialSetup') {
      const handlingResult = initialSetupHandler.handleInitialSetup(this.state.targetedCell, this.state.currentPlayer);
      if (handlingResult) {
        this.setState(handlingResult);
      }
    }
  };

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
