import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TaskList from './TaskList'
import CompletedTaskList from './CompletedTaskList'
import { Badge } from '@mui/material';

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
            <Box sx={{ p: 1, pt: 3, mb:0, pb:0}}>
            <>{children}</>
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
        <Box sx={{ width: '100%', mb:2}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "center", width:"100%" }}>
            <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            >   
                <Tab label={<Badge 
                    badgeContent={4} 
                    color="error" 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    Sales/ Estimating
                </Badge>} />
                
                <Tab label="Engineering" />
                <Tab label="Purchasing" />
                <Tab label="Accounting" />
                <Tab label={<Badge 
                    badgeContent={0} 
                    color="error" 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    Field
                </Badge>} />
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
            <CompletedTaskList/>
        </Box>
    );
};
