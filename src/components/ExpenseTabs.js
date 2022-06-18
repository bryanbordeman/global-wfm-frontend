import * as React from 'react';
import ExpenseDataService from '../services/Expense.services'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ExpenseCard from '../components/ExpenseCard';
import ExpenseSummary from '../components/ExpenseSummary';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    tabpanel: {
        // position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)'
        // width: '50%',
        // minWidth: '300px',
        // padding: 'auto',
        // margin: 'auto',
        // textAlign: 'center'
    }
});

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
            <Box sx={{ p: 0, pt: 3, mb:0, pb:0}}>
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

export default function ExpaneseTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [ expenses, setExpenses ] = React.useState([])
    const { month, user, employee, token, handleOpenSnackbar } = props

    React.useEffect(() => {
        retrieveExpenses()
    },[month, employee, token])

    const retrieveExpenses = () => {
        user.is_staff? ExpenseDataService.getAll(token, month)
        .then(response => {
            // !sort expense by user request
        const filteredEmployee = []
        if(employee){
        Object.values(response.data).find((obj) => {
            if(obj.user.id === employee.id){
                filteredEmployee.push(obj)
            }
        return ''
        });}

            setExpenses(filteredEmployee);
        })
        :
        ExpenseDataService.getAll(token, month)
        .then(response => {
            setExpenses(response.data);
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                >   
                    <Tab sx={{width: '50%'}} icon={<CreditCardIcon />} label="Company Card" />
                    <Tab sx={{width: '50%'}} icon={<PaidOutlinedIcon />}label="Reimbursable" />
                    <Tab sx={{width: '50%'}} icon={<DirectionsCarFilledOutlinedIcon />}label="Miles" />
                </Tabs>
            </Box>
                <TabPanel value={value} index={0} className={ classes.tabpanel }>
                    <ExpenseSummary
                        month={month}
                        value={'Company Card'}/>
                    {expenses? (expenses.map(expense => (
                        <ExpenseCard 
                            key={expense.id}
                            expense={expense}
                            user={user}
                            value={'Company Card'}/>
                    ))) : ''}
                </TabPanel>
                <TabPanel value={value} index={1} className={ classes.tabpanel }>
                    <ExpenseSummary
                        month={month}
                        value={'Reimbursable'}/>
                    {expenses? (expenses.map(expense => (
                        <ExpenseCard 
                            key={expense.id}
                            expense={expense}
                            user={user}
                            value={'Reimbursable'}/>
                    ))) : ''}
                </TabPanel>
                <TabPanel value={value} index={2} className={ classes.tabpanel }>
                    <ExpenseSummary
                        month={month}
                        value={'Miles'}/>
                    {expenses? (expenses.map(expense => (
                        <ExpenseCard 
                            key={expense.id}
                            expense={expense}
                            user={user}
                            value={'Miles'}/>
                    ))) : ''}
                </TabPanel>
        </Box>
    );
}