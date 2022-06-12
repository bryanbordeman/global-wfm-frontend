import React from 'react';
import { Container } from '@mui/material';
import MonthPicker from '../components/MonthPicker'
import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpenseCard from '../components/ExpenseCard';
import EmployeePicker from '../components/EmployeePicker';
import ExpenseSummary from '../components/ExpenseSummary';

function Expenses(props) {
    const { user, token } = props
    const [ employee, setEmployee ] = React.useState({})
    const [ month, setMonth ] = React.useState(new Date())
    
    const handleChangeEmployee = (newEmployee) => {
        setEmployee(newEmployee)
        console.log(newEmployee)
    }

    const handleChangeMonth = (newEMonth) => {
        setMonth(newEMonth)
    }
    return ( 
        <div style={{paddingTop: '1rem'}}> 
            <Container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection:'column',
                        height: '100%'
                    }}>
                    <div  style={{width: '100%', maxWidth: '500px' }}>
                    <Stack style={{marginBottom: '0.75rem', marginTop: '1.5rem',}}direction="row" spacing={2}>
                            <MonthPicker
                                handleChangeMonth={handleChangeMonth}/>
                            <div style={{width: '50%'}}>
                            <Button
                                sx={{ height: '100%'}}
                                fullWidth
                                size="large"
                                variant='contained' 
                                color='success'
                                endIcon={<AddIcon />}
                                // onClick={handleClickOpen}
                            >Add</Button>
                            </div>
                        </Stack>
                        {user.is_staff ? 
                        <div style={{marginBottom: '0.25rem'}}>
                            <EmployeePicker
                                user={user}
                                token={token}
                                handleChangeEmployee={handleChangeEmployee}/>
                        </div> : ''
                        }
                    </div>
                    <ExpenseSummary
                        month={month}/>
                    <ExpenseCard 
                        user={user}/>
            </Container>
        </div>
    );
}

export default Expenses;