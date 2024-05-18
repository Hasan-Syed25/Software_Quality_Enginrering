import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserBalanceChart from './userBalanceChart';
import { useParams } from 'react-router-dom';
import { getGroupDetailsService } from '../../../services/groupServices';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../../services/groupServices', () => ({
  getGroupDetailsService: jest.fn(),
}));

describe('UserBalanceChart Component', () => {
  const mockParams = { groupId: 'mockGroupId' };

  beforeEach(() => {
    useParams.mockReturnValue(mockParams);
  });

  it('renders UserBalanceChart component with loading state', () => {
    render(<UserBalanceChart />);

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('renders UserBalanceChart component with chart data', async () => {
    const mockResponse = {
      data: {
        group: {
          split: {
            0: { January: -100 },
            1: { February: -150 },
          },
        },
      },
    };

    getGroupDetailsService.mockResolvedValueOnce(mockResponse);

    render(<UserBalanceChart />);

    await waitFor(() => {
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
      expect(screen.queryByTestId('loading-indicator')).toBeNull();
    });
  });

  it('renders error alert when API call fails', async () => {
    const mockError = 'Failed to fetch group details';
    getGroupDetailsService.mockRejectedValueOnce(mockError);

    render(<UserBalanceChart />);

    await waitFor(() => {
      expect(screen.getByTestId('error-alert')).toBeInTheDocument();
      expect(screen.queryByTestId('loading-indicator')).toBeNull();
    });
  });
});
