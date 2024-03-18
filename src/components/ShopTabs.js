import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// import Material from '../pages/Material';
import Avatar from '@mui/material/Avatar';
import WorkOrders from '../pages/WorkOrders';
// import Tools from '../pages/Tools';
import Equipment from '../pages/Equipment';
import Doors from '../pages/Doors';
// import HandymanIcon from '@mui/icons-material/Handyman';
// import LayersIcon from '@mui/icons-material/Layers';
import FeedIcon from '@mui/icons-material/Feed';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ForkliftIcon from '../assets/icons/forklift.png';

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

export default function ShopTabs(props) {
    const { user, token, handleOpenSnackbar, darkState} = props
    const [value, setValue] = React.useState(0);
    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab icon={<MeetingRoomIcon />}  label="Doors" {...a11yProps(0)} />
                    <Tab icon={<FeedIcon />}  label="Work Orders" {...a11yProps(1)} />
                    <Tab icon={ <Avatar sx={{ width: '50px', height: '50px'}} src={ForkliftIcon} variant="square" />}  label="Equipment" {...a11yProps(2)} />
                    
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Doors
                    darkState={darkState}
                    user={user}
                    token={token}
                    handleOpenSnackbar={handleOpenSnackbar}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <WorkOrders/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Equipment/>
            </TabPanel>
            
        </Box>
    );
};