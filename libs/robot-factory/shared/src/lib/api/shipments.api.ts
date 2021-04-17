import axios from 'axios';
import { Robot, RobotId } from '../models';

const createShipment = (robotIds: RobotId[]) => {
  return axios.put<{ robots: Robot[] }>('/api/shipments/create', robotIds);
};

export const ShipmentApi = {
  createShipment,
};

export default ShipmentApi;
