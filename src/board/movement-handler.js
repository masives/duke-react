// @flow

import update from 'immutability-helper';
import CELL_STATUS from './enums/cell-status';

const copySelectedCell = (board: BoardCells, clickedCell: CellState, selectedCell: CellState) =>
  update(board, {
    [clickedCell.coordinates.row]: {
      [clickedCell.coordinates.col]: {
        color: { $set: selectedCell.color },
        unitType: { $set: selectedCell.unitType },
        startingSide: { $set: !selectedCell.startingSide },
        state: { $set: CELL_STATUS.NONE }
      }
    }
  });

const emptySelection = (board: BoardCells) => {
  const cellsAreSelected = [];

  board.forEach((row: Array<CellState>) =>
    row.forEach((cell: CellState) => {
      if (cell.state === CELL_STATUS.TARGETED) {
        cellsAreSelected.push(cell);
      }
    })
  );
  console.log(cellsAreSelected);
  return cellsAreSelected;
};
// filter out not targeted cells

// create board update changing only states

const handleMovement = (board: BoardCells, clickedCell: CellState, selectedCell: CellState) => {
  const result = copySelectedCell(board, clickedCell, selectedCell);
  console.log('wiping', emptySelection(board));
  return result;
};

export default handleMovement;
