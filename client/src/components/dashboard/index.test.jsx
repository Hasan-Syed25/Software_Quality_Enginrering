import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Index from './index';
import { MemoryRouter } from 'react-router-dom';

// Mocked services
import { getUserExpenseService, getUserGroupsService } from '../../services/__mocks__/expenseServices';

describe('Index Component', () => {
  beforeEach(() => {
    // Mock localStorage getItem method
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(
      JSON.stringify({ emailId: 'test@example.com' })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Loading indicator initially', async () => {
    // Mock API responses
    getUserExpenseService.mockResolvedValueOnce({
      data: { total: 1000 }
    });
    getUserGroupsService.mockResolvedValueOnce({
      data: { groups: [] }
    });

    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    // Expect loading indicator to be displayed initially
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for API calls to resolve
    await waitFor(() => {
      expect(getUserExpenseService).toHaveBeenCalledTimes(1);
      expect(getUserGroupsService).toHaveBeenCalledTimes(1);
    });

    // Expect content to be rendered after loading
    expect(screen.getByText('Welcome Message')).toBeInTheDocument();
    expect(screen.getByText('Summary Cards')).toBeInTheDocument();
    expect(screen.getByText('Calendar Expense Graph')).toBeInTheDocument();
    expect(screen.getByText('Groupwise Expense Chart')).toBeInTheDocument();
    expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
    expect(screen.getByText('Category Expense Chart')).toBeInTheDocument();
    expect(screen.getByText('End Message')).toBeInTheDocument();
  });

  // Add more test cases if needed based on specific sections of Index component
});
