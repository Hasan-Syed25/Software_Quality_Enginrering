import React, { useEffect, useState } from "react";
import { Box, FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import Loading from "../loading";
import { getUserDailyExpService, getUserMonthlyExpService } from "../../services/expenseServices";
import { monthNamesMMM } from "../../utils/helper";
import useResponsive from "../../theme/hooks/useResponsive";
import AlertBanner from "../AlertBanner";

export const CalenderExpenseGraph1 = () => {
    const mdUp = useResponsive('up', 'md');
    const [monthlyView, setMonthlyView] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [userMonthlyExp, setUserMonthlyExp] = useState();
    const [userDailyExp, setUserDailyExp] = useState();

    const toggleMonthlyView = () => setMonthlyView(!monthlyView);

    useEffect(() => {
        const getUserDetails = async () => {
            setLoading(true);
            const profileData = localStorage.getItem("profile");
            const profile = profileData ? JSON.parse(profileData) : null;

            if (!profile || !profile.emailId) {
                setAlert(true);
                setAlertMessage('Error: Profile data is missing or incomplete');
                setLoading(false);
                return;
            }

            try {
                const userIdJson = { user: profile.emailId };
                const response_group_monthly = await getUserMonthlyExpService(userIdJson, setAlert, setAlertMessage);
                if (response_group_monthly && response_group_monthly.data && response_group_monthly.data.data) {
                    setUserMonthlyExp(response_group_monthly.data.data);
                } else {
                    throw new Error('Invalid monthly data');
                }

                const response_group_daily = await getUserDailyExpService(userIdJson, setAlert, setAlertMessage);
                if (response_group_daily && response_group_daily.data && response_group_daily.data.data) {
                    setUserDailyExp(response_group_daily.data.data);
                } else {
                    throw new Error('Invalid daily data');
                }
            } catch (error) {
                console.error(error);
                setAlert(true);
                setAlertMessage('Error: ' + error.message);
            }
            setLoading(false);
        };

        getUserDetails();
    }, []);

    return (
        <>
            {loading ? <Loading /> : (
                <Box sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 5,
                    ...(mdUp && { p: 5 }),
                    ...(!mdUp && { p: 1 })
                }}>
                    {alert && <AlertBanner showAlert={alert} alertMessage={alertMessage} severity="error" />}
                    <Typography variant="h6">
                        Expense Graph - {monthlyView ? "Daily View" : "Monthly View"}
                    </Typography>
                    
                    <Box height={350} my={2}>
                        <Line data={data} options={options} />
                    </Box>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked onClick={toggleMonthlyView} />} label="Monthly expense view" />
                    </FormGroup>
                </Box>
            )}
        </>
    );
};
