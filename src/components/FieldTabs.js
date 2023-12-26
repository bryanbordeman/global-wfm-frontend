import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Videos from '../pages/Videos';
import Schedule from '../pages/Schedule';
import Vehicles from '../pages/Vehicles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

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

export default function FieldTabs(props) {
    const { user, token, handleOpenSnackbar, darkState} = props
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
                    <Tab icon={<CalendarMonthIcon />}  label="Schedule" {...a11yProps(0)} />
                    <Tab icon={<DirectionsCarIcon />}  label="Vehicles" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Schedule
                    user={user}
                    token={token}
                    darkState={darkState}
                    handleOpenSnackbar={handleOpenSnackbar}  
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Vehicles
                    user={user}
                    token={token}
                    darkState={darkState}
                    handleOpenSnackbar={handleOpenSnackbar}  
                />
            </TabPanel>
        </Box>
    );
};