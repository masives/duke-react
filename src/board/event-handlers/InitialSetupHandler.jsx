// @flow
/* eslint-disable no-param-reassign */
import configuration from '../../config/index.json';

class InitialSetupHandler {
  mutableBoard: BoardCells;

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
      console.log('coordinates', cell.coordinates);
      if (cell.coordinates.x !== this.initialDukeRow(color)) {
        console.log('wrong cell');
        result = false;
      }
      if (cell.coordinates.x === this.initialDukeRow(color)) {
        this.mutableBoard[cell.coordinates.x][cell.coordinates.y].color = color;
        this.mutableBoard[cell.coordinates.x][cell.coordinates.y].unitType = 'duke';
        this.initialSetupState[color].dukeDrawn = true;
        console.log('board', this.mutableBoard);
        result = { boardCells: this.mutableBoard, currentPlayer: 'black' };
      }
    }
    return result;
  };

  initialDukeRow = (color: string) => (color === 'white' ? 0 : configuration.boardSize.height - 1);

  generateCells = () => {
    const Cells: BoardCells = new Array(configuration.boardSize.width);
    for (let i = 0; i < configuration.boardSize.width; i += 1) {
      Cells[i] = new Array(configuration.boardSize.width);
      for (let j = 0; j < configuration.boardSize.height; j += 1) {
        Cells[i][j] = {
          coordinates: {
            x: i,
            y: j
          },
          color: '',
          unitType: '',
          polarity: '',
          selected: false,
          targeted: false
        };
      }
    }
    this.mutableBoard = JSON.parse(JSON.stringify(Cells));
    return Cells;
  };
}

export default InitialSetupHandler;
