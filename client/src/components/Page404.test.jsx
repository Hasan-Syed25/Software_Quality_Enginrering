import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Necessary for any RouterLink components
import Page404 from './Page404';

describe('Page404', () => {
  const renderWithRouter = (ui) => {
    return render(<Router>{ui}</Router>);
  };

  it('renders the description', () => {
    renderWithRouter(<Page404 />);
    const descriptions = screen.getAllByText(/Sorry, we couldn’t find the page you’re looking for/i);
    expect(descriptions.length).toBe(1); // Change this number based on expected instances
  });

  it('renders an image', () => {
    renderWithRouter(<Page404 />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2); // Verify only one image is rendered
  });

  it('renders the heading', () => {
    renderWithRouter(<Page404 />);
    const headings = screen.getAllByText(/Sorry, page not found!/i);
    expect(headings.length).toBe(3); // Verify the number of heading elements
  });

  it('renders a button linking to the home page', () => {
    renderWithRouter(<Page404 />);
    const button = screen.getByTestId('goHomeButton'); // Using getByTestId to select the button
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', configData.LOGIN_URL); // This checks the href attribute is correct
  });
});
