// @flow
import React, { Component } from 'react';
import InitialSetupHandler from './initial-setup-handler';
import { generateCells } from './helpers';
import BoardComponent from './board-component';

const initialSetupHandler = new InitialSetupHandler();

type GameHandlerState = {
  board: BoardCells,
  gameStage: string,
  targetedCell: CellState | null,
  currentPlayer: string
};
class GameHandler extends Component<null, GameHandlerState> {
  state = {
    board: generateCells(),
    gameStage: 'initialSetup',
    targetedCell: null,
    currentPlayer: 'white'
  };

  onCellClicked = (coordinates: Coordinates) => {
    this.setState({ targetedCell: this.state.board[coordinates.row][coordinates.col] }, this.dispatchClickEvent);
  };

  dispatchClickEvent = () => {
    let result: any;
    if (this.state.gameStage === 'initialSetup') {
      result = initialSetupHandler.handleInitialSetup(
        this.state.targetedCell,
        this.state.currentPlayer,
        this.state.board
      );
    }
    console.log('result', result);
    if (result) {
      this.setState(result);
    }

    // return result;
  };

  render() {
    return (
      <BoardComponent
        board={this.state.board}
        currentPlayer={this.state.currentPlayer}
        onCellClicked={this.onCellClicked}
      />
    );
  }
}

export default GameHandler;
