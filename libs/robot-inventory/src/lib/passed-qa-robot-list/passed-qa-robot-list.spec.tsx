import { render } from '@testing-library/react';

import PassedQaRobotList from './passed-qa-robot-list';

describe('PassedQaRobotList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PassedQaRobotList />);
    expect(baseElement).toBeTruthy();
  });
});
