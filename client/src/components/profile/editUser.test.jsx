import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditForm from './editUser';

// Mock dependencies
jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: jest.fn(),
}));

jest.mock('../../theme/hooks/useResponsive', () => jest.fn());

jest.mock('../../services/auth', () => ({
  editUser: jest.fn(),
}));

describe('EditForm Component', () => {
  // Sample props for testing
  const props = {
    hideEditUser: jest.fn(),
    emailId: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    showHomeAlert: jest.fn(),
    homeAlertMessage: 'Test message',
  };

  // Mock formik hook return values
  const formikValues = {
    values: {
      emailId: props.emailId,
      firstName: props.firstName,
      lastName: props.lastName,
    },
    errors: {},
    touched: {},
    isSubmitting: false,
    handleSubmit: jest.fn(),
    getFieldProps: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(React, 'useState').mockReturnValueOnce([false, jest.fn()]); // Mock useState for showAlert
    jest.spyOn(React, 'useState').mockReturnValueOnce(['', jest.fn()]); // Mock useState for alertMessage
    jest.requireMock('formik').useFormik.mockReturnValueOnce(formikValues); // Mock useFormik hook
  });

  it('renders EditForm correctly', () => {
    const { getByLabelText, getByText } = render(<EditForm {...props} />);
    expect(getByLabelText('First Name')).toBeInTheDocument();
    expect(getByLabelText('Last Name')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Update')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const { getByText } = render(<EditForm {...props} />);
    const updateButton = getByText('Update', { selector: 'button' }); // Ensure to target only button elements
    fireEvent.click(updateButton); // Click the Update button
    await waitFor(() => expect(formikValues.handleSubmit).toHaveBeenCalled());
    // Add assertions for the expected behavior after submission
  });
  

  it('displays error when form data is invalid', async () => {
    const { getByText, getAllByText } = render(<EditForm {...props} />);
    const updateButtons = getAllByText('Update'); // Get all buttons with text 'Update'
    const firstUpdateButton = updateButtons[0]; // Assuming the first button is the one you want to interact with
    fireEvent.click(firstUpdateButton); // Click the Update button
    await waitFor(() => expect(getByText('Required')).toBeInTheDocument());
    // Add assertions for the expected behavior when errors are displayed
  });
  

  it('cancels form editing', () => {
    const { getByText } = render(<EditForm {...props} />);
    fireEvent.click(getByText('Cancel')); // Click the Cancel button
    expect(props.hideEditUser).toHaveBeenCalled();
  });

  
});
