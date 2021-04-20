import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Restore } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  extinguishRobot,
  recycleRobots,
  resetRobots,
  selectedEntities,
  selectOnFireRobots,
  selectRecyclableRobots,
} from '../robot-inventory.slice';
import { createShipment } from '../shipment.slice';

import './robot-actions.module.scss';

const useStyles = makeStyles({
  'ml-3': {
    marginLeft: '1rem',
  },
});

/* eslint-disable-next-line */
export interface RobotActionsProps {}

export function RobotActions(props: RobotActionsProps) {
  const onFireRobots = useSelector(selectOnFireRobots);
  const recyclableRobots = useSelector(selectRecyclableRobots);
  const selectedRobots = useSelector(selectedEntities);
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleExtinguish = () => {
    dispatch(extinguishRobot(onFireRobots));
  };

  const handleRecycleRobots = () => {
    dispatch(recycleRobots(recyclableRobots));
  };

  const handleResetRobots = () => {
    dispatch(resetRobots());
  };

  return (
    <Box display="flex">
      <Button
        variant="contained"
        color="secondary"
        disabled={onFireRobots.length === 0}
        onClick={handleExtinguish}
      >
        Extinguish
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={styles['ml-3']}
        disabled={recyclableRobots.length === 0}
        onClick={handleRecycleRobots}
      >
        Recycle
      </Button>
      <Box ml={'auto'}>
        <Button
          onClick={handleResetRobots}
          variant="contained"
          color="secondary"
          startIcon={<Restore />}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
}

export default RobotActions;
