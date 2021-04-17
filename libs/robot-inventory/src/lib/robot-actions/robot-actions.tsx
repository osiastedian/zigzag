import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Robot } from '@zigzag/robot-factory/shared';
import React from 'react';

import './robot-actions.module.scss';

const useStyles = makeStyles({
  'ml-3': {
    marginLeft: '1rem',
  },
});

/* eslint-disable-next-line */
export interface RobotActionsProps {
  selected: Robot[];
}

export function RobotActions(props: RobotActionsProps) {
  const styles = useStyles();
  return (
    <Box>
      <Button variant="contained" color="secondary">
        Extinguish
      </Button>
      <Button variant="contained" color="primary" className={styles['ml-3']}>
        Recycle
      </Button>
    </Box>
  );
}

export default RobotActions;
