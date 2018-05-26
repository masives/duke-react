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
  if (result.slide) {
    if (result.slide === 'horizontal') {
      result = [];

      let checkedLeftIndex = 1;
      const checkLeft = () => {
        if (
          currentCoordinates.col - checkedLeftIndex >= 0 &&
          board[currentCoordinates.row][currentCoordinates.col - checkedLeftIndex].color !== currentPlayer
        ) {
          console.log('czy warunek?', currentCoordinates.col - checkedLeftIndex);
          result.push({
            row: currentCoordinates.row,
            col: currentCoordinates.col - checkedLeftIndex
          });
          checkedLeftIndex += 1;
          checkLeft();
        }
      };
      let checkedRightIndex = 1;
      const checkRight = () => {
        if (
          currentCoordinates.col + checkedRightIndex < 6 && // tu ma być szerokośc z configa
          board[currentCoordinates.row][currentCoordinates.col + checkedRightIndex].color !== currentPlayer
        ) {
          console.log('czy warunek?', currentCoordinates.col + checkedRightIndex);
          result.push({
            row: currentCoordinates.row,
            col: currentCoordinates.col + checkedRightIndex
          });
          checkedRightIndex += 1;
          checkRight();
        }
      };
      checkLeft();
      checkRight();
      console.log('horizontalMove', result);

      // jeśli nie ma tam przyjazne jednostki to dodaj do arayki i spróbuje dalej
      // jeśli jest to zakończ i zacznij z prawej

      // to samo tylko że potem zacznij
    }
  }

  // delete out of bounds
  console.log('result before filter', result);
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
