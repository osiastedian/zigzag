import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';
import RobotActions from '../robot-actions/robot-actions';
import RecyclableRobotTable from '../robot-table/robot-table';

import './raw-inventory.module.scss';

/* eslint-disable-next-line */
export interface RawInventoryProps {}

export function RawInventory(props: RawInventoryProps) {
  return (
    <Box>
      <Typography variant="h6">Raw Inventory</Typography>
      <Box pb={3}>
        <RobotActions></RobotActions>
      </Box>
      <Box mb={3}>
        <Paper>
          <RecyclableRobotTable></RecyclableRobotTable>
        </Paper>
      </Box>
    </Box>
  );
}

export default RawInventory;
