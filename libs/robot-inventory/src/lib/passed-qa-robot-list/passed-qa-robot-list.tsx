import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
} from '@material-ui/core';
import { PlusOne } from '@material-ui/icons';
import { Robot } from '@zigzag/robot-factory/shared';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  passedQARobots,
  robotInventoryActions,
  RobotInventoryEntity,
} from '../robot-inventory.slice';
import { shipmentActions } from '../shipment.slice';

import './passed-qa-robot-list.module.scss';

/* eslint-disable-next-line */
export interface PassedQaRobotListProps {}

export function PassedQaRobotList(props: PassedQaRobotListProps) {
  const robots = useSelector(passedQARobots);
  const dispatch = useDispatch();

  const handleAddToShipment = (robot: RobotInventoryEntity) => {
    dispatch(
      shipmentActions.add({
        id: robot.id,
        robot,
      })
    );
    dispatch(robotInventoryActions.remove(robot.id));
  };

  return (
    <Paper>
      <Box p={3}>
        <Typography variant="h6">Passed QA</Typography>
        <List dense={true}>
          {robots.map((robot) => (
            <ListItem key={robot.id}>
              <ListItemText primary={robot.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="Ready for Shipment"
                  onClick={() => handleAddToShipment(robot)}
                >
                  <PlusOne />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}

export default PassedQaRobotList;
