import './robot-inventory.module.scss';
import { Box, Paper } from '@material-ui/core';
import RobotTable from './robot-table/robot-table';
import RobotActions from './robot-actions/robot-actions';
import { Robot, RobotStatus } from '@zigzag/robot-factory/shared';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface RobotInventoryProps {}

const testRobots: Robot[] = [
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
    status: [RobotStatus.LOOSE_SCREWS, RobotStatus.PAINT_SCRATCHED],
  },
];

export function RobotInventory(props: RobotInventoryProps) {
  const [selectedRobotIds, setSelectedRobotIds] = useState<number[]>([]);

  return (
    <Box p={3}>
      <Box pb={3}>
        <RobotActions
          selected={selectedRobotIds.map((id) =>
            testRobots.find((robot) => robot.id === id)
          )}
        ></RobotActions>
      </Box>
      <Paper>
        <RobotTable
          robots={testRobots}
          onSelectionChange={(ids) => setSelectedRobotIds(ids)}
        ></RobotTable>
      </Paper>
    </Box>
  );
}

export default RobotInventory;
