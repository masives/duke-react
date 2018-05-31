// @flow

import update from 'immutability-helper';
import CELL_STATUS from './enums/cell-status';
import getUnitMovementPattern from './movement-pattern/movement-pattern';

export const updateBoardWithTargetedCells = (selectedCell: CellState, board: BoardCells, currentPlayer: string) => {
  const { unitType, startingSide, coordinates } = selectedCell;

  const relativeTargettedCells = getUnitMovementPattern(startingSide, unitType, coordinates, board, currentPlayer);

  let cellToUpdateAsTargeted = {};
  relativeTargettedCells.forEach(targetedCoordinates => {
    cellToUpdateAsTargeted = Object.assign({}, cellToUpdateAsTargeted, {
      [targetedCoordinates.row]: Object.assign({}, cellToUpdateAsTargeted[targetedCoordinates.row], {
        [targetedCoordinates.col]: {
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
