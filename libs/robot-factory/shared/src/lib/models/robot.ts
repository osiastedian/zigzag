import { RobotStatus } from '../enums/robot-status.enum';
import { RobotConfiguration } from './robot-configuratoin';

export interface Robot {
  id: number;
  name: string;
  configuration: RobotConfiguration;
  status: RobotStatus[];
}
