// @flow
import configuration from '../config/index.json';
import { generateCells } from './helpers';

class InitialSetupHandler {
  mutableBoard: BoardCells = generateCells();

  initialSetupState = {
    white: {
      dukeDrawn: false,
      knightsDrawn: 0
    },
    black: {
      dukeDrawn: false,
      knightsDrawn: 0
    }
  };

  handleInitialSetup = (cell: CellState, color: string) => {
    let result;
    if (!this.initialSetupState[color].dukeDrawn) {
      if (cell.coordinates.x !== this.initialDukeRow(color)) {
        result = false; // return a message that can be displayed to user
      }
      if (cell.coordinates.x === this.initialDukeRow(color)) {
        this.mutableBoard[cell.coordinates.x][cell.coordinates.y].color = color;
        this.mutableBoard[cell.coordinates.x][cell.coordinates.y].unitType = 'duke';
        this.initialSetupState[color].dukeDrawn = true;
        result = { board: this.mutableBoard, currentPlayer: 'black' };
      }
    }
    return result;
  };

  initialDukeRow = (color: string) => (color === 'white' ? 0 : configuration.boardSize.height - 1);
}

export default InitialSetupHandler;
