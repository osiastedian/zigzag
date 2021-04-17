import axios from 'axios';
import { Robot, RobotId } from '../models';

const fetchRobots = () => {
  return axios.get<Robot[]>('/api/robots');
};

const extinguishRobot = (robotId: RobotId) =>
  axios.post<Robot>(`/api/robots/${robotId}/extinguish`);

const recycleRobots = (robotIds: RobotId[]) =>
  axios.post<Robot[]>(`/api/robots/recycle`, robotIds);

const resetRobots = () => axios.get<Robot[]>('/api/robots/reset');

export const RobotsApi = {
  fetchRobots,
  extinguishRobot,
  recycleRobots,
  resetRobots,
};

export default RobotsApi;
