import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // This imports all the jest-dom matchers
import UserDetails from './UserDetails';

describe('UserDetails', () => {
  it('renders first name, last name, and email', () => {
    render(<UserDetails firstName="John" lastName="Doe" emailId="john.doe@example.com" />);
    
    expect(screen.getByLabelText('First Name').value).toBe('John');
    expect(screen.getByLabelText('Last Name').value).toBe('Doe');
    expect(screen.getByLabelText('Email address').value).toBe('john.doe@example.com');
  });

  it('inputs should be disabled', () => {
    render(<UserDetails firstName="John" lastName="Doe" emailId="john.doe@example.com" />);
    
    expect(screen.getByLabelText('First Name')).toBeDisabled();
    expect(screen.getByLabelText('Last Name')).toBeDisabled();
    expect(screen.getByLabelText('Email address')).toBeDisabled();
  });
});
