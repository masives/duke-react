// @flow

import React, { Component } from 'react';
import './board.scss';
import CellComponent from './cell/cell-component';
import InitialSetupHandlerComponent from './event-handlers/InitialSetupHandler';

const initialSetupHandler = new InitialSetupHandlerComponent();
type BoardState = { currentPlayer: string, gameStage: string, targetedCell: CellState, boardCells: CellState };

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
    const Cells: Array<CellState> = initialSetupHandler.generateCells();
    this.setState({ boardCells: Cells });
  }

  render() {
    return (
      <div className="board">
        <h1>tu będą celki, na poszczególne</h1>
        <h2>obecny gracz: {this.state.currentPlayer}</h2>
        <div className="board-wrapper">
          {this.state.boardCells.map(cell => (
            <CellComponent
              key={`cell-${cell.coordinates.x}-${cell.coordinates.y}`}
              cellState={cell}
              onCellClicked={this.onCellClicked}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Board;
