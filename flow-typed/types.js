// @flow

export type CellState = {
  color: string,
  coordinates: Object & { x: number, y: number },
  unitType: string,
  polarity: string,
  selected: boolean
};
