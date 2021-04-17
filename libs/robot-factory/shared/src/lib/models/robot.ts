import { RobotStatus } from '../enums/robot-status.enum';
import { RobotConfiguration } from './robot-configuratoin';

export type RobotId = number;
export interface Robot {
  id: RobotId;
  name: string;
  configuration: RobotConfiguration;
  status: RobotStatus[];
}
