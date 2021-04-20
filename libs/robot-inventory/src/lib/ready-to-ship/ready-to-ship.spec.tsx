import { render } from '@testing-library/react';

import ReadyToShip from './ready-to-ship';

describe('ReadyToShip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReadyToShip />);
    expect(baseElement).toBeTruthy();
  });
});
