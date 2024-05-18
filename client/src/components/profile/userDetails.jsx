import { Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';

UserDetails.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    emailId: PropTypes.string,
};

export default function UserDetails({ firstName, lastName, emailId }) {
    return (
        <Stack spacing={3}>
            <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
                <TextField disabled id="first-name" label="First Name" defaultValue={firstName} sx={{ width: "100%" }} />
                <TextField disabled id="last-name" label="Last Name" defaultValue={lastName} sx={{ width: "100%" }} />
            </Stack>
            <TextField disabled id="email-id" label="Email address" defaultValue={emailId} sx={{ width: "100%" }} />
        </Stack>
    );
}
