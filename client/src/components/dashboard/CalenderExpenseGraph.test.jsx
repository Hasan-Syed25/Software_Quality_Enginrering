import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CalenderExpenseGraph1 } from './CalenderExpenseGraph'; // Ensure the path is correct
import { getUserDailyExpService, getUserMonthlyExpService } from '../../services/expenseServices';

jest.mock('../../services/expenseServices', () => ({
  getUserDailyExpService: jest.fn(),
  getUserMonthlyExpService: jest.fn(),
}));

describe('CalendarExpenseGraph1 Component Tests', () => {
  beforeEach(() => {
    // Setup localStorage mock
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ emailId: 'test@example.com' }));

    // Setup API mocks
    getUserMonthlyExpService.mockResolvedValue({
      data: { data: [{ _id: { month: 6 }, amount: 500 }] }
    });
    getUserDailyExpService.mockResolvedValue({
      data: { data: [{ _id: { month: 6, date: 15 }, amount: 50 }] }
    });
  });

  it('renders and shows loading initially', async () => {
    render(<CalenderExpenseGraph1 />);
    await waitFor(() => expect(screen.getByText(/loading/i)).toBeInTheDocument());
  });

  it('displays monthly view by default after loading data', async () => {
    render(<CalenderExpenseGraph1 />);
    await waitFor(() => expect(screen.getByText(/monthly view/i)).toBeInTheDocument());
  });

  it('shows an alert banner if there is an error', async () => {
    getUserMonthlyExpService.mockRejectedValueOnce(new Error('Failed to fetch'));
    render(<CalenderExpenseGraph1 />);
    await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
  });
});
