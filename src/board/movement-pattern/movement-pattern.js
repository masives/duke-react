// @flow

import movement from './movement.json';
import { isInBounds } from './movement-pattern-helpers';

const checkFriendlyCollision = (cell: CellState, currentPlayer: string) => cell.color !== currentPlayer;

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
    let checkedLeftIndex = 1;
    const checkLeft = () => {
      if (
        selectedCellCoordinates.col - checkedLeftIndex >= 0 &&
        checkFriendlyCollision(
          board[selectedCellCoordinates.row][selectedCellCoordinates.col - checkedLeftIndex],
          currentPlayer
        )
      ) {
        slideMovement.push({
          row: selectedCellCoordinates.row,
          col: selectedCellCoordinates.col - checkedLeftIndex
        });
        checkedLeftIndex += 1;
        checkLeft();
      }
    };
    let checkedRightIndex = 1;
    const checkRight = () => {
      if (
        selectedCellCoordinates.col + checkedRightIndex < 6 && // tu ma być szerokośc z configa
        board[selectedCellCoordinates.row][selectedCellCoordinates.col + checkedRightIndex].color !== currentPlayer
      ) {
        slideMovement.push({
          row: selectedCellCoordinates.row,
          col: selectedCellCoordinates.col + checkedRightIndex
        });
        checkedRightIndex += 1;
        checkRight();
      }
    };
    checkLeft();
    checkRight();
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
