import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { PlusOne } from '@material-ui/icons';
import { passedQARobots } from '@zigzag/robot-inventory';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  factorySecondARobots,
  robotInventoryActions,
  RobotInventoryEntity,
} from '../robot-inventory.slice';
import { shipmentActions } from '../shipment.slice';

import './factory-seconds-robot-list.module.scss';

/* eslint-disable-next-line */
export interface FactorySecondsRobotListProps {}

export function FactorySecondsRobotList(props: FactorySecondsRobotListProps) {
  const robots = useSelector(factorySecondARobots);
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
        <Typography variant="h6">Factory Seconds</Typography>
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

export default FactorySecondsRobotList;
