import { Injectable, NotFoundException } from '@nestjs/common';
import { Robot, RobotId, RobotStatus } from '@zigzag/robot-factory/shared';
import { dummyRobots } from './dummy-robots';

@Injectable()
export class RobotsService {
  robots: Robot[] = [];

  getRobots(): Robot[] {
    return this.robots;
  }

  reset(): void {
    this.robots = dummyRobots();
  }

  findRobotById(robotId: RobotId): Robot {
    return this.robots.find((robot) => robot.id === robotId);
  }

  deleteRobotById(robotId: RobotId): Robot {
    const index = this.robots.findIndex((robot) => robot.id === robotId);
    if (index === -1) {
      throw new NotFoundException(`Robot not found: ${robotId}`);
    }
    return this.robots.splice(index, 1)[0];
  }

  extinguishRobotById(robotId: RobotId): Robot {
    const robot = this.findRobotById(robotId);
    if (!robot) {
      throw new NotFoundException(robotId);
    }
    robot.status = robot.status.filter(
      (status) => status !== RobotStatus.ON_FIRE
    );
    return robot;
  }

  recycleRobots(robotIds: RobotId[]): Robot[] {
    return robotIds.map((robotId) => this.deleteRobotById(robotId));
  }
}
