// @flow

import update from 'immutability-helper';
import CELL_STATUS from './enums/cell-status';
import PLAYER_COLOR from './enums/player-color';
import { emptySelection } from './helpers';

const copySelectedCell = (board: BoardCells, clickedCell: CellState, selectedCell: CellState) => {
  let cellsToBeChanged = {};
  cellsToBeChanged = {
    [clickedCell.coordinates.row]: {
      [clickedCell.coordinates.col]: {
        color: { $set: selectedCell.color },
        unitType: { $set: selectedCell.unitType },
        startingSide: { $set: !selectedCell.startingSide },
        state: { $set: CELL_STATUS.NONE }
      }
    }
  };
  // have to call object assign or row will be overwritten
  cellsToBeChanged = Object.assign({}, cellsToBeChanged, {
    [selectedCell.coordinates.row]: Object.assign({}, cellsToBeChanged[selectedCell.coordinates.row], {
      [selectedCell.coordinates.col]: {
        color: { $set: PLAYER_COLOR.NONE },
        unitType: { $set: '' },
        startingSide: { $set: true },
        state: { $set: CELL_STATUS.NONE }
      }
    })
  });

  return update(board, cellsToBeChanged);
};

const handleMovement = (board: BoardCells, clickedCell: CellState, selectedCell: CellState) => {
  let result = copySelectedCell(board, clickedCell, selectedCell);
  result = emptySelection(result);
  return result;
};

export default handleMovement;
