// @flow
import update from 'immutability-helper';
import configuration from '../config/index.json';
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
        result.board = update(board, {
          [targetCell.coordinates.row]: {
            [targetCell.coordinates.col]: {
              color: { $set: currentPlayer },
              unitType: { $set: 'duke' }
            }
          }
        });

        this.initialSetupState[currentPlayer].dukeDrawn = true;
        this.DukeCoordinates[currentPlayer] = targetCell.coordinates;

        const adjacentToDuke = this.getAdjacentToDuke(this.DukeCoordinates[currentPlayer]);
        adjacentToDuke.forEach((coordinates: Coordinates) => {
          result.board[coordinates.row][coordinates.col].state = CELL_STATUS.TARGETED_DRAW;
        });
        return result;
      }
    }
    if (this.initialSetupState[currentPlayer].dukeDrawn && targetCell.state === CELL_STATUS.TARGETED_DRAW) {
      result.board = update(board, {
        [targetCell.coordinates.row]: {
          [targetCell.coordinates.col]: {
            color: { $set: currentPlayer },
            unitType: { $set: 'footman' },
            state: { $set: '' }
          }
        }
      });

      this.initialSetupState[currentPlayer].footmanDrawn += 1;

      if (this.initialSetupState[currentPlayer].footmanDrawn === 2) {
        result.currentPlayer = PLAYER_COLOR.BLACK;

        // cancel selection, to be extracted
        result.board.forEach(row => {
          row.forEach(col => {
            col.state = ''; // eslint-disable-line no-param-reassign
          });
        });
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

  getAdjacentToDuke = (dukeCoordinates: Coordinates) => {
    const result: Array<Coordinates> = [];
    if (dukeCoordinates.col - 1 >= 0) {
      result.push({ col: dukeCoordinates.col - 1, row: dukeCoordinates.row });
    }
    if (dukeCoordinates.col + 1 < configuration.boardSize.height) {
      result.push({ col: dukeCoordinates.col + 1, row: dukeCoordinates.row });
    }
    if (dukeCoordinates.row - 1 >= 0) {
      result.push({ col: dukeCoordinates.col, row: dukeCoordinates.row - 1 });
    }
    if (dukeCoordinates.row + 1 < configuration.boardSize.width) {
      result.push({ col: dukeCoordinates.col, row: dukeCoordinates.row + 1 });
    }
    return result;
  };
}

export default InitialSetupHandler;
