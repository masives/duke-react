// @flow

import React, { Component } from 'react';

type CellProps = {
  key: string,
  onCellClicked: Function,
  cellState: CellState
};
export class Cell extends Component<CellProps, null> {
  cellClicked = () => {
    this.props.onCellClicked(this.state);
  };

  props: {
    cellState: {
      color: string,
      coordinates: Object & { x: number, y: number },
      unitType: string,
      polarity: string,
      selected: boolean
    },
    key: string,
    onCellClicked: Function
  };

  render() {
    return (
      <button className="board-cell" onClick={this.cellClicked} onKeyPress={this.cellClicked} key={this.props.key}>
        <p>
          board cell x - {this.props.cellState.coordinates.x} y - {this.props.cellState.coordinates.y}
        </p>
        <p>current player = {this.props.cellState.color}</p>
      </button>
    );
  }
}

export default Cell;
