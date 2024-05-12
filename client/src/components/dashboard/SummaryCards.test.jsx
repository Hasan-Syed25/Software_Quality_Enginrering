import React from 'react';
import { render, screen } from '@testing-library/react';
import { SummaryCards } from './SummaryCards';

describe('SummaryCards Component', () => {
  test('renders total expense correctly when userTotalExp is provided', () => {
    const userTotalExp = 5000;
    render(<SummaryCards userTotalExp={userTotalExp} />);

    // Expect total expense label and value to be rendered
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('₹ 5,000')).toBeInTheDocument();
  });

  test('renders default total expense as 0 when userTotalExp is not provided', () => {
    render(<SummaryCards />);

    // Expect default total expense label and value to be rendered as 0
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('₹ 0')).toBeInTheDocument();
  });
});
