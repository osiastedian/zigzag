import React from 'react';

import './robot-inventory.module.scss';
import { Button, Box, Typography } from '@material-ui/core';

/* eslint-disable-next-line */
export interface RobotInventoryProps {}

export function RobotInventory(props: RobotInventoryProps) {
  return (
    <Box>
      <Typography variant="h1" component="h2">Welcome to robot-inventory!</Typography>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </Box>
  );
}

export default RobotInventory;
