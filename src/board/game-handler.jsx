// @flow
import React, { Component } from 'react';
import InitialSetupHandler from './initial-setup-handler';
import { generateCells } from './helpers';
import { INITIAL_GAME_SETUP } from './enums/game-stages';
import BoardComponent from './board-component';

const initialSetupHandler = new InitialSetupHandler();

type GameHandlerState = {
  board: BoardCells,
  gameStage: string,
  targetedCell: CellState | null,
  currentPlayer: string,
  message: string
};
class GameHandler extends Component<null, GameHandlerState> {
  state = {
    board: generateCells(),
    gameStage: INITIAL_GAME_SETUP,
    targetedCell: null,
    currentPlayer: 'white',
    message: ''
  };

  onCellClicked = (coordinates: Coordinates) => {
    this.setState({ targetedCell: this.state.board[coordinates.row][coordinates.col] }, this.dispatchClickEvent);
  };

  dispatchClickEvent = () => {
    let result: any;
    if (this.state.gameStage === INITIAL_GAME_SETUP) {
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
  };

  render() {
    return (
      <section className="App">
        <BoardComponent board={this.state.board} onCellClicked={this.onCellClicked} />

        <div className="menu-wrapper">
          <header>menu</header>
          <p>obecna wiadomość: {this.state.message}</p>
          <p>obecny gracz: {this.state.currentPlayer}</p>
          <p>etap: {this.state.gameStage}</p>
        </div>
      </section>
    );
  }
}

export default GameHandler;
