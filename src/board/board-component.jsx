// @flow

import React from 'react';
import CellComponent from './cell';

const Board = (props: { board: BoardCells, onCellClicked: Function }) => {
  const listener: Function = props.onCellClicked;

  return (
    <div className="board">
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
