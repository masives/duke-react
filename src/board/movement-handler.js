// @flow

import update from 'immutability-helper';
import movement from './movement.json';
import { isInBounds } from './helpers';
import CELL_STATUS from './enums/cell-status';

export const getUnitMovement = (selectedCell: CellState, board: BoardCells, currentPlayer: string) => {
  // get movement from config
  const { unitType, startingSide, coordinates } = selectedCell;
  let result = startingSide ? movement[unitType].startingSide : movement[unitType].notStartingSide;

  if (result.move) {
    result = result.move
      .map((currentCoordinates: Coordinates) => ({
        row: coordinates.row + currentCoordinates.row,
        col: coordinates.col + currentCoordinates.col
      }))
      .filter(currentCoordinates => isInBounds(currentCoordinates))
      // check for friendly collision
      .filter(currentCoordinates => board[currentCoordinates.row][currentCoordinates.col].color !== currentPlayer);
  }

  if (result.slide) {
    if (result.slide === 'horizontal') {
      result = [];

      let checkedLeftIndex = 1;
      const checkLeft = () => {
        if (
          coordinates.col - checkedLeftIndex >= 0 &&
          board[coordinates.row][coordinates.col - checkedLeftIndex].color !== currentPlayer
        ) {
          result.push({
            row: coordinates.row,
            col: coordinates.col - checkedLeftIndex
          });
          checkedLeftIndex += 1;
          checkLeft();
        }
      };
      let checkedRightIndex = 1;
      const checkRight = () => {
        if (
          coordinates.col + checkedRightIndex < 6 && // tu ma być szerokośc z configa
          board[coordinates.row][coordinates.col + checkedRightIndex].color !== currentPlayer
        ) {
          result.push({
            row: coordinates.row,
            col: coordinates.col + checkedRightIndex
          });
          checkedRightIndex += 1;
          checkRight();
        }
      };
      checkLeft();
      checkRight();
    }
  }

  // create selected board array that will be used to update current board
  let cellToUpdateAsSelected = {};
  result.forEach(currentCoordinates => {
    cellToUpdateAsSelected = Object.assign({}, cellToUpdateAsSelected, {
      [currentCoordinates.row]: Object.assign({}, cellToUpdateAsSelected[coordinates.row], {
        [currentCoordinates.col]: {
          state: {
            $set: CELL_STATUS.TARGETED
          }
        }
      })
    });
  });

  return update(board, cellToUpdateAsSelected);
};

export default getUnitMovement;
