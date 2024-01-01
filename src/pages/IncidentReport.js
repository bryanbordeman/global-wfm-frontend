import React from 'react';
import { Container, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ReportsList from '../components/ReportsList';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import AddIncidentReportForm from '../components/AddIncidentReportForm';
import ReportServices from '../services/Report.services';
import { differenceInDays } from 'date-fns';

export default function IncidentReport(props) {
    const { user, token, handleOpenSnackbar } = props;
    const [report, setReport] = React.useState([]);
    const [reports, setReports] = React.useState([]);
    const [reportsYear, setReportsYear] = React.useState([]);
    const [current, setCurrent] = React.useState('');
    const [previous, setPrevious] = React.useState('');
    const [year, setYear] = React.useState(new Date().getFullYear());
    const { isLoading, setIsLoading } = props;
    const [editing, setEditing] = React.useState(false);
    const [openIncidentReportForm, setOpenIncidentReportForm] = React.useState(false);

    React.useEffect(() => {
        retrieveReports();
    }, [])

    React.useEffect(() => {
        if (current > previous && previous > 0) {
            handleOpenSnackbar('success', 'Lets work together to set a new record!')
        }
    }, [current, previous])

    React.useEffect(() => {
        if (year) {
            setReportsYear(reports.filter((r) => (new Date(r.date).getFullYear() === year)))
        } else {
            setReportsYear([]);
        }
    }, [year, reports])

    const retrieveReports = () => {
        setIsLoading(true);
        ReportServices.getIncidentReports(token)
            .then(response => {
                setReports(response.data);

                if (response.data && response.data[0] && response.data[0].date) {
                    const currentDate = new Date();
                    const responseDate = new Date(response.data[0].date);
                    const differenceInDaysValue = differenceInDays(currentDate, responseDate);
                    setCurrent(String(differenceInDaysValue));

                    const differences = [];
                    let highestDifference = 0; // Initialize the variable to store the highest absolute difference

                    for (let i = 1; i < response.data.length; i++) {
                        const currentDate = new Date(response.data[i].date);
                        const prevDate = new Date(response.data[i - 1].date);
                        const difference = Math.abs(differenceInDays(currentDate, prevDate));

                        // Update the highestDifference if the current difference is greater
                        if (difference > highestDifference) {
                            highestDifference = difference;
                        }

                        differences.push(String(difference));
                    }

                    // Set the highestDifference value to the state variable
                    if (highestDifference > 0) {
                        setPrevious(highestDifference);
                    }
                }


            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleToggleIncidentReportForm = () => {
        setOpenIncidentReportForm(!openIncidentReportForm);
        setEditing(false);
    };

    const handleEditReport = () => {
        handleToggleIncidentReportForm();
        setEditing(true);
    };

    return (
        <Container
            component="span"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                margin: 0,
                padding: 0
            }}>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <Stack spacing={1} sx={{ width: '100%' }}>
                    <Button
                        sx={{
                            height: '100%',
                            width: '100%',
                            marginBottom: '10px'
                        }}
                        size="large"
                        variant="contained"
                        color='error'
                        startIcon={<AddIcon />}
                        onClick={handleToggleIncidentReportForm}
                    >
                        Add Report
                    </Button>
                    {current &&
                        <div>
                            <Typography
                                variant="h6"
                                gutterBottom
                                align='center'
                                sx={{ marginBottom: 0 }}
                            >
                                {current} Days since last recorded incident
                            </Typography>
                            {previous &&
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    align='center'
                                    sx={{ marginTop: 0 }}
                                >
                                    The previous record was {previous} days.
                                </Typography>
                            }
                        </div>
                    }
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DatePicker
                            label="Year"
                            id="year"
                            name="year"
                            views={['year']}
                            value={new Date(year, 0, 1)}
                            onChange={(date) => { setYear(date.getFullYear()) }}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            fullWidth
                            maxDate={new Date()}
                            minDate={new Date(new Date().getFullYear() - 10, 0, 1)}
                        />
                    </LocalizationProvider>
                    <ReportsList
                        reports={reportsYear}
                        handleOpenForm={handleEditReport}
                        setReport={setReport}
                    />
                </Stack>
            </Box>
            <AddIncidentReportForm
                user={user}
                token={token}
                handleOpenSnackbar={handleOpenSnackbar}
                open={openIncidentReportForm}
                editing={editing}
                handleClose={handleToggleIncidentReportForm}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                retrieveReports={retrieveReports}
                report={report}
            />

        </Container>
    );
};