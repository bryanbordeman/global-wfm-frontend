import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HandymanIcon from '@mui/icons-material/Handyman';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import IncidentReport from '../pages/IncidentReport';
import ProjectReport from '../pages/ProjectReport';
import DoorServiceReport from '../pages/DoorServiceReport';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
                {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
                )}
        </div>
    );
    }

    TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
    }

export default function ReportTabs(props) {
    const { user, token, handleOpenSnackbar, employees} = props
    const { isLoading, setIsLoading} = props;
    const [value, setValue] = React.useState(0);
    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    variant="fullWidth" 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="field tabs"
                >
                    <Tab icon={<LocalHospitalIcon />}  label="Incident Report" {...a11yProps(0)} />
                    <Tab icon={<HandymanIcon />} label="Project Report" {...a11yProps(1)} />
                    <Tab icon={<MeetingRoomIcon />}  label="Door Service Report" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <IncidentReport
                    user={user}
                    token={token}
                    handleOpenSnackbar={handleOpenSnackbar}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProjectReport
                    user={user}
                    token={token}
                    handleOpenSnackbar={handleOpenSnackbar}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DoorServiceReport
                    user={user}
                    token={token}
                    handleOpenSnackbar={handleOpenSnackbar}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    employees={employees}
                />
            </TabPanel>
        </Box>
    );
};