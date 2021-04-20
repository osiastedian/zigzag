import './robot-inventory.module.scss';
import { Box, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRobotInventory } from './robot-inventory.slice';
import ReadyToShip from './ready-to-ship/ready-to-ship';
import RawInventory from './raw-inventory/raw-inventory';
import FactorySecondsRobotList from './factory-seconds-robot-list/factory-seconds-robot-list';
import PassedQaRobotList from './passed-qa-robot-list/passed-qa-robot-list';

/* eslint-disable-next-line */
export interface RobotInventoryProps {}

export function RobotInventory(props: RobotInventoryProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRobotInventory());
  }, [dispatch]);

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RawInventory></RawInventory>
        </Grid>
        <Grid item xs={6}>
          <FactorySecondsRobotList></FactorySecondsRobotList>
        </Grid>
        <Grid item xs={6}>
          <PassedQaRobotList></PassedQaRobotList>
        </Grid>
        <Grid item xs={6}>
          <ReadyToShip></ReadyToShip>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RobotInventory;
