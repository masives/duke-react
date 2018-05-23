// @flow

// import update from 'immutability-helper';
import movement from './movement.json';
import { isInBounds } from './helpers';

export const getUnitMovement = (
  unitType: string,
  startingSide: boolean,
  board: BoardCells,
  currentCoordinates: Coordinates,
  currentPlayer: string
) => {
  // get movement from config
  let result = startingSide ? movement[unitType].startingSide : movement[unitType].notStartingSide;

  // map movement from relative to actual board pieces
  if (result.move) {
    result = result.move.map((coordinates: Coordinates) => ({
      row: currentCoordinates.row + coordinates.row,
      col: currentCoordinates.col + coordinates.col
    }));
  }

  // delete out of bounds
  result = result.filter(coordinates => isInBounds(coordinates));

  // check for friendly collision
  result = result.filter(coordinates => board[coordinates.row][coordinates.col].color !== currentPlayer);

  console.log('result po filtrowaniu', result);
  console.log(board);
  // return 'error';
};

export default getUnitMovement;
