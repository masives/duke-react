// @flow
/* eslint-disable no-param-reassign */
import configuration from '../../config/index.json';

class InitialSetupHandler {
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
    if (!this.initialSetupState[color].dukeDrawn) {
      console.log('coordinates', cell.coordinates);
      if (cell.coordinates.x !== this.initialDukeRow(color)) {
        console.log('wrong cell');
        return;
      }
      if (cell.coordinates.x === this.initialDukeRow(color)) {
        cell.color = color;
        this.initialSetupState[color].dukeDrawn = true;
        return;
      }
      console.log('duke not drawn');
    }
  };

  initialDukeRow = (color: string) => (color === 'white' ? 0 : configuration.boardSize.height - 1);

  generateCells = () => {
    const Cells: Array<Array> = new Array(configuration.boardSize.width);
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
    return Cells;
  };
}

export default InitialSetupHandler;
