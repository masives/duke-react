// @flow

export type Coordinates = Object & { x: number, y: number };

export type CellState = {
  color: string,
  coordinates: Coordinates,
  unitType: string,
  polarity: string,
  selected: boolean
};
