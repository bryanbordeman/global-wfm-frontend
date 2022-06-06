import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TaskList from './TaskList'

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
            <Box sx={{ p: 1, pt: 3 }}>
            <Typography>{children}</Typography>
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

    export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "center", width:"100%" }}>
            <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            >
                <Tab label="Sales/ Estimating" />
                <Tab label="Engineering" />
                <Tab label="Purchasing" />
                <Tab label="Accounting" />
                <Tab label="Field" />
                <Tab label="Shop" />
                <Tab label="General/ Misc." />
            </Tabs>
        </Box>
            <TabPanel value={value} index={0}>
                <TaskList values={'Sales'}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TaskList values={'Engineering'}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TaskList values={'Purchasing'}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <TaskList values={'Accounting'}/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <TaskList values={'Field'}/>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <TaskList values={'Shop'}/>
            </TabPanel>
            <TabPanel value={value} index={6}>
                <TaskList values={'Misc.'}/>
            </TabPanel>
        </Box>
    );
    }
