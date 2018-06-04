// @flow

import InitialSetupHandler from '../initial-setup-handler';
import emptyBoard from './test-helpers/board/board-empty.json';
import emptyDukeCoordinates from './test-helpers/duke-coordinates/empty.json';
import PLAYER_COLOR from '../enums/player-color';

test('Should initialize correctly', () => {
  const initialSetupHandler = new InitialSetupHandler();

  expect(initialSetupHandler.initialSetupState).toEqual(
    expect.objectContaining({
      white: expect.objectContaining({
        dukeDrawn: false,
        footmanDrawn: 0
      }),
      black: expect.objectContaining({
        dukeDrawn: false,
        footmanDrawn: 0
      })
    })
  );
});

test('Should return error message when trying to set in wrong row', () => {
  const initialSetupHandler = new InitialSetupHandler();
  const invalidTargetCell: CellState = {
    coordinates: {
      row: 1,
      col: 2
    },
    color: '',
    unitType: '',
    startingSide: true,
    state: ''
  };
  const result = initialSetupHandler.handleInitialSetup(
    invalidTargetCell,
    PLAYER_COLOR.WHITE,
    emptyBoard,
    emptyDukeCoordinates
  ); // one argument is missing here

  expect(result.message).toBe('wrong row - please choose the top row');
});

test("Should return board with duke and update it's coordinates[WHITE]", () => {
  // given
  const initialSetupHandler = new InitialSetupHandler();
  const currentPlayer = PLAYER_COLOR.WHITE;
  const validWhiteDukeTargetCell: CellState = {
    coordinates: {
      row: 0,
      col: 2
    },
    color: '',
    unitType: '',
    startingSide: true,
    state: ''
  };

  // when
  const result = initialSetupHandler.handleInitialSetup(
    validWhiteDukeTargetCell,
    currentPlayer,
    emptyBoard,
    emptyDukeCoordinates
  );

  // then
  expect(result.board[validWhiteDukeTargetCell.coordinates.row][validWhiteDukeTargetCell.coordinates.col]).toEqual(
    expect.objectContaining({
      color: currentPlayer,
      unitType: 'duke'
    })
  );
  expect(result.dukeCoordinates).toEqual(
    expect.objectContaining({
      white: expect.objectContaining({
        row: validWhiteDukeTargetCell.coordinates.row,
        col: validWhiteDukeTargetCell.coordinates.col
      })
    })
  );
});

test("Should return board with duke and update it's coordinates[BLACK]", () => {
  // given
  const initialSetupHandler = new InitialSetupHandler();
  initialSetupHandler.initialSetupState = {
    white: {
      dukeDrawn: true,
      footmanDrawn: 2
    },
    black: {
      dukeDrawn: false,
      footmanDrawn: 0
    }
  };
  const currentPlayer = PLAYER_COLOR.BLACK;
  const validBlackDukeTargetCell: CellState = {
    coordinates: {
      row: 5,
      col: 2
    },
    color: '',
    unitType: '',
    startingSide: true,
    state: ''
  };

  // when
  const result = initialSetupHandler.handleInitialSetup(
    validBlackDukeTargetCell,
    currentPlayer,
    emptyBoard,
    emptyDukeCoordinates
  );

  // then
  expect(result.board[validBlackDukeTargetCell.coordinates.row][validBlackDukeTargetCell.coordinates.col]).toEqual(
    expect.objectContaining({
      color: currentPlayer,
      unitType: 'duke'
    })
  );
  expect(result.dukeCoordinates).toEqual(
    expect.objectContaining({
      black: expect.objectContaining({
        row: validBlackDukeTargetCell.coordinates.row,
        col: validBlackDukeTargetCell.coordinates.col
      })
    })
  );
});
