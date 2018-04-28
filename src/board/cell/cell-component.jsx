// @flow

import React from 'react';

const Cell = (props: { coordinatex: number, coordinatey: number }) => (
  <div className="board-cell">
    board cell {props.coordinatex} {props.coordinatey}
  </div>
);

export default Cell;
