import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DCNs from '../pages/DCNs';
import EngSchedule from '../pages/EngSchedule';

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

export default function EngTabs(props) {
    const { user, token, handleOpenSnackbar, darkState} = props
    const [value, setValue] = React.useState(0);
    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab icon={<ListAltIcon />}  label="DCN" {...a11yProps(0)} />
                    <Tab icon={<ArchitectureIcon />}  label="Schedule" {...a11yProps(1)} />
                    {/* <Tab icon={<HandymanIcon />}  label="Tools" {...a11yProps(2)} /> */}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <DCNs/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <EngSchedule/>
            </TabPanel>
            {/* <TabPanel value={value} index={2}>
                <Tools/>
            </TabPanel> */}
            
        </Box>
    );
};