import './robot-inventory.module.scss';
import { Box, Paper } from '@material-ui/core';
import RobotTable from './robot-table/robot-table';
import RobotActions from './robot-actions/robot-actions';
import { Robot, RobotStatus } from '@zigzag/robot-factory/shared';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRobotInventory,
  selectAllRobotInventory,
} from './robot-inventory.slice';

/* eslint-disable-next-line */
export interface RobotInventoryProps {}

export function RobotInventory(props: RobotInventoryProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRobotInventory());
  }, [dispatch]);

  return (
    <Box p={3}>
      <Box pb={3}>
        <RobotActions></RobotActions>
      </Box>
      <Paper>
        <RobotTable></RobotTable>
      </Paper>
    </Box>
  );
}

export default RobotInventory;
