// @flow

import React from 'react';
import CellComponent from './cell';

const Board = (props: { board: BoardCells, currentPlayer: string, onCellClicked: Function }) => {
  const listener: Function = props.onCellClicked;

  return (
    <div className="board">
      <h2>obecny gracz: {props.currentPlayer}</h2>
      <div className="board-wrapper">
        {props.board.map((cellRow: Array<CellState>) =>
          cellRow.map((cell: CellState) => (
            <CellComponent
              key={`cell-${cell.coordinates.row}-${cell.coordinates.col}`}
              cellState={cell}
              onCellClicked={listener}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default Board;
