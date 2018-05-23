// @flow
/* eslint-disable import/prefer-default-export */

import configuration from '../config/index.json';

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

export const isInBounds = (coordinates: Coordinates) =>
  coordinates.row >= 0 && coordinates.row < 6 && coordinates.col >= 0 && coordinates.col < 6;
