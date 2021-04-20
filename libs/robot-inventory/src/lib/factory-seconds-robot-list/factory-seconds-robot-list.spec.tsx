import { render } from '@testing-library/react';

import FactorySecondsRobotList from './factory-seconds-robot-list';

describe('FactorySecondsRobotList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FactorySecondsRobotList />);
    expect(baseElement).toBeTruthy();
  });
});
