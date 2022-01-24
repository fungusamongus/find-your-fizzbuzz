import { render, screen } from '@testing-library/react';
import App from './App';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('renders initial form', () => {
  render(<App />);
  const header = screen.getByText(/Find Your FizzBuzz/i);
  expect(header).toBeInTheDocument();
});
