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
import AddExpenseForm from '../components/AddExpenseForm';
import AddMileForm from './AddMileForm';
import Loading from '../components/Loading';

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
    const [ value, setValue ] = React.useState(0);
    const [ expenses, setExpenses ] = React.useState([]);
    const [ miles, setMiles ] = React.useState([]);
    const [ totalCreditCard, setTotalCreditCard ] = React.useState(0);
    const [ totalReimbursable, setTotalReimbursable ] = React.useState(0);
    const [ totalMiles, setTotalMiles ] = React.useState(0);
    const { month, user, employee, token, handleOpenSnackbar, 
        open, setOpen, handleChangeEmployee } = props;
    const { openMiles, setOpenMiles } = props;
    const { editing, setEditing, setTabIndex } = props;
    const [ editExpense, setEditExpense ] = React.useState({});
    const [ isLoading, setIsLoading ] = React.useState(false);
    

    React.useEffect(() => {
        retrieveExpenses();
        retrieveMiles();
    },[month, employee, token])

    React.useEffect(() => {
        setTabIndex(value);
    }, [value])

    const retrieveExpenses = () => {
        setIsLoading(true);
        user.is_staff? 
        ExpenseDataService.getAll(token, month)
        .then(response => {
            // !sort expense by user request
            const filteredEmployee = []
            if(employee){
                Object.values(response.data).find((obj) => {
                    if(obj.user.id === employee.id){
                        filteredEmployee.push(obj)
                    }
                return ''
                });
            };
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
        .catch( e => {
            console.log(e);
            setIsLoading(false);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
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
            setIsLoading(false);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    const createExpense = (data) => {
        const userId = user.is_staff ? Number(employee.id) : Number(user.id)
        
        ExpenseDataService.createExpense(data, token, userId)
        .then(response => {
            window.scrollTo(0, 0);
            handleOpenSnackbar('success', 'Your expense has been submitted for approval')
            retrieveExpenses();
        })
        .catch(e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const deleteExpense = (expenseId) => {
        ExpenseDataService.deleteExpense(expenseId, props.token)
        .then(response => {
            window.scrollTo(0, 0);
            handleOpenSnackbar('warning', 'Your expense has been deleted')
            retrieveExpenses();
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const updateExpense = (expenseId, data) => {
        ExpenseDataService.updateExpense(expenseId, data, token)
        .then(response => {
            window.scrollTo(0, 0);
            handleOpenSnackbar('info', 'Your expense has been submitted for approval')
            retrieveExpenses();
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    }

    const approveExpense = (expenseId) => {
        ExpenseDataService.approveExpense(expenseId, token)
        .then(response => {
            retrieveExpenses();
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const retrieveMiles = () => {
        setIsLoading(true);
        user.is_staff? 
        ExpenseDataService.getAllMiles(token, month)
            .then(response => {
                // !sort expense by user request
                const filteredEmployee = []
                if(employee){
                    Object.values(response.data).find((obj) => {
                        if(obj.user.id === employee.id){
                            filteredEmployee.push(obj)
                        }
                    return ''
                    });
                }
                setMiles(filteredEmployee);
                setTotalMiles(0)
                let newMilesTotal = 0
                for(let i = 0; i < filteredEmployee.length; i++) {
                    newMilesTotal += filteredEmployee[i].price
                    setTotalMiles(newMilesTotal)
                }
            })
            .catch( e => {
                console.log(e);
                setIsLoading(false);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            })
        :
        ExpenseDataService.getAllMiles(token, month)
        .then(response => {
            setMiles(response.data);
            setTotalMiles(0)
            for(let i = 0; i < response.data.length; i++) {
                setTotalMiles(totalMiles+ response.data[i].price)
            }
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const approveMile = (expenseId) => {
        ExpenseDataService.approveMile(expenseId, token)
        .then(response => {
            retrieveMiles();
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const deleteMile = (expenseId) => {
        ExpenseDataService.deleteMile(expenseId, props.token)
        .then(response => {
            window.scrollTo(0, 0);
            handleOpenSnackbar('error', 'Your miles have been deleted')
            retrieveMiles();
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const createMiles = (data) => {
        const userId = user.is_staff ? Number(employee.id) : Number(user.id)
        
        ExpenseDataService.createMile(data, token, userId)
        .then(response => {
            window.scrollTo(0, 0);
            handleOpenSnackbar('success', 'Your expense has been submitted for approval')
            retrieveMiles();
        })
        .catch(e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const updateMiles = (expenseId, data) => {
        ExpenseDataService.updateMile(expenseId, data, token)
        .then(response => {
            window.scrollTo(0, 0);
            handleOpenSnackbar('info', 'Your expense has been submitted for approval')
            retrieveMiles();
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
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
                <TabPanel value={value} index={0}>
                    <ExpenseSummary
                        month={month}
                        amount={totalCreditCard}
                        title={'Company Card'}/>
                    {expenses? (expenses.map(expense => (
                        !expense.is_reimbursable?
                        <ExpenseCard 
                            key={expense.id}
                            setOpen={setOpen}
                            setEditing={setEditing}
                            setEditExpense={setEditExpense}
                            expense={expense}
                            user={user}
                            deleteExpense={deleteExpense}
                            approveExpense={approveExpense}
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
                            setOpen={setOpen}
                            setEditing={setEditing}
                            setEditExpense={setEditExpense}
                            expense={expense}
                            user={user}
                            deleteExpense={deleteExpense}
                            approveExpense={approveExpense}
                        /> : ''
                    ))) : ''}
                </TabPanel>
                <TabPanel value={value} index={2} >
                    <ExpenseSummary
                        month={month}
                        amount={totalMiles}
                        title={'Miles'}/>
                    {miles? (miles.map(mile => (
                        <MileCard 
                            key={mile.id}
                            expense={mile}
                            setOpenMiles={setOpenMiles}
                            setEditing={setEditing}
                            setEditExpense={setEditExpense}
                            user={user}
                            deleteMile={deleteMile}
                            approveMile={approveMile}
                        />
                    ))) : ''}
                </TabPanel>
                <AddExpenseForm
                    open={open}
                    expense={editExpense}
                    setOpen={setOpen}
                    editing={editing}
                    setEditing={setEditing}
                    user={user}
                    token={token}
                    employee={employee}
                    handleChangeEmployee={handleChangeEmployee}
                    createExpense={createExpense}
                    updateExpense={updateExpense}
                />
                <AddMileForm
                    user={user}
                    token={token}
                    editing={editing}
                    expense={editExpense}
                    employee={employee}
                    openMiles={openMiles}
                    setOpenMiles={setOpenMiles}
                    handleChangeEmployee={handleChangeEmployee}
                    handleOpenSnackbar={handleOpenSnackbar}
                    createMiles={createMiles}
                    updateMiles={updateMiles}
                />
                <Loading
                    open={isLoading}
                />
        </Box>
    );
};