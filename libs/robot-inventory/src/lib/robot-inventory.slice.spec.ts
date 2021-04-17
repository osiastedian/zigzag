import {
  fetchRobotInventory,
  robotInventoryAdapter,
  robotInventoryReducer,
} from './robot-inventory.slice';

describe('robotInventory reducer', () => {
  it('should handle initial state', () => {
    const expected = robotInventoryAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(robotInventoryReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchRobotInventorys', () => {
    let state = robotInventoryReducer(
      undefined,
      fetchRobotInventory.pending(null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = robotInventoryReducer(
      state,
      fetchRobotInventory.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = robotInventoryReducer(
      state,
      fetchRobotInventory.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
