import { render } from '@testing-library/react';

import RawInventory from './raw-inventory';

describe('RawInventory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RawInventory />);
    expect(baseElement).toBeTruthy();
  });
});
