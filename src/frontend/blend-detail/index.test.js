import { render, screen } from '@testing-library/react';
import { TestQueryClientProviderWrapper } from '../util/tests';
import BlendDetail from './index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 1,
  }),
}));

test('renders blend detail page', async () => {
  render(
    <TestQueryClientProviderWrapper>
      <BlendDetail />
    </TestQueryClientProviderWrapper>
  );
  const detailElement = screen.getByText(/Blend Detail Page/i);
  expect(detailElement).toBeInTheDocument();
});
