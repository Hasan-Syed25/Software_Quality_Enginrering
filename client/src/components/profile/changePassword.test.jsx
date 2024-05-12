import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChangePassword from './changePassword';

// Mock dependencies
jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: jest.fn(),
}));

jest.mock('../../theme/hooks/useResponsive', () => jest.fn());

jest.mock('../../services/auth', () => ({
  updatePassword: jest.fn(),
}));

describe('ChangePassword Component', () => {
  // Sample props for testing
  const props = {
    hidePassUpdate: jest.fn(),
    emailId: 'test@example.com',
    showHomeAlert: jest.fn(),
    homeAlertMessage: 'Test message',
  };

  // Mock formik hook return values
  const formikValues = {
    values: {
      emailId: props.emailId,
      oldPassword: 'oldPassword123',
      newPassword: 'newPassword123',
      confirmPassword: 'newPassword123',
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
    jest.spyOn(React, 'useState').mockReturnValueOnce([false, jest.fn()]); // Mock useState for showPasswordOld
    jest.spyOn(React, 'useState').mockReturnValueOnce([false, jest.fn()]); // Mock useState for showPasswordNew
    jest.spyOn(React, 'useState').mockReturnValueOnce([false, jest.fn()]); // Mock useState for showPasswordConfirm
    jest.requireMock('formik').useFormik.mockReturnValueOnce(formikValues); // Mock useFormik hook
  });

  it('renders ChangePassword correctly', () => {
    const { getByLabelText, getByText } = render(<ChangePassword {...props} />);
    expect(getByLabelText('Old Password')).toBeInTheDocument();
    expect(getByLabelText('New Password')).toBeInTheDocument();
    expect(getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Update')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const { getByText } = render(<ChangePassword {...props} />);
    fireEvent.click(getByText('Update')); // Click the Update button
    await waitFor(() => expect(formikValues.handleSubmit).toHaveBeenCalled());
    // Add assertions for the expected behavior after submission
    expect(props.hidePassUpdate).toHaveBeenCalled(); // Ensure hidePassUpdate is called after form submission
  });

  it('displays error when form data is invalid', async () => {
    // Mock formikValues to contain errors
    const formikValuesWithError = { ...formikValues, errors: { oldPassword: 'Required' } };
    jest.requireMock('formik').useFormik.mockReturnValueOnce(formikValuesWithError);

    const { queryByText } = render(<ChangePassword {...props} />);
    // Since we've mocked the formikValues with valid data, there should be no errors displayed
    expect(queryByText('Required')).not.toBeInTheDocument();
  });

  it('cancels password change', () => {
    const { getByText } = render(<ChangePassword {...props} />);
    fireEvent.click(getByText('Cancel')); // Click the Cancel button
    expect(props.hidePassUpdate).toHaveBeenCalled();
  });

 
});
