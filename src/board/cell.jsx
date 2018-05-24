// @flow

import React from 'react';
// import CELL_STATUS from './enums/cell-status';

const Cell = (props: { onCellClicked: Function, cellState: CellState }) => {
  const cellClicked = () => {
    props.onCellClicked(props.cellState.coordinates);
  };
  return (
    <button
      className={`board-cell 
      ${props.cellState.state}
      ${props.cellState.color}`}
      onClick={cellClicked}
      onKeyPress={cellClicked}
    >
      <p>row - {props.cellState.coordinates.row}</p>
      <p>col - {props.cellState.coordinates.col}</p>
      <p>unit - {props.cellState.unitType}</p>
      <p>current player = {props.cellState.color}</p>
    </button>
  );
};

export default Cell;
