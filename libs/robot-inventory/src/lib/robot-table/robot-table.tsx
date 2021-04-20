import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core';

import {
  Fireplace,
  FormatPaint,
  Settings,
  PlusOne,
  Check,
  Close,
} from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';

import { red, brown, cyan, amber, green } from '@material-ui/core/colors';

import { RobotStatus } from '@zigzag/robot-factory/shared';
import './robot-table.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoadingState,
  isAllSelected,
  isSomeSelected,
  robotInventoryActions,
  recyclableRobots,
} from '../robot-inventory.slice';

function LoadingRow() {
  const cols = Array(8).fill(1);
  return (
    <TableRow>
      {cols.map((v, i) => (
        <TableCell key={i}>
          <Skeleton></Skeleton>
        </TableCell>
      ))}
    </TableRow>
  );
}

function BooleanIcon(props: { value: boolean }) {
  return props.value ? (
    <Check htmlColor={green[500]} />
  ) : (
    <Close htmlColor={red[500]} />
  );
}

/* eslint-disable-next-line */
export interface RobotTableProps {}

export function RecyclableRobotTable(props: RobotTableProps) {
  const loadingRows = Array(5).fill(1);
  const loadingState = useSelector(getLoadingState);
  const entities = useSelector(recyclableRobots);
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
        return <Settings key={status} style={{ color: cyan[500] }}></Settings>;
      case RobotStatus.PAINT_SCRATCHED:
        return (
          <FormatPaint key={status} style={{ color: amber[500] }}></FormatPaint>
        );
      case RobotStatus.RUSTY:
        return (
          <Fireplace key={status} style={{ color: brown[500] }}></Fireplace>
        );
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
            <TableCell align="right">Wheels?</TableCell>
            <TableCell align="right">Tracks?</TableCell>
            <TableCell align="right">Sentience?</TableCell>
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
                    {robot.status.map((status) => (
                      <Tooltip key={status} title={status}>
                        {getStatusIcon(status)}
                      </Tooltip>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {robot.configuration.numberOfRotors}
                  </TableCell>
                  <TableCell align="right">
                    {robot.configuration.Colour}
                  </TableCell>
                  <TableCell align="right">
                    <BooleanIcon
                      value={robot.configuration.hasWheels}
                    ></BooleanIcon>
                  </TableCell>
                  <TableCell align="right">
                    <BooleanIcon
                      value={robot.configuration.hasTracks}
                    ></BooleanIcon>
                  </TableCell>
                  <TableCell align="right">
                    <BooleanIcon
                      value={robot.configuration.hasSentience}
                    ></BooleanIcon>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RecyclableRobotTable;
