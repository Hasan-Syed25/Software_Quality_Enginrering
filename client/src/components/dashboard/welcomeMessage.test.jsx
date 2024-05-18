import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { WelcomeMessage } from './WelcomeMessage';
import configData from '../../config.json';

describe('WelcomeMessage Component', () => {
  it('renders WelcomeMessage correctly', () => {
    render(<WelcomeMessage />);
    // Check if the welcome message text is rendered
    expect(screen.getByText(/hello there, welcome back!/i)).toBeInTheDocument();
    // Check if the description text is rendered
    expect(screen.getByText(/keep track of shared expenses and settle your corresponding balances/i)).toBeInTheDocument();
    // Check if the button text is rendered
    expect(screen.getByText(/view groups/i)).toBeInTheDocument();
  });

  it('redirects to user groups page when View Groups button is clicked', () => {
    // Mock the Router component to avoid errors related to routing
    render(
      <Router>
        <WelcomeMessage />
      </Router>
    );
    // Find the View Groups button and click it
    fireEvent.click(screen.getByText(/view groups/i));
    // Check if the button click redirects to the correct URL
    expect(window.location.pathname).toBe(configData.USER_GROUPS_URL);
  });

  it('renders the image correctly', () => {
    render(
      <Router>
        <WelcomeMessage />
      </Router>
    );
    // Check if the image is rendered
    expect(screen.getByAltText(/dashboard/i)).toBeInTheDocument();
  });
});
