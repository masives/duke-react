// @flow

import InitialSetupHandler from '../initial-setup-handler';
import PLAYER_COLOR from '../enums/player-color';
import emptyBoard from './test-helpers/board/board-empty.json';
import boardAfterWhiteDukeSetup from './test-helpers/board/board-after-white-duke-setup.json';
import DukeCoordinatesEmpty from './test-helpers/duke-coordinates/empty.json';
import dukeCoordinatesAfterInitialSetup from './test-helpers/duke-coordinates/dukeCoordinatesInitialRows.json';
import initialSetupStateAfterWhiteSetup from './test-helpers/initial-setup-state/afterWhiteSetup.json';
import initialSetupStateAfterWhiteDukeSetup from './test-helpers/initial-setup-state/afterWhiteDukeSetup.json';
import initialSetupStateAfterFirstWhiteKnight from './test-helpers/initial-setup-state/afterWhiteFirstWhiteKnight.json';
import CELL_STATUS from '../enums/cell-status';

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
    DukeCoordinatesEmpty
  );

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
    DukeCoordinatesEmpty
  );

  // then
  // update duke cell
  expect(result.board[validWhiteDukeTargetCell.coordinates.row][validWhiteDukeTargetCell.coordinates.col]).toEqual(
    expect.objectContaining({
      color: currentPlayer,
      unitType: 'duke'
    })
  );
  // update duke coordinates
  expect(result.dukeCoordinates).toEqual(
    expect.objectContaining({
      white: expect.objectContaining({
        row: validWhiteDukeTargetCell.coordinates.row,
        col: validWhiteDukeTargetCell.coordinates.col
      })
    })
  );
  // update initialSetupState
  expect(initialSetupHandler.initialSetupState[currentPlayer].dukeDrawn).toEqual(true);
  // update show where knight should be
  expect(result.board).toMatchSnapshot();
});

test("Should return board with duke and update it's coordinates[BLACK]", () => {
  // given
  const initialSetupHandler = new InitialSetupHandler();
  initialSetupHandler.initialSetupState = initialSetupStateAfterWhiteSetup;
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
    DukeCoordinatesEmpty
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
  expect(initialSetupHandler.initialSetupState[currentPlayer].dukeDrawn).toEqual(true);
});

test('should return board with first knight [white]', () => {
  const initialSetupHandler = new InitialSetupHandler();
  initialSetupHandler.initialSetupState = initialSetupStateAfterWhiteDukeSetup;
  const currentPlayer = PLAYER_COLOR.WHITE;
  const validWhiteKnightTargetCell: CellState = {
    coordinates: {
      row: 0,
      col: 1
    },
    color: '',
    unitType: '',
    startingSide: true,
    state: CELL_STATUS.TARGETED_DRAW
  };

  const result = initialSetupHandler.handleInitialSetup(
    validWhiteKnightTargetCell,
    currentPlayer,
    boardAfterWhiteDukeSetup,
    dukeCoordinatesAfterInitialSetup
  );
  expect(result.board[validWhiteKnightTargetCell.coordinates.row][validWhiteKnightTargetCell.coordinates.col]).toEqual(
    expect.objectContaining({
      color: currentPlayer,
      unitType: 'footman'
    })
  );
  expect(initialSetupHandler.initialSetupState[currentPlayer].footmanDrawn).toEqual(1);
});

test('should return board with second knight [white]', () => {
  const initialSetupHandler = new InitialSetupHandler();
  initialSetupHandler.initialSetupState = initialSetupStateAfterFirstWhiteKnight;
  const currentPlayer = PLAYER_COLOR.WHITE;
  const validWhiteKnightTargetCell: CellState = {
    coordinates: {
      row: 0,
      col: 3
    },
    color: '',
    unitType: '',
    startingSide: true,
    state: CELL_STATUS.TARGETED_DRAW
  };

  const result = initialSetupHandler.handleInitialSetup(
    validWhiteKnightTargetCell,
    currentPlayer,
    boardAfterWhiteDukeSetup,
    dukeCoordinatesAfterInitialSetup
  );
  expect(result.board[validWhiteKnightTargetCell.coordinates.row][validWhiteKnightTargetCell.coordinates.col]).toEqual(
    expect.objectContaining({
      color: currentPlayer,
      unitType: 'footman'
    })
  );
  expect(initialSetupHandler.initialSetupState[currentPlayer].footmanDrawn).toEqual(2);
  expect(result.currentPlayer).toEqual('black');
});
