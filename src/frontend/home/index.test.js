import { render, screen } from '@testing-library/react';
import { TestQueryClientProviderWrapper } from '../util/tests';
import Home from './index';

test('renders home page', async () => {
  render(
    <TestQueryClientProviderWrapper>
      <Home />
    </TestQueryClientProviderWrapper>
  );
  const homeElement = screen.getByText(/spice/i);
  expect(homeElement).toBeInTheDocument();
});
