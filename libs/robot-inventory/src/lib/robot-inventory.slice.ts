import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Robot, RobotStatus } from '@zigzag/robot-factory/shared';

export const ROBOT_INVENTORY_FEATURE_KEY = 'robotInventory';

/*
 * Update these interfaces according to your requirements.
 */
export interface RobotInventoryEntity extends Robot {
  id: number;
  selected: boolean;
}

export interface RobotInventoryState extends EntityState<RobotInventoryEntity> {
  loadingStatus:
    | 'not loaded'
    | 'loading'
    | 'loaded'
    | 'error'
    | 'extinguishing'
    | 'recycling';
  error: string;
}

export const robotInventoryAdapter = createEntityAdapter<RobotInventoryEntity>();

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
 *   dispatch(fetchRobotInventory())
 * }, [dispatch]);
 * ```
 */
export const fetchRobotInventory = createAsyncThunk(
  'robotInventory/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getRobotInventorys()`;
     * Right now we just return an empty array.
     */
    const testRobots: RobotInventoryEntity[] = [
      {
        id: 1,
        configuration: {
          hasWheels: true,
          Colour: 'red',
          hasSentence: false,
          hasTracks: true,
          numberOfRotors: 5,
        },
        name: 'Robot 1',
        status: [RobotStatus.ON_FIRE],
        selected: false,
      },
      {
        id: 2,
        configuration: {
          hasWheels: true,
          Colour: 'blue',
          hasSentence: false,
          hasTracks: true,
          numberOfRotors: 1,
        },
        name: 'Robot 2',
        status: [RobotStatus.LOOSE_SCREWS],
        selected: false,
      },
    ];
    return Promise.resolve(testRobots);
  }
);

export const extinguishRobot = createAsyncThunk(
  'robotInventory/extinguishRobot',
  async (robots: RobotInventoryEntity[], { dispatch }) => {
    const data = await Promise.resolve('');
    dispatch(fetchRobotInventory());
    return data;
  }
);

export const recycleRobots = createAsyncThunk(
  'robotInventory/recycleRobot',
  async (robots: RobotInventoryEntity[], { dispatch }) => {
    const data = await Promise.resolve('');
    dispatch(fetchRobotInventory());
    return data;
  }
);

export const initialRobotInventoryState: RobotInventoryState = robotInventoryAdapter.getInitialState(
  {
    loadingStatus: 'not loaded',
    error: null,
  }
);

export const robotInventorySlice = createSlice({
  name: ROBOT_INVENTORY_FEATURE_KEY,
  initialState: initialRobotInventoryState,
  reducers: {
    add: robotInventoryAdapter.addOne,
    remove: robotInventoryAdapter.removeOne,
    updateOne: robotInventoryAdapter.updateOne,
    updateMany: robotInventoryAdapter.updateMany,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRobotInventory.pending, (state: RobotInventoryState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchRobotInventory.fulfilled,
        (
          state: RobotInventoryState,
          action: PayloadAction<RobotInventoryEntity[]>
        ) => {
          robotInventoryAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchRobotInventory.rejected,
        (state: RobotInventoryState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message;
        }
      )
      .addCase(extinguishRobot.pending, (state) => {
        state.loadingStatus = 'extinguishing';
      })
      .addCase(
        extinguishRobot.rejected,
        (state: RobotInventoryState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message;
        }
      )
      .addCase(recycleRobots.pending, (state) => {
        state.loadingStatus = 'recycling';
      })
      .addCase(recycleRobots.rejected, (state: RobotInventoryState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const robotInventoryReducer = robotInventorySlice.reducer;

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
 *   dispatch(robotInventoryActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const robotInventoryActions = robotInventorySlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllRobotInventory);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = robotInventoryAdapter.getSelectors();

export const getRobotInventoryState = (
  rootState: unknown
): RobotInventoryState => rootState[ROBOT_INVENTORY_FEATURE_KEY];

export const selectAllRobotInventory = createSelector(
  getRobotInventoryState,
  selectAll
);

export const selectRobotInventoryEntities = createSelector(
  getRobotInventoryState,
  selectEntities
);

export const selectedEntities = createSelector(
  selectAllRobotInventory,
  (entities) => entities.filter((entity) => entity.selected)
);

export const selectOnFireRobots = createSelector(selectedEntities, (entities) =>
  entities.filter((entity) =>
    entity.status.some((status) => status === RobotStatus.ON_FIRE)
  )
);

export const selectRecyclableRobots = createSelector(
  selectedEntities,
  (entities) =>
    entities.filter((entity) =>
      entity.status.some((status) => status === RobotStatus.LOOSE_SCREWS)
    )
);

export const getLoadingState = createSelector(
  getRobotInventoryState,
  (state) => state.loadingStatus
);

export const isAllSelected = createSelector(
  selectAllRobotInventory,
  (robots) => robots.length > 0 && robots.every((robot) => robot.selected)
);

export const isSomeSelected = createSelector(
  selectAllRobotInventory,
  (robots) => robots.some((robot) => robot.selected)
);