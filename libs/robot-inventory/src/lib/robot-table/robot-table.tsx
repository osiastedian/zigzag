import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import { Fireplace } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';

import { red } from '@material-ui/core/colors';

import { RobotStatus } from '@zigzag/robot-factory/shared';
import './robot-table.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoadingState,
  isAllSelected,
  selectAllRobotInventory,
  isSomeSelected,
  robotInventoryActions,
} from '../robot-inventory.slice';

function LoadingRow() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton></Skeleton>
      </TableCell>
    </TableRow>
  );
}

/* eslint-disable-next-line */
export interface RobotTableProps {}

export function RobotTable(props: RobotTableProps) {
  const loadingRows = Array(5).fill(1);
  const loadingState = useSelector(getLoadingState);
  const entities = useSelector(selectAllRobotInventory);
  const allSelected = useSelector(isAllSelected);
  const someSelected = useSelector(isSomeSelected);
  const dispatch = useDispatch();

  const selectAllChange = (isSelected: boolean) => {
    const updateAllAction = robotInventoryActions.updateMany(
      entities.map((entity) => ({
        id: entity.id,
        changes: {
          selected: isSelected,
        },
      }))
    );
    dispatch(updateAllAction);
  };

  const getStatusIcon = (status: RobotStatus) => {
    switch (status) {
      case RobotStatus.ON_FIRE:
        return <Fireplace key={status} style={{ color: red[500] }}></Fireplace>;
      case RobotStatus.LOOSE_SCREWS:
        return <Fireplace key={status} style={{ color: red[500] }}></Fireplace>;
      case RobotStatus.PAINT_SCRATCHED:
        return <Fireplace key={status} style={{ color: red[500] }}></Fireplace>;
      case RobotStatus.RUSTY:
        return <Fireplace key={status} style={{ color: red[500] }}></Fireplace>;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width="20px">
              <Checkbox
                checked={allSelected}
                indeterminate={!allSelected && someSelected}
                onChange={(e, checked) => selectAllChange(checked)}
              ></Checkbox>
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right"># of Rotors</TableCell>
            <TableCell align="right">Color</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loadingState === 'loading'
            ? loadingRows.map((val, i) => <LoadingRow key={i}></LoadingRow>)
            : entities.map((robot) => (
                <TableRow key={robot.id}>
                  <TableCell>
                    <Checkbox
                      checked={robot.selected}
                      onChange={(e, checked) => {
                        dispatch(
                          robotInventoryActions.updateOne({
                            id: robot.id,
                            changes: {
                              selected: checked,
                            },
                          })
                        );
                      }}
                    ></Checkbox>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {robot.name}
                  </TableCell>
                  <TableCell align="right">
                    {robot.status.map((status) => getStatusIcon(status))}
                  </TableCell>
                  <TableCell align="right">
                    {robot.configuration.numberOfRotors}
                  </TableCell>
                  <TableCell align="right">
                    {robot.configuration.Colour}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RobotTable;
