import { Injectable } from '@nestjs/common';
import { RobotId } from '@zigzag/robot-factory/shared';
import { RobotsService } from '../robots/robots.service';

@Injectable()
export class ShipmentService {
  constructor(private robotsService: RobotsService) {}

  createShipment(robotIds: RobotId[]) {
    const robots = robotIds.map((robotId) =>
      this.robotsService.deleteRobotById(robotId)
    );
    return {
      robots,
    };
  }
}
