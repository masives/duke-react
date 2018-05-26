// @flow
import React, { Component } from 'react';
import InitialSetupHandler from './initial-setup-handler';
import { generateCells } from './helpers';
import { getUnitMovement } from './movement-handler';
import GAME_STAGES from './enums/game-stages';
import BoardComponent from './board-component';

const initialSetupHandler = new InitialSetupHandler();

type GameHandlerState = {
  board: BoardCells,
  gameStage: string,
  selectedCell: CellState | null,
  targetedCell?: CellState | null,
  currentPlayer: string,
  message: string
};
class GameHandler extends Component<null, GameHandlerState> {
  state = {
    board: generateCells(),
    gameStage: GAME_STAGES.INITIAL_GAME_SETUP,
    selectedCell: null,
    targetedCell: null,
    currentPlayer: 'white',
    message: ''
  };

  onCellClicked = (coordinates: Coordinates) => {
    this.dispatchClickEvent(coordinates);
  };

  dispatchClickEvent = (coordinates: Coordinates) => {
    const clickedCell: CellState = this.state.board[coordinates.row][coordinates.col];
    let result: any;
    if (this.state.gameStage === GAME_STAGES.INITIAL_GAME_SETUP) {
      this.setState({ targetedCell: clickedCell }, () => {
        result = initialSetupHandler.handleInitialSetup(
          this.state.targetedCell,
          this.state.currentPlayer,
          this.state.board
        );
        // initial setup handler has to clear selection!
        this.setState(result);
      });
    }
    if (this.state.gameStage === GAME_STAGES.GAME_LOOP) {
      console.log('handle gameloop click');
      if (!this.state.selectedCell) {
        if (clickedCell.color === this.state.currentPlayer) {
          console.log('now show where it can move');
          this.setState({ selectedCell: clickedCell }, () => {
            const targetedCells = getUnitMovement(this.state.selectedCell, this.state.board, this.state.currentPlayer);
            console.log('targetedCells', targetedCells);
            this.setState({ board: targetedCells });
            // getPossibleMovement(UnitType, coordinates): Array<coordinates>
            // elementy arrayki ustawić jako potencjalny ruch
          });
        }
      }
      console.log('click on your unit');
    }

    // if not selected and not current player change message to wrong player

    // if not selected and current player set selected Cell mark other cells as targets

    // if selected and targeted cell isn't marked as possible movement clear selection

    // if selected and targeted cell is valid move unit

    // if drawing show possible draw places
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
