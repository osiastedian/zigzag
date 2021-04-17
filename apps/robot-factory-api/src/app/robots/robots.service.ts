import { Injectable, NotFoundException } from '@nestjs/common';
import { Robot, RobotId, RobotStatus } from '@zigzag/robot-factory/shared';

@Injectable()
export class RobotsService {
  robots: Robot[] = [];

  getRobots(): Robot[] {
    return this.robots;
  }

  reset(): void {
    this.robots = [
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
      },
      {
        id: 3,
        configuration: {
          hasWheels: true,
          Colour: 'blue',
          hasSentence: true,
          hasTracks: true,
          numberOfRotors: 3,
        },
        name: 'Robot 3',
        status: [RobotStatus.ON_FIRE],
      },
    ];
  }

  deleteRobotById(robotId: RobotId): Robot {
    const index = this.robots.findIndex((robot) => robot.id === robotId);
    if (index === -1) {
      throw new NotFoundException(`Robot not found: ${robotId}`);
    }
    return this.robots.splice(index, 1)[0];
  }

  extinguishRobotById(robotId: RobotId): boolean {
    this.deleteRobotById(robotId);
    return true;
  }

  recycleRobots(robotIds: RobotId[]): Robot[] {
    return robotIds.map((robotId) => this.deleteRobotById(robotId));
  }
}
