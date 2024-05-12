import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from './LoginForm';

// Mock dependencies
jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: jest.fn(),
}));

jest.mock('../../theme/hooks/useResponsive', () => jest.fn());

jest.mock('../../services/auth', () => ({
  login: jest.fn(),
}));

describe('LoginForm Component', () => {
  // Sample props for testing
  const props = {};

  // Mock formik hook return values
  const formikValues = {
    values: {
      emailId: '',
      password: '',
      remember: true,
    },
    errors: { emailId: 'Required', password: 'Required' }, // Mock errors for invalid data
    touched: {},
    isSubmitting: false,
    handleSubmit: jest.fn(),
    getFieldProps: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(React, 'useState').mockReturnValueOnce([false, jest.fn()]); // Mock useState for showAlert
    jest.spyOn(React, 'useState').mockReturnValueOnce(['', jest.fn()]); // Mock useState for alertMessage
    jest.spyOn(React, 'useState').mockReturnValueOnce([false, jest.fn()]); // Mock useState for showPassword
    jest.requireMock('formik').useFormik.mockReturnValueOnce(formikValues); // Mock useFormik hook
  });

  it('renders LoginForm correctly', () => {
    const { getByLabelText, getByText } = render(<LoginForm {...props} />);
    expect(getByLabelText('Email address')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const { getByText } = render(<LoginForm />);
    const submitButton = getByText(/login/i);
    fireEvent.click(submitButton);
    await waitFor(() => expect(formikValues.handleSubmit).toHaveBeenCalled());
  });
  
  
  it('displays error when form data is invalid', () => {
    const { getByText } = render(<LoginForm {...props} />);
    expect(getByText('Required')).toBeInTheDocument(); // Check if error messages are displayed
  });

  // Add more test cases as needed
});
