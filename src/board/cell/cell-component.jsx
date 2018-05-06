// @flow

import React, { Component } from 'react';

type CellProps = {
  onCellClicked: Function,
  cellState: CellState
};
export class Cell extends Component<CellProps, null> {
  cellClicked = () => {
    this.props.onCellClicked(this.props.cellState.coordinates);
  };

  props: {
    cellState: {
      color: string,
      coordinates: Object & { x: number, y: number },
      unitType: string,
      polarity: string,
      selected: boolean
    },
    onCellClicked: Function
  };

  render() {
    return (
      <button className="board-cell" onClick={this.cellClicked} onKeyPress={this.cellClicked}>
        <p>row - {this.props.cellState.coordinates.x}</p>
        <p>col - {this.props.cellState.coordinates.y}</p>
        <p>unit - {this.props.cellState.unitType}</p>
        <p>current player = {this.props.cellState.color}</p>
      </button>
    );
  }
}

export default Cell;
