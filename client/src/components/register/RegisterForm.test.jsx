import React from 'react';
import { render, fireEvent, waitFor, screen, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from './RegisterForm'; // Make sure the import path is correct
import * as Yup from 'yup';
import { register } from '../../services/auth';



jest.mock('../../services/auth', () => ({
  register: jest.fn(),
}));

jest.mock('../../theme/hooks/useResponsive', () => () => false);

describe('RegisterForm', () => {
  beforeEach(() => {
    register.mockClear();
  });

  it('renders correctly', () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);
    expect(getByLabelText('First Name')).toBeInTheDocument();
    expect(getByLabelText('Email address')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Register')).toBeInTheDocument();
  });

  // Modified test with specific selector
  it('shows validation errors if fields are empty upon submission', async () => {
    // Render the RegisterForm
    render(<RegisterForm />);
  
    const submitButton = screen.getByTestId('registerButton2', { type: 'submit' }); // Target by testID and type
  fireEvent.click(submitButton);
  
    // Wait for validation errors to render
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(screen.getByText('First Name is required')).toBeInTheDocument();
    });
  });
  


  it('submits the form with correct values', async () => {
    register.mockResolvedValue({ success: true }); // Mocking successful registration

    const utils = render(<RegisterForm />);
    const firstNameInput = utils.getByLabelText('First Name');
    const emailInput = utils.getByLabelText('Email address');
    const passwordInput = utils.getByLabelText('Password');
    const submitButton = utils.getByRole('button', { name: /register/i });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: '',
        emailId: 'john@example.com',
        password: 'password123',
        remember: true,
      }, expect.any(Function), expect.any(Function));
    });
  });

  it('displays an error alert if registration fails', async () => {
    register.mockRejectedValue(new Error('Registration Failed'));

    const { getByRole, findByText } = render(<RegisterForm />);
    const submitButton = getByRole('button', { name: /register/i });

    fireEvent.click(submitButton);

    const alert = await findByText(/error/i);
    expect(alert).toBeInTheDocument();
  });
});
