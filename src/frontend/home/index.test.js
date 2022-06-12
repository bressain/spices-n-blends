import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import { TestQueryClientProviderWrapper } from '../util/tests';
import Home from './index';

test('renders home page', async () => {
  render(
    <TestQueryClientProviderWrapper>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </TestQueryClientProviderWrapper>
  );
  const homeElement = screen.getByText(/spice/i);
  expect(homeElement).toBeInTheDocument();
});
