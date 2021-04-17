import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Robot, RobotId } from '@zigzag/robot-factory/shared';
import { RobotsService } from './robots.service';

@Controller('robots')
export class RobotsController {
  constructor(private robotsService: RobotsService) {}

  @Get('/')
  getRobots(): Robot[] {
    return this.robotsService.getRobots();
  }

  @Get('/reset')
  resetRobots(): void {
    return this.robotsService.reset();
  }

  @Post(':id/extinguish')
  extinguishRobot(@Param('id') robotId: RobotId) {
    const success = this.robotsService.extinguishRobotById(+robotId);
    return {
      robotId,
      success,
    };
  }

  @Post('recycle')
  recycleRobots(@Body() robotIds: RobotId[]): Robot[] {
    return this.robotsService.recycleRobots(robotIds);
  }
}
