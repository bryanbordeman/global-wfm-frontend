import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ExpenseCard from '../components/ExpenseCard';
import ExpenseSummary from '../components/ExpenseSummary';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        // style={{ display: "flex", justifyContent: "center", width:"100%" }}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 0, pt: 3, mb:0, pb:0}}>
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

export default function ExpaneseTabs(props) {
    const [value, setValue] = React.useState(0);
    const { month, user } = props

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
                    <Tab icon={<CreditCardIcon />} label="Company Card" />
                    <Tab icon={<PaidOutlinedIcon />}label="Reimbursable" />
                    <Tab icon={<DirectionsCarFilledOutlinedIcon />}label="Miles" />
                </Tabs>
            </Box>
            <div  style={{ display: "flex", justifyContent: "center", width:"100%" }}>
                <TabPanel value={value} index={0}>
                    <ExpenseSummary
                        month={month}
                        value={'Company Card'}/>
                    <ExpenseCard 
                        user={user}
                        value={'Company Card'}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ExpenseSummary
                        month={month}
                        value={'Reimbursable'}/>
                    <ExpenseCard 
                        user={user}
                        value={'Reimbursable'}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ExpenseSummary
                        month={month}
                        value={'Miles'}/>
                    <ExpenseCard 
                        user={user}
                        value={'Miles'}/>
                </TabPanel>
            </div>
        </Box>
    );
}

