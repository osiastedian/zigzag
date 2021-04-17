import { render } from '@testing-library/react';

import RobotTable from './robot-table';

describe('RobotTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RobotTable />);
    expect(baseElement).toBeTruthy();
  });
});
