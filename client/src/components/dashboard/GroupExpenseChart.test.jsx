import React from 'react';
import { render, screen } from '@testing-library/react';
import { GroupExpenseChart } from './GroupExpenseChart';
import { MemoryRouter } from 'react-router-dom';

// Mocking dependencies used in the component
jest.mock('../../services/groupServices', () => ({
  getUserGroupsService: jest.fn().mockResolvedValue({
    data: {
      groups: [
        { groupName: 'Group1', groupTotal: 500 },
        { groupName: 'Group2', groupTotal: 800 },
      ],
    },
  }),
}));

describe('GroupExpenseChart Component', () => {
  beforeEach(() => {
    // Mock localStorage getItem method
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(
      JSON.stringify({ emailId: 'test@example.com' })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Group Expense Chart with correct content', async () => {
    render(
      <MemoryRouter>
        <GroupExpenseChart />
      </MemoryRouter>
    );

    // Expect loading indicator to be displayed initially
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for API call to resolve and chart to render
    await screen.findByText('Groupwise Expense Chart');

    // Expect chart title and legend to be rendered
    expect(screen.getByText('Groupwise Expense Chart')).toBeInTheDocument();
    expect(screen.getByText('Group1')).toBeInTheDocument();
    expect(screen.getByText('Group2')).toBeInTheDocument();
    expect(screen.getByText('$500.00')).toBeInTheDocument();
    expect(screen.getByText('$800.00')).toBeInTheDocument();
  });
});
