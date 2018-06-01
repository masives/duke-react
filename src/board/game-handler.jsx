// @flow
import React, { Component } from 'react';
import InitialSetupHandler from './initial-setup-handler';
import { generateCells, changeCurrentPlayer } from './helpers';
import { updateBoardWithTargetedCells } from './selection-handler';
import handleMovement from './movement-handler';
import GAME_STAGES from './enums/game-stages';
import CELL_STATUS from './enums/cell-status';
import PLAYER_COLOR from './enums/player-color';
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
    currentPlayer: PLAYER_COLOR.WHITE,
    message: ''
  };

  onCellClicked = (coordinates: Coordinates) => {
    this.dispatchClickEvent(coordinates);
  };

  dispatchClickEvent = (coordinates: Coordinates) => {
    const clickedCell: CellState = this.state.board[coordinates.row][coordinates.col];
    let result: any;
    if (this.state.gameStage === GAME_STAGES.INITIAL_GAME_SETUP) {
      result = initialSetupHandler.handleInitialSetup(clickedCell, this.state.currentPlayer, this.state.board);
      this.setState(result);
    }
    if (this.state.gameStage === GAME_STAGES.GAME_LOOP) {
      if (!this.state.selectedCell) {
        if (clickedCell.color === this.state.currentPlayer) {
          const targetedCells = updateBoardWithTargetedCells(clickedCell, this.state.board, this.state.currentPlayer);
          this.setState({ board: targetedCells, selectedCell: clickedCell });
        }
      }
      if (clickedCell.state === CELL_STATUS.TARGETED) {
        // move unit
        const boardAfterMove = handleMovement(this.state.board, clickedCell, this.state.selectedCell);
        const nextPlayer = changeCurrentPlayer(this.state.currentPlayer);
        this.setState({
          board: boardAfterMove,
          currentPlayer: nextPlayer,
          selectedCell: null
          // duke position should be updated (coordinates)
        });
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
