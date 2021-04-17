import {
  Checkbox,
  Icon,
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
import React, { useEffect, useState } from 'react';

import { red } from '@material-ui/core/colors';

import { Robot, RobotStatus } from '@zigzag/robot-factory/shared';
import './robot-table.module.scss';

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
export interface RobotTableProps {
  robots: Robot[];
  onSelectionChange: (robotIds: number[]) => void;
}

export function RobotTable(props: RobotTableProps) {
  const loadingRows = Array(5).fill(1);
  const [robotPage, setRobotPage] = useState<Robot[]>([]);
  const [robotSelectionMap, setRobotSelectionMap] = useState<
    Record<number, boolean>
  >({});

  const [isLoading, setIsLoading] = useState(true);
  const [selectAllState, setSelectAllState] = useState<{
    checked: boolean;
    indeterminate: boolean;
  }>({
    checked: false,
    indeterminate: false,
  });

  useEffect(() => {
    setIsLoading(false);
    setRobotPage(props.robots);
    const selectionMap: Record<number, boolean> = {};
    props.robots.forEach((robot) => {
      selectionMap[robot.id] = false;
    });
    setRobotSelectionMap(selectionMap);
  }, [props]);

  useEffect(() => {
    const selection = robotPage.map((robot) => robotSelectionMap[robot.id]);
    const allSelected = selection.every((checked) => checked === true);
    const someSelected = selection.some((checked) => checked === true);
    setSelectAllState({
      checked: allSelected,
      indeterminate: !allSelected && someSelected,
    });
  }, [robotSelectionMap, robotPage]);

  const onSelectRobot = (robotId: number, isSelected: boolean) => {
    setRobotSelectionMap({ ...robotSelectionMap, [robotId]: isSelected });
  };

  const selectAllChange = (isSelected: boolean) => {
    const newSelectionMap = Object.keys(robotSelectionMap).reduce(
      (acc, key) => {
        acc[key] = isSelected;
        return acc;
      },
      {}
    );
    setRobotSelectionMap(newSelectionMap);
  };

  const getStatusIcon = (status: RobotStatus) => {
    switch (status) {
      case RobotStatus.ON_FIRE:
        return <Fireplace style={{ color: red[500] }}></Fireplace>;
      case RobotStatus.LOOSE_SCREWS:
        return <Fireplace style={{ color: red[500] }}></Fireplace>;
      case RobotStatus.PAINT_SCRATCHED:
        return <Fireplace style={{ color: red[500] }}></Fireplace>;
      case RobotStatus.RUSTY:
        return <Fireplace style={{ color: red[500] }}></Fireplace>;
    }
    return null;
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width="20px">
              <Checkbox
                checked={selectAllState.checked}
                indeterminate={selectAllState.indeterminate}
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
          {isLoading
            ? loadingRows.map((val, i) => <LoadingRow key={i}></LoadingRow>)
            : robotPage.map((robot) => (
                <TableRow key={robot.id}>
                  <TableCell>
                    <Checkbox
                      checked={robotSelectionMap[robot.id]}
                      onChange={(e, checked) =>
                        onSelectRobot(robot.id, checked)
                      }
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
