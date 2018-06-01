// @flow
/* eslint-disable import/prefer-default-export */
import update from 'immutability-helper';
import configuration from '../config/index.json';
import CELL_STATUS from './enums/cell-status';
import PLAYER_COLOR from './enums/player-color';

export const generateCells = () => {
  const Cells: BoardCells = new Array(configuration.boardSize.width);
  for (let i = 0; i < configuration.boardSize.width; i += 1) {
    Cells[i] = new Array(configuration.boardSize.width);
    for (let j = 0; j < configuration.boardSize.height; j += 1) {
      Cells[i][j] = {
        coordinates: {
          row: i,
          col: j
        },
        color: '',
        unitType: '',
        startingSide: true,
        state: ''
      };
    }
  }
  return Cells;
};

export const emptySelection = (board: BoardCells) => {
  const targetedCells: Array<CellState> = [];

  board.forEach((row: Array<CellState>) =>
    row.forEach((cell: CellState) => {
      if (cell.state !== CELL_STATUS.NONE) {
        targetedCells.push(cell);
      }
    })
  );
  let cellsToBeCleared = {};

  targetedCells.forEach((cellToBeCleared: CellState) => {
    cellsToBeCleared = Object.assign({}, cellsToBeCleared, {
      [cellToBeCleared.coordinates.row]: Object.assign({}, cellsToBeCleared[cellToBeCleared.coordinates.row], {
        [cellToBeCleared.coordinates.col]: {
          state: {
            $set: CELL_STATUS.NONE
          }
        }
      })
    });
  });

  const boardWithClearedSelection = update(board, cellsToBeCleared);
  return boardWithClearedSelection;
};

export const changeCurrentPlayer = (currentPlayer: string) =>
  currentPlayer === PLAYER_COLOR.WHITE ? PLAYER_COLOR.BLACK : PLAYER_COLOR.WHITE;

export const getAdjacentToDuke = (dukeCoordinates: Coordinates) => {
  const result: Array<Coordinates> = [];
  if (dukeCoordinates.col - 1 >= 0) {
    result.push({ col: dukeCoordinates.col - 1, row: dukeCoordinates.row });
  }
  if (dukeCoordinates.col + 1 < configuration.boardSize.height) {
    result.push({ col: dukeCoordinates.col + 1, row: dukeCoordinates.row });
  }
  if (dukeCoordinates.row - 1 >= 0) {
    result.push({ col: dukeCoordinates.col, row: dukeCoordinates.row - 1 });
  }
  if (dukeCoordinates.row + 1 < configuration.boardSize.width) {
    result.push({ col: dukeCoordinates.col, row: dukeCoordinates.row + 1 });
  }
  return result;
};
