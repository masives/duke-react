// @flow

import update from 'immutability-helper';
import movement from './movement.json';
import { isInBounds } from './helpers';
import CELL_STATUS from './enums/cell-status';

export const getUnitMovement = (
  unitType: string,
  startingSide: boolean,
  board: BoardCells,
  currentCoordinates: Coordinates,
  currentPlayer: string
) => {
  // get movement from config
  let result = startingSide ? movement[unitType].startingSide : movement[unitType].notStartingSide;

  // map movement from relative to actual board coordinates
  if (result.move) {
    result = result.move.map((coordinates: Coordinates) => ({
      row: currentCoordinates.row + coordinates.row,
      col: currentCoordinates.col + coordinates.col
    }));
  }

  // delete out of bounds
  result = result
    .filter(coordinates => isInBounds(coordinates))
    // check for friendly collision
    .filter(coordinates => board[coordinates.row][coordinates.col].color !== currentPlayer);

  // create
  const cellToUpdateAsSelected = {};
  result.forEach(coordinates =>
    Object.assign(cellToUpdateAsSelected, {
      [coordinates.row]: {
        [coordinates.col]: {
          state: {
            $set: CELL_STATUS.TARGETED
          }
        }
      }
    })
  );

  return update(board, cellToUpdateAsSelected);
};

export default getUnitMovement;
