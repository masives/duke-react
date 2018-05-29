// @flow
/* eslint-disable import/prefer-default-export */

export const isInBounds = (coordinates: Coordinates) =>
  coordinates.row >= 0 && coordinates.row < 6 && coordinates.col >= 0 && coordinates.col < 6;
