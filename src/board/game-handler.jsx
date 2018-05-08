// @flow
import React, { Component } from 'react';
import InitialSetupHandler from './initial-setup-handler';
import { generateCells } from './helpers';
import BoardComponent from './board-component';

const initialSetupHandler = new InitialSetupHandler();

type GameHandlerState = {
  board: BoardCells | Object,
  gameStage: string,
  targetedCell: CellState | Object,
  currentPlayer: string
};
class GameHandler extends Component<null, GameHandlerState> {
  state = {
    board: {},
    gameStage: 'initialSetup',
    targetedCell: {},
    currentPlayer: 'white'
  };

  componentWillMount() {
    this.setState({ board: generateCells() });
  }

  onCellClicked = (coordinates: Coordinates) => {
    this.setState({ targetedCell: this.state.board[coordinates.x][coordinates.y] }, this.dispatchClickEvent);
  };

  dispatchClickEvent = () => {
    let result: any;
    if (this.state.gameStage === 'initialSetup') {
      result = initialSetupHandler.handleInitialSetup(this.state.targetedCell, this.state.currentPlayer);
    }
    console.log('result', result);
    if (result) {
      this.setState({ board: result.board, currentPlayer: result.currentPlayer }, () => {
        console.log(this.state);
      });
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
