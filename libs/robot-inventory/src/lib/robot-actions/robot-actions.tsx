import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Robot } from '@zigzag/robot-factory/shared';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  extinguishRobot,
  recycleRobots,
  selectOnFireRobots,
  selectRecyclableRobots,
} from '../robot-inventory.slice';

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
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleExtinguish = () => {
    dispatch(extinguishRobot(onFireRobots));
  };

  const handleRecycleRobots = () => {
    dispatch(recycleRobots(recyclableRobots));
  };

  return (
    <Box>
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
    </Box>
  );
}

export default RobotActions;
