import {
  fetchShipment,
  shipmentAdapter,
  shipmentReducer,
} from './shipment.slice';

describe('shipment reducer', () => {
  it('should handle initial state', () => {
    const expected = shipmentAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(shipmentReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchShipments', () => {
    let state = shipmentReducer(undefined, fetchShipment.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = shipmentReducer(
      state,
      fetchShipment.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = shipmentReducer(
      state,
      fetchShipment.rejected(new Error('Uh oh'), null, null)
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
