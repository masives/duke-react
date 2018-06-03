// @flow

import movement from './movement.json';
import { isInBounds } from './movement-pattern-helpers';

const checkFriendlyCollision = (cell: CellState, currentPlayer: string) => cell.color !== currentPlayer;

const checkCollision = (cell: CellState, currentPlayer: string) => ({
  friendly: cell.color === currentPlayer,
  enemy: cell.color !== currentPlayer && cell.color !== ''
});

const getMoveTypeMovement = (absoluteUnitMovement, selectedCellCoordinates, board, currentPlayer) =>
  absoluteUnitMovement.move
    .map((targetedCoordinates: Coordinates) => ({
      row: selectedCellCoordinates.row + targetedCoordinates.row,
      col: selectedCellCoordinates.col + targetedCoordinates.col
    }))
    .filter(targetedCoordinates => isInBounds(targetedCoordinates))
    .filter(targetedCoordinates =>
      checkFriendlyCollision(board[targetedCoordinates.row][targetedCoordinates.col], currentPlayer)
    );

const getSlideTypeMovement = (absoluteUnitMovement, selectedCellCoordinates, board, currentPlayer) => {
  const slideMovement = [];
  if (absoluteUnitMovement.slide === 'horizontal') {
    const checkedRow = board[selectedCellCoordinates.row];
    const checkLeft = (index = 1) => {
      let checkedIndex = index;
      const checkedColumn = selectedCellCoordinates.col - checkedIndex;
      if (checkedColumn >= 0) {
        const colission = checkCollision(checkedRow[checkedColumn], currentPlayer);
        if (colission.friendly) {
          return;
        }
        slideMovement.push({
          row: selectedCellCoordinates.row,
          col: checkedColumn
        });
        if (colission.enemy) {
          return;
        }
        checkedIndex += 1;
        checkLeft(checkedIndex);
      }
    };
    const checkRight = (index = 1) => {
      let checkedIndex = index;
      const checkedColumn = selectedCellCoordinates.col + checkedIndex;
      if (checkedColumn < 6) {
        const colission = checkCollision(checkedRow[checkedColumn], currentPlayer);
        if (colission.friendly) {
          return;
        }
        slideMovement.push({
          row: selectedCellCoordinates.row,
          col: checkedColumn
        });
        if (colission.enemy) {
          return;
        }
        checkedIndex += 1;
        checkRight(checkedIndex);
      }
    };
    checkLeft();
    checkRight();
  }
  if (absoluteUnitMovement.slide === 'vertical') {
    const checkTop = (index = 1) => {
      let checkedIndex = index;
      const checkedRow = selectedCellCoordinates.row - checkedIndex;
      if (checkedRow >= 0) {
        const colission = checkCollision(board[checkedRow][selectedCellCoordinates.col], currentPlayer);
        if (colission.friendly) {
          return;
        }
        slideMovement.push({
          row: checkedRow,
          col: selectedCellCoordinates.col
        });
        if (colission.enemy) {
          return;
        }
        checkedIndex += 1;
        checkTop(checkedIndex);
      }
    };

    const checkBottom = (index = 1) => {
      let checkedIndex = index;
      const checkedRow = selectedCellCoordinates.row + checkedIndex;
      if (checkedRow < 6) {
        const colission = checkCollision(board[checkedRow][selectedCellCoordinates.col], currentPlayer);
        if (colission.friendly) {
          return;
        }
        slideMovement.push({
          row: checkedRow,
          col: selectedCellCoordinates.col
        });
        if (colission.enemy) {
          return;
        }
        checkedIndex += 1;
        checkBottom(checkedIndex);
      }
    };
    checkTop();
    checkBottom();
  }
  return slideMovement;
};

const getRelativeMovement = (
  absoluteUnitMovement,
  selectedCellCoordinates: Coordinates,
  board: BoardCells,
  currentPlayer: string
) => {
  const relativeMovement = [];
  if (absoluteUnitMovement.move) {
    relativeMovement.push(...getMoveTypeMovement(absoluteUnitMovement, selectedCellCoordinates, board, currentPlayer));
  }
  if (absoluteUnitMovement.slide) {
    relativeMovement.push(...getSlideTypeMovement(absoluteUnitMovement, selectedCellCoordinates, board, currentPlayer));
  }
  return relativeMovement;
};

const getUnitMovementPattern = (
  startingSide: boolean,
  unitType: string,
  selectedCoordinates: Coordinates,
  board: BoardCells,
  currentPlayer: string
) => {
  const absoluteUnitMovement = startingSide ? movement[unitType].startingSide : movement[unitType].notStartingSide;
  return getRelativeMovement(absoluteUnitMovement, selectedCoordinates, board, currentPlayer);
};

export default getUnitMovementPattern;
