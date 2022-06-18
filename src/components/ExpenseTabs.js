import * as React from 'react';
import ExpenseDataService from '../services/Expense.services'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ExpenseCard from '../components/ExpenseCard';
import MileCard from './MileCard';
import ExpenseSummary from '../components/ExpenseSummary';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';

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
    const [value, setValue] = React.useState(0);
    const [ expenses, setExpenses ] = React.useState([]);
    const [ totalCreditCard, setTotalCreditCard ] = React.useState(0);
    const [ totalReimbursable, setTotalReimbursable ] = React.useState(0);
    const { month, user, employee, token, handleOpenSnackbar } = props;
    

    React.useEffect(() => {
        retrieveExpenses();
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
            setTotalReimbursable(0)
            setTotalCreditCard(0)
            let newCreditCardTotal = 0
            let newReimbursableTotal = 0
            for(let i = 0; i < filteredEmployee.length; i++) {
                if(filteredEmployee[i].is_reimbursable){
                    newReimbursableTotal += filteredEmployee[i].price
                    setTotalReimbursable(newReimbursableTotal)
                } else {
                    newCreditCardTotal += filteredEmployee[i].price
                    setTotalCreditCard(newCreditCardTotal)
                }
            }
        })
        :
        ExpenseDataService.getAll(token, month)
        .then(response => {
            setExpenses(response.data);
            setTotalReimbursable(0)
            setTotalCreditCard(0)
            for(let i = 0; i < response.data.length; i++) {
                if(response.data[i].is_reimbursable){
                    setTotalReimbursable(totalReimbursable + response.data[i].price)
                } else {
                    setTotalCreditCard(totalCreditCard+ response.data[i].price)
                }
            }
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
                <TabPanel value={value} index={0} >
                    <ExpenseSummary
                        month={month}
                        amount={totalCreditCard}
                        title={'Company Card'}/>
                    {expenses? (expenses.map(expense => (
                        !expense.is_reimbursable?
                        <ExpenseCard 
                            key={expense.id}
                            expense={expense}
                            user={user}
                        /> : ''
                    ))) : ''}
                </TabPanel>
                <TabPanel value={value} index={1} >
                    <ExpenseSummary
                        month={month}
                        amount={totalReimbursable}
                        title={'Reimbursable'}/>
                    {expenses? (expenses.map(expense => (
                        expense.is_reimbursable?
                        <ExpenseCard 
                            key={expense.id}
                            expense={expense}
                            user={user}
                        /> : ''
                    ))) : ''}
                </TabPanel>
                <TabPanel value={value} index={2} >
                    <ExpenseSummary
                        month={month}
                        title={'Miles'}/>
                    {expenses? (expenses.map(expense => (
                        <MileCard 
                            key={expense.id}
                            expense={expense}
                            user={user}
                        />
                    ))) : ''}
                </TabPanel>
        </Box>
    );
}