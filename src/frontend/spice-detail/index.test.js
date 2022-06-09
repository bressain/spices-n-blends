import { render, screen } from '@testing-library/react';
import { TestQueryClientProviderWrapper } from '../util/tests';
import SpiceDetail from './index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 1,
  }),
}));

test('renders spice detail page', async () => {
  render(
    <TestQueryClientProviderWrapper>
      <SpiceDetail />
    </TestQueryClientProviderWrapper>
  );
  const detailElement = screen.getByText(/Spice Detail Page/i);
  expect(detailElement).toBeInTheDocument();
});
