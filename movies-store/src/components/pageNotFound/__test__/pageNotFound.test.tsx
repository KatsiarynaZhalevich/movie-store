import { render } from '@testing-library/react';
import React from 'react';
import PageNotFound from '../pageNotFound';

describe('PageNotFound component ui specification', () => {
  it('should have expected text', () => {
    const { getByText } = render(<PageNotFound />);

    expect(getByText('404')).not.toBeNull();
    expect(getByText('Page not found')).not.toBeNull();
  });

  it('should have expected text on button', () => {
    const { getByText } = render(<PageNotFound />);

    expect(getByText('Go to HOME PAGE')).not.toBeNull();
  });
});
