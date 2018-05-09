// @flow
import configuration from '../config/index.json';
import { generateCells } from './helpers';

class InitialSetupHandler {
  mutableBoard: BoardCells = generateCells();

  DukeCoordinates: Object & { white: Coordinates, black: Coordinates } = { white: null, black: null };
  currentPlayer: string;

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
    let result = false;
    this.currentPlayer = color;
    console.log(this.initialSetupState);
    if (!this.initialSetupState[color].dukeDrawn) {
      if (cell.coordinates.row !== this.initialDukeRow(color)) {
        return false; // return a message that can be displayed to user
      }
      if (cell.coordinates.row === this.initialDukeRow(color)) {
        this.mutableBoard[cell.coordinates.row][cell.coordinates.col].color = color;
        this.mutableBoard[cell.coordinates.row][cell.coordinates.col].unitType = 'duke';
        this.initialSetupState[color].dukeDrawn = true;

        this.DukeCoordinates[color] = cell.coordinates;
        const adjacentToDuke = this.getAdjacentToDuke(this.DukeCoordinates[color]);
        adjacentToDuke.map(coordinates => {
          this.mutableBoard[coordinates.row][coordinates.col].targeted = true;
          return true;
        });
        console.log('adjacent to duke', adjacentToDuke);
        result = {
          board: this.mutableBoard
          // currentPlayer: 'black'
        };
        return result;
      }
    }
    if (this.initialSetupState[color].dukeDrawn) {
      console.log('siemka');
    }
    console.log('duke coordinates', this.DukeCoordinates);
    return false;
  };

  initialDukeRow = (color: string) => (color === 'white' ? 0 : configuration.boardSize.height - 1);

  getAdjacentToDuke = (dukeCoordinates: Coordinates) => {
    console.log('dukeCoordinates', dukeCoordinates);
    const result: Array = [];
    if (dukeCoordinates.col - 1 > 0) {
      result.push({ col: dukeCoordinates.col - 1, row: this.DukeCoordinates[this.currentPlayer].row });
    }
    if (dukeCoordinates.col + 1 < configuration.boardSize.height) {
      result.push({ col: dukeCoordinates.col + 1, row: this.DukeCoordinates[this.currentPlayer].row });
    }
    if (dukeCoordinates.row - 1 > 0) {
      result.push({ col: this.DukeCoordinates[this.currentPlayer].col, row: dukeCoordinates.row - 1 });
    }
    if (dukeCoordinates.col + 1 < configuration.boardSize.width) {
      result.push({ col: this.DukeCoordinates[this.currentPlayer].col, row: dukeCoordinates.row + 1 });
    }
    return result;
  };
}

export default InitialSetupHandler;
