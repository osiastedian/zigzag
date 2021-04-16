import { render } from '@testing-library/react';

import RobotInventory from './robot-inventory';

describe('RobotInventory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RobotInventory />);
    expect(baseElement).toBeTruthy();
  });
});
