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

declare
var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};

export type GameState = {
  board: BoardCells,
  gameStage: string,
  targetedCell: CellState | null,
  currentPlayer: string
};

export type initialSetupState = {
  white: Object & {
    dukeDrawn: boolean,
    knightsDrawn: number
  },
  black: Object & {
    dukeDrawn: boolean,
    knightsDrawn: number
  },
}