import React from 'react';
import { render, screen } from '@testing-library/react';
import { EndMessage } from './EndMessage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../config.json', () => ({
  USER_GROUPS_URL: '/user/groups'
}));

describe('EndMessage Component', () => {
  test('renders End Message with correct content and button', () => {
    render(
      <MemoryRouter>
        <EndMessage />
      </MemoryRouter>
    );

    // Expect text content to be rendered
    expect(screen.getByText(/Keep track of shared expenses/i)).toBeInTheDocument();

    // Expect image to be rendered with alt text
    const imageElement = screen.getByAltText('dashboard');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.tagName).toBe('IMG');

    // Expect button with correct text and link
    const viewGroupsButton = screen.getByRole('link', { name: /view groups/i });
    expect(viewGroupsButton).toBeInTheDocument();
    expect(viewGroupsButton.tagName).toBe('A');
    expect(viewGroupsButton.getAttribute('href')).toBe('/user/groups');
  });

  test('renders with correct styles', () => {
    render(
      <MemoryRouter>
        <EndMessage />
      </MemoryRouter>
    );

    // Expect background color and text color to match theme
    const endMessageContainer = screen.getByRole('region');
    expect(endMessageContainer).toHaveStyle({
      backgroundColor: 'rgb(197, 225, 165)', // Assuming 'success' light palette color
      color: 'rgb(61, 89, 44)', // Assuming 'success' darker palette color
      borderRadius: '2px',
    });
  });
});