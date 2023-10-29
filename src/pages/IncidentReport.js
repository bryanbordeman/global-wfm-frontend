import React from 'react';
import { Container,Stack } from '@mui/material';
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

export default function IncidentReport(props) {
    const { user, token, handleOpenSnackbar, darkState} = props
    const [ current, setCurrent ] = React.useState('298');
    const [ previous, setPrevious ] = React.useState('365');
    const [ year, setYear ] = React.useState(new Date());
    const { isLoading, setIsLoading } = props;
    const [ editing, setEditing ] = React.useState(false);
    const [ openIncidentReportForm, setOpenIncidentReportForm ] = React.useState(false);

    const handleToggleIncidentReportForm = () => {
        setOpenIncidentReportForm(!openIncidentReportForm);
    };

    return ( 
        <Container
            component="span"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection:'column',
                margin: 0,
                padding: 0
        }}>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <Stack spacing={1} sx={{width: '100%'}}>
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
                    <div>
                        <Typography 
                            variant="h6" 
                            gutterBottom
                            align='center'
                            sx={{marginBottom: 0}}
                        >
                            {current} Days since last recorded incident
                        </Typography>
                        <Typography 
                            variant="subtitle1" 
                            gutterBottom
                            align='center'
                            sx={{marginTop: 0}}
                        >
                            The previous record was {previous} days.
                        </Typography>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DatePicker
                            label="Year"
                            id="year"
                            name="year"
                            views={['year']}
                            value={year}
                            onChange={(date) => {setYear(date)}}
                            renderInput={(params) => < TextField {...params} variant="filled"/>}
                            fullWidth
                            maxDate={new Date()}
                            minDate={new Date(new Date().getFullYear() - 10, 0, 1)}
                        />
                    </LocalizationProvider>
                    <ReportsList/>
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
            />
        </Container>
    );
};