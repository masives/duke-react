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
      if (cell.coordinates.y !== this.initialDukeRow(color)) {
        console.log('wrong cell');
        return;
      }
      if (cell.coordinates.y === this.initialDukeRow(color)) {
        cell.color = color;
        this.initialSetupState[color].dukeDrawn = true;
        return;
      }
      console.log('duke not drawn');
    }
  };

  initialDukeRow = (color: string) => (color === 'white' ? 0 : configuration.boardSize.height - 1);

  generateCells = () => {
    const Cells: Array<CellState> = [];
    for (let i = 0; i < configuration.boardSize.width; i += 1) {
      for (let j = 0; j < configuration.boardSize.width; j += 1) {
        Cells.push({
          coordinates: {
            x: j,
            y: i
          },
          color: '',
          unitType: '',
          polarity: '',
          selected: false,
          targeted: false
        });
      }
    }
    return Cells;
  };
}

export default InitialSetupHandler;
