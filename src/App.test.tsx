import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders react-creditcard-input', () => {
  render(<App />);
  const linkElement = screen.getByText(/react-creditcard-input/i);
  expect(linkElement).toBeInTheDocument();
});
