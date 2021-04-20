import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Robot, ShipmentApi } from '@zigzag/robot-factory/shared';
import { RobotInventoryEntity } from './robot-inventory.slice';

export const SHIPMENT_FEATURE_KEY = 'shipment';

/*
 * Update these interfaces according to your requirements.
 */
export interface ShipmentEntity {
  id: number;
  robot: RobotInventoryEntity;
}

export interface ShipmentState extends EntityState<ShipmentEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const shipmentAdapter = createEntityAdapter<ShipmentEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchShipment())
 * }, [dispatch]);
 * ```
 */
export const createShipment = createAsyncThunk(
  'shipment/createShipment',
  async (robots: Robot[], thunkAPI) => {
    await ShipmentApi.createShipment(robots.map((robot) => robot.id));
    return [];
  }
);

export const initialShipmentState: ShipmentState = shipmentAdapter.getInitialState(
  {
    loadingStatus: 'not loaded',
    error: null,
  }
);

export const shipmentSlice = createSlice({
  name: SHIPMENT_FEATURE_KEY,
  initialState: initialShipmentState,
  reducers: {
    add: shipmentAdapter.addOne,
    remove: shipmentAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(createShipment.pending, (state: ShipmentState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        createShipment.fulfilled,
        (state: ShipmentState, action: PayloadAction<ShipmentEntity[]>) => {
          shipmentAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(createShipment.rejected, (state: ShipmentState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const shipmentReducer = shipmentSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(shipmentActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const shipmentActions = {
  ...shipmentSlice.actions,
};

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllShipment);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = shipmentAdapter.getSelectors();

export const getShipmentState = (rootState: unknown): ShipmentState =>
  rootState[SHIPMENT_FEATURE_KEY];

export const selectAllShipment = createSelector(getShipmentState, selectAll);

export const selectShipmentEntities = createSelector(
  getShipmentState,
  selectEntities
);
