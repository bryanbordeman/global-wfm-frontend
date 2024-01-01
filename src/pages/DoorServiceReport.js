import React from 'react';
import { Container, Box } from '@mui/material';
import ReportsList from '../components/ReportsList';
import ServicePicker from '../components/ServicePicker';
import { Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddDoorServiceReportForm from '../components/AddDoorServiceReportForm';
import ReportServices from '../services/Report.services';

export default function DoorServiceReport(props) {
    const { user, token, handleOpenSnackbar, employees} = props;
    const { isLoading, setIsLoading } = props;
    const [report, setReport] = React.useState([]);
    const [ reports, setReports ] = React.useState([]);
    // const [ project, setProject ] = React.useState(null);
    const [ service, setService ] = React.useState(null);
    const [ editing, setEditing ] = React.useState(false);
    const [ openDoorReportForm, setOpenDoorReportForm ] = React.useState(false);

    React.useEffect(() => {
        if (service) {
            retrieveReports();
        } else {
            setReports([]);
        }
    }, [service])

    const retrieveReports = () => {
        setIsLoading(true);
        ReportServices.getDoorServiceReports(service.id, token)
            .then(response => {
                setReports(response.data);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleToggleDoorServiceReportForm = () => {
        setOpenDoorReportForm(!openDoorReportForm);
        setEditing(false);
    };

    const handleEditReport = () => {
        handleToggleDoorServiceReportForm();
        setEditing(true);
    };

    const initialFormValues = {
        service: '',
    };
    
    const [ values, setValues ] = React.useState(initialFormValues);
    const [ errors, setErrors ] = React.useState({
        comments: null,
        service: null,
    });

    const handleChangeProject = (newValue) => {
        if(newValue){
            setService(newValue);
        } else {
            setService(newValue);
        };
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
                <Stack spacing={2} sx={{width: '100%'}}>
                    <Button
                        sx={{ height: '100%'}}
                        fullWidth
                        size="large"
                        variant='contained' 
                        color='success'
                        startIcon={<AddIcon />}
                        disabled={service === '' || service === null}
                        onClick={handleToggleDoorServiceReportForm}
                    >Add Report</Button>
                    <ServicePicker
                        token={token}
                        handleChangeProject={handleChangeProject}
                        editing={false}
                        errors={errors}
                        editProject={values.service}
                    />
                    <ReportsList
                        reports={reports} 
                        handleOpenForm={handleEditReport}
                        setReport={setReport}
                    /> 
                </Stack>
            </Box>
            <AddDoorServiceReportForm
                user={user}
                token={token}
                handleOpenSnackbar={handleOpenSnackbar} 
                open={openDoorReportForm}
                service={service}
                editing={editing}
                handleClose={handleToggleDoorServiceReportForm}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                employees={employees}
                retrieveReports={retrieveReports}
                report={report}
            />
        </Container>
    );
};