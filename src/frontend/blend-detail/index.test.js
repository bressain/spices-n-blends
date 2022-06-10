import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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
      <BrowserRouter>
        <BlendDetail />
      </BrowserRouter>
    </TestQueryClientProviderWrapper>
  );
  const detailElement = screen.getByText(/Loading.../i);
  expect(detailElement).toBeInTheDocument();
});
