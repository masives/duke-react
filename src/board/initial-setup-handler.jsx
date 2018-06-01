// @flow
import configuration from '../config/index.json';
import { emptySelection, changeCurrentPlayer, getAdjacentToDuke } from './helpers';
import { setUnit } from './draw/draw';
import GAME_STAGES from './enums/game-stages';
import CELL_STATUS from './enums/cell-status';
import PLAYER_COLOR from './enums/player-color';

class InitialSetupHandler {
  DukeCoordinates: Object & { white: Coordinates | null, black: Coordinates | null } = {
    white: null,
    black: null
  };
  currentPlayer: string;

  initialSetupState: initialSetupState = {
    white: {
      dukeDrawn: false,
      footmanDrawn: 0
    },
    black: {
      dukeDrawn: false,
      footmanDrawn: 0
    }
  };

  handleInitialSetup = (targetCell: CellState, currentPlayer: string, board: BoardCells) => {
    const result = {};
    result.message = '';
    if (!this.initialSetupState[currentPlayer].dukeDrawn) {
      if (targetCell.coordinates.row !== this.initialDukeRow(currentPlayer)) {
        result.message = `wrong row - please choose the ${currentPlayer === PLAYER_COLOR.WHITE ? 'top' : 'bottom'} row`;
        return result;
      }
      if (targetCell.coordinates.row === this.initialDukeRow(currentPlayer)) {
        result.board = setUnit(board, targetCell.coordinates, 'duke', currentPlayer);

        this.initialSetupState[currentPlayer].dukeDrawn = true;
        this.DukeCoordinates[currentPlayer] = targetCell.coordinates;

        const adjacentToDuke = getAdjacentToDuke(this.DukeCoordinates[currentPlayer]);
        adjacentToDuke.forEach((coordinates: Coordinates) => {
          // updated board is modified directly, I'm unsure if that's ok
          result.board[coordinates.row][coordinates.col].state = CELL_STATUS.TARGETED_DRAW;
        });
        return result;
      }
    }
    if (this.initialSetupState[currentPlayer].dukeDrawn && targetCell.state === CELL_STATUS.TARGETED_DRAW) {
      result.board = setUnit(board, targetCell.coordinates, 'footman', currentPlayer);
      this.initialSetupState[currentPlayer].footmanDrawn += 1;

      if (this.initialSetupState[currentPlayer].footmanDrawn === 2) {
        result.currentPlayer = changeCurrentPlayer(currentPlayer);
        result.board = emptySelection(result.board);
      }

      if (this.initialSetupState.black.dukeDrawn && this.initialSetupState[currentPlayer].footmanDrawn === 2) {
        result.gameStage = GAME_STAGES.GAME_LOOP;
        result.targetedCell = null;
        result.currentPlayer = PLAYER_COLOR.WHITE;
      }

      return result;
    }
    result.message = 'please put footman in highlighted place';
    return result;
  };

  initialDukeRow = (color: string) => (color === PLAYER_COLOR.WHITE ? 0 : configuration.boardSize.height - 1);
}

export default InitialSetupHandler;
