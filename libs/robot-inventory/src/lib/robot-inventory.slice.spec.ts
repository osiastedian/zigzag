import { RobotStatus } from '@zigzag/robot-factory/shared';
import {
  fetchRobotInventory,
  isRecyclable,
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

  describe('isRecyclable', () => {
    it('has fewer than 3 rotor', () => {
      expect(
        isRecyclable({
          id: 2,
          configuration: {
            hasWheels: true,
            Colour: 'blue',
            hasSentience: false,
            hasTracks: true,
            numberOfRotors: 1,
          },
          name: 'Robot 2',
          status: [RobotStatus.LOOSE_SCREWS],
        })
      ).toBe(true);
    });

    it('has fewer than 8 rotor', () => {
      expect(
        isRecyclable({
          id: 3,
          configuration: {
            hasWheels: true,
            Colour: 'blue',
            hasSentience: false,
            hasTracks: true,
            numberOfRotors: 10,
          },
          name: 'Robot 3',
          status: [RobotStatus.LOOSE_SCREWS],
        })
      ).toBe(true);
    });

    it('has any number of rotors and blue in colour', () => {
      expect(
        isRecyclable({
          id: 4,
          configuration: {
            hasWheels: true,
            Colour: 'blue',
            hasSentience: false,
            hasTracks: true,
            numberOfRotors: 5,
          },
          name: 'Robot 3',
          status: [RobotStatus.LOOSE_SCREWS],
        })
      ).toBe(true);
    });

    it('has both wheels and tracks', () => {
      expect(
        isRecyclable({
          id: 5,
          configuration: {
            hasWheels: true,
            Colour: 'red',
            hasSentience: false,
            hasTracks: true,
            numberOfRotors: 5,
          },
          name: 'Robot 3',
          status: [RobotStatus.LOOSE_SCREWS],
        })
      ).toBe(true);
    });

    it('has wheels and is rusty', () => {
      expect(
        isRecyclable({
          id: 6,
          configuration: {
            hasWheels: true,
            Colour: 'red',
            hasSentience: false,
            hasTracks: false,
            numberOfRotors: 5,
          },
          name: 'Robot 3',
          status: [RobotStatus.RUSTY],
        })
      ).toBe(true);
    });

    it('is sentient and has screws loose', () => {
      expect(
        isRecyclable({
          id: 7,
          configuration: {
            hasWheels: false,
            Colour: 'red',
            hasSentience: true,
            hasTracks: false,
            numberOfRotors: 5,
          },
          name: 'Robot 3',
          status: [RobotStatus.LOOSE_SCREWS],
        })
      ).toBe(true);
    });

    it('is on fire', () => {
      expect(
        isRecyclable({
          id: 8,
          configuration: {
            hasWheels: false,
            Colour: 'red',
            hasSentience: false,
            hasTracks: false,
            numberOfRotors: 5,
          },
          name: 'Robot 3',
          status: [RobotStatus.ON_FIRE],
        })
      ).toBe(true);
    });

    it('should not be recyclable ', () => {
      expect(
        isRecyclable({
          id: 9,
          configuration: {
            hasWheels: false,
            Colour: 'red',
            hasSentience: false,
            hasTracks: false,
            numberOfRotors: 5,
          },
          name: 'Robot 3',
          status: [RobotStatus.LOOSE_SCREWS],
        })
      ).toBe(false);
    });
  });
});
