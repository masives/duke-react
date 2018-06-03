// @flow

import InitialSetupHandler from '../initial-setup-handler';
import emptyBoard from './test-helpers/board-empty.json';

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
  const result = initialSetupHandler.handleInitialSetup(invalidTargetCell, 'white', emptyBoard); // one argument is missing here

  expect(result.message).toBe('wrong row - please choose the top row');
});
