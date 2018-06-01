// @flow

import update from 'immutability-helper';
import CELL_STATUS from '../enums/cell-status';

export const setUnit = (board: BoardCells, setCoordinates: Coordinates, unitType: string, currentPlayer: string) =>
  update(board, {
    [setCoordinates.row]: {
      [setCoordinates.col]: {
        color: { $set: currentPlayer },
        unitType: { $set: unitType },
        state: { $set: CELL_STATUS.NONE }
      }
    }
  });

export default setUnit;
