// @flow

export type Coordinates = Object & {
  row: number,
  col: number
};

export type CellState = {
  color: string,
  coordinates: Coordinates,
  unitType: string,
  polarity: string,
  selected: boolean,
  targeted: boolean
};

// prettier-ignore
export type BoardCells = Array < Array < CellState >> ;