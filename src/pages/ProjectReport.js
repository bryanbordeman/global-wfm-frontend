import React from 'react';
import { Box, Container } from '@mui/material';
import ReportsList from '../components/ReportsList';
import ProjectPicker from '../components/ProjectPicker';
import { Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddProjectReportForm from '../components/AddProjectReportForm';

export default function ProjectReport(props) {
    const { user, token, handleOpenSnackbar, darkState} = props;
    const { isLoading, setIsLoading } = props;
    const [ project, setProject ] = React.useState(null);
    const [ editing, setEditing ] = React.useState(false);
    const [ openProjectReportForm, setOpenProjectReportForm ] = React.useState(false);

    const handleChangeProject = (newValue) => {
        if(newValue){
            setProject(newValue);
        } else {
            setProject(newValue);
        };
    };

    const handleToggleProjectReportForm = () => {
        setOpenProjectReportForm(!openProjectReportForm);
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
                        disabled={project === '' || project === null}
                        onClick={handleToggleProjectReportForm}
                    >Add Report</Button>
                    <ProjectPicker
                        token={token}
                        handleChangeProject={handleChangeProject}
                        editing={false}
                        errors={{}}
                        
                    /> 
                    <ReportsList/>
                </Stack>
            </Box>
            <AddProjectReportForm
                user={user}
                token={token}
                darkState={darkState}
                handleOpenSnackbar={handleOpenSnackbar} 
                open={openProjectReportForm}
                project={project}
                editing={editing}
                handleClose={handleToggleProjectReportForm}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
        </Container>
    );
};