// @flow

import React, { Component } from 'react';

export class Cell extends Component {
  state = {
    color: 'white',
    coordinates: {
      x: this.props.coordinatex,
      y: this.props.coordinatey
    }
  };

  componentWillMount() {
    this.setCoordinates(this.props.coordinatex, this.props.coordinatey);
  }

  setCoordinates(x, y) {
    this.setState({
      coordinates: {
        x,
        y
      }
    });
  }

  props: { coordinatex: number, coordinatey: number, onCellClicked: Function };
  render() {
    return (
      <div className="board-cell">
        <p>
          board cell {this.props.coordinatex} {this.props.coordinatey}
        </p>
        <p>current player = {this.state.color}</p>
        <input
          type="text"
          onClick={() => {
            console.log(`current x ${this.props.onCellClicked(this.state.coordinates)}`);
          }}
        />
      </div>
    );
  }
}

// const Cell = (props: { coordinatex: number, coordinatey: number }) => (
//
// );

export default Cell;
