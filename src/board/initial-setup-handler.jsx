// @flow
import update from 'immutability-helper';
import configuration from '../config/index.json';

class InitialSetupHandler {
  DukeCoordinates: Object & { white: Coordinates | null, black: Coordinates | null } = {
    white: null,
    black: null
  };
  currentPlayer: string;

  initialSetupState: initialSetupState = {
    white: {
      dukeDrawn: false,
      knightsDrawn: 0
    },
    black: {
      dukeDrawn: false,
      knightsDrawn: 0
    }
  };

  handleInitialSetup = (targetCell: CellState, currentPlayer: string, board: BoardCells) => {
    const result = {};
    if (!this.initialSetupState[currentPlayer].dukeDrawn) {
      if (targetCell.coordinates.row !== this.initialDukeRow(currentPlayer)) {
        return false; // return a message that can be displayed to user
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
          result.board[coordinates.row][coordinates.col].state = 'targeted-draw';
        });
        return result;
      }
    }
    if (this.initialSetupState[currentPlayer].dukeDrawn) {
      console.log('setup knights');
    }
    return false;
  };

  initialDukeRow = (color: string) => (color === 'white' ? 0 : configuration.boardSize.height - 1);

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
    if (dukeCoordinates.col + 1 <= configuration.boardSize.width) {
      result.push({ col: dukeCoordinates.col, row: dukeCoordinates.row + 1 });
    }
    return result;
  };
}

export default InitialSetupHandler;
