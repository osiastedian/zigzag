import { render } from '@testing-library/react';

import RobotActions from './robot-actions';

describe('RobotActions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RobotActions />);
    expect(baseElement).toBeTruthy();
  });
});
