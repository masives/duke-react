// @flow

import React, { PureComponent } from 'react';

export class Cell extends PureComponent<{ coordinatex: number, coordinatey: number, onCellClicked: Function }> {
  state: CellState = {
    color: '',
    coordinates: { x: 0, y: 0 },
    unit: ''
  };

  componentDidMount() {
    this.setCoordinates(this.props.coordinatex, this.props.coordinatey);
  }

  setCoordinates(x: number, y: number) {
    this.setState({
      coordinates: { x, y }
    });
  }

  cellClicked = () => {
    this.props.onCellClicked(this.state);
  };

  // props: { coordinatex: number, coordinatey: number, onCellClicked: Function };
  render() {
    return (
      <button className="board-cell" onClick={this.cellClicked} onKeyPress={this.cellClicked}>
        <p>
          board cell {this.props.coordinatex} {this.props.coordinatey}
        </p>
        <p>current player = {this.state.color}</p>
      </button>
    );
  }
}

export default Cell;
