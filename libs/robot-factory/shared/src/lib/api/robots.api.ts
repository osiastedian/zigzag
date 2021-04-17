import axios from 'axios';
import { Robot, RobotId } from '../models';

const fetchRobots = () => {
  return axios.get<Robot[]>('/api/robots');
};

const extinguishRobot = (robotId: RobotId) =>
  axios.post<RobotId>(`/api/robots/${robotId}/extinguish`);

const recycleRobots = (robotIds: RobotId[]) =>
  axios.post<RobotId>(`/api/robots/recycle`, robotIds);

export const RobotsApi = {
  fetchRobots,
  extinguishRobot,
  recycleRobots,
};

export default RobotsApi;
