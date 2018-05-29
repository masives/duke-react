// @flow

import update from 'immutability-helper';
import CELL_STATUS from './enums/cell-status';
import getUnitMovementPattern from './movement-pattern/movement-pattern';

export const updateBoardWithTargetedCells = (selectedCell: CellState, board: BoardCells, currentPlayer: string) => {
  const { unitType, startingSide, coordinates } = selectedCell;

  const relativeTargettedCells = getUnitMovementPattern(startingSide, unitType, coordinates, board, currentPlayer);

  // create selected board array that will be used to update current board
  let cellToUpdateAsTargeted = {};
  relativeTargettedCells.forEach(currentCoordinates => {
    cellToUpdateAsTargeted = Object.assign({}, cellToUpdateAsTargeted, {
      [currentCoordinates.row]: Object.assign({}, cellToUpdateAsTargeted[coordinates.row], {
        [currentCoordinates.col]: {
          state: {
            $set: CELL_STATUS.TARGETED
          }
        }
      })
    });
  });

  return update(board, cellToUpdateAsTargeted);
};

export default updateBoardWithTargetedCells;
