// @flow

import React from 'react';

const Cell = (props: { onCellClicked: Function, cellState: CellState }) => {
  const cellClicked = () => {
    props.onCellClicked(props.cellState.coordinates);
  };
  return (
    <button className="board-cell" onClick={cellClicked} onKeyPress={cellClicked}>
      <p>row - {props.cellState.coordinates.x}</p>
      <p>col - {props.cellState.coordinates.y}</p>
      <p>unit - {props.cellState.unitType}</p>
      <p>current player = {props.cellState.color}</p>
    </button>
  );
};

export default Cell;
