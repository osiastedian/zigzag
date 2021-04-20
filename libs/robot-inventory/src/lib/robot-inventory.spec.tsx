import { render } from '@testing-library/react';
import { RobotStatus } from '@zigzag/robot-factory/shared';

import RobotInventory from './robot-inventory';
import { isRecyclable } from './robot-inventory.slice';

describe('RobotInventory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RobotInventory />);
    expect(baseElement).toBeTruthy();
  });
});
