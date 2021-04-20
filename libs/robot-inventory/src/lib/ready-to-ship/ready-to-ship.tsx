import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Undo } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { robotInventoryActions } from '../robot-inventory.slice';
import {
  createShipment,
  shipmentActions,
  ShipmentEntity,
} from '../shipment.slice';

import { selectAllShipment } from '../shipment.slice';

import './ready-to-ship.module.scss';

/* eslint-disable-next-line */
export interface ReadyToShipProps {}

export function ReadyToShip(props: ReadyToShipProps) {
  // const readyToShipRobots = ;
  const readyToShipRobots = useSelector(selectAllShipment);
  const dispatch = useDispatch();
  const handleCreateShipment = () => {
    dispatch(createShipment(readyToShipRobots.map((e) => e.robot)));
  };

  const handleRevertShipment = (entity: ShipmentEntity) => {
    dispatch(robotInventoryActions.add(entity.robot));
    dispatch(shipmentActions.remove(entity.id));
  };

  return (
    <Box>
      <Typography variant="h6">Shipping List</Typography>
      <Box mb={3}>
        <Button
          variant="outlined"
          color="primary"
          disabled={readyToShipRobots.length === 0}
          onClick={handleCreateShipment}
        >
          Send Shipment
        </Button>
      </Box>
      <List dense={true}>
        {readyToShipRobots.map((e) => (
          <ListItem key={e.id}>
            <ListItemText primary={e.robot.name} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="Ready for Shipment"
                onClick={() => handleRevertShipment(e)}
              >
                <Undo />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ReadyToShip;
