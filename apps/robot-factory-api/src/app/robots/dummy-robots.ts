import { Robot, RobotStatus } from '@zigzag/robot-factory/shared';

export const dummyRobots = (): Robot[] => [
  {
    id: 1,
    configuration: {
      hasWheels: true,
      Colour: 'red',
      hasSentience: false,
      hasTracks: false,
      numberOfRotors: 5,
    },
    name: 'Robot 1',
    status: [RobotStatus.ON_FIRE],
  },
  {
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
  },
  {
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
  },
  {
    id: 4,
    configuration: {
      hasWheels: true,
      Colour: 'blue',
      hasSentience: false,
      hasTracks: true,
      numberOfRotors: 5,
    },
    name: 'Robot 4',
    status: [RobotStatus.LOOSE_SCREWS],
  },
  {
    id: 5,
    configuration: {
      hasWheels: true,
      Colour: 'red',
      hasSentience: false,
      hasTracks: true,
      numberOfRotors: 5,
    },
    name: 'Robot 5',
    status: [RobotStatus.LOOSE_SCREWS],
  },
  {
    id: 6,
    configuration: {
      hasWheels: true,
      Colour: 'red',
      hasSentience: false,
      hasTracks: false,
      numberOfRotors: 5,
    },
    name: 'Robot 6',
    status: [RobotStatus.RUSTY],
  },
  {
    id: 7,
    configuration: {
      hasWheels: false,
      Colour: 'red',
      hasSentience: true,
      hasTracks: false,
      numberOfRotors: 5,
    },
    name: 'Robot 7',
    status: [RobotStatus.LOOSE_SCREWS],
  },
  {
    id: 8,
    configuration: {
      hasWheels: false,
      Colour: 'red',
      hasSentience: false,
      hasTracks: false,
      numberOfRotors: 5,
    },
    name: 'Robot 8',
    status: [RobotStatus.ON_FIRE],
  },
  {
    id: 9,
    configuration: {
      hasWheels: false,
      Colour: 'red',
      hasSentience: false,
      hasTracks: false,
      numberOfRotors: 5,
    },
    name: 'Robot 9',
    status: [RobotStatus.LOOSE_SCREWS],
  },
];
