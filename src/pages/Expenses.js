import React from 'react';
import { Container } from '@mui/material';
import MonthPicker from '../components/MonthPicker'
import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EmployeePicker from '../components/EmployeePicker';
import ExpenseTabs from '../components/ExpenseTabs';

export default function Expenses(props) {
    const { user, token, handleOpenSnackbar} = props
    const { employees } = props;
    const [ employee, setEmployee ] = React.useState({})
    const [ month, setMonth ] = React.useState(new Date())
    const [ open, setOpen ] = React.useState(false);
    const [ openMiles, setOpenMiles ] = React.useState(false);
    const [ editing, setEditing ] = React.useState(false);
    const [ tabIndex, setTabIndex ] = React.useState('')

    const handleClickOpen = () => {
        if(tabIndex === 2){
            setOpenMiles(true);
            setEditing(false);
        } else {
            setOpen(true);
            setEditing(false);
        }
    };
    
    const handleChangeEmployee = (newEmployee) => {
        setEmployee(newEmployee)
    };

    const handleChangeMonth = (newMonth) => {
        setMonth(newMonth)
    };

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
                                onClick={handleClickOpen}
                            >Add</Button>
                            </div>
                        </Stack>
                        {user.is_staff ? 
                        <div style={{marginBottom: '0.25rem'}}>
                            <EmployeePicker
                                user={user}
                                token={token}
                                handleChangeEmployee={handleChangeEmployee}
                                employees={employees}
                                />
                        </div> : ''
                        }
                    </div>
                    <ExpenseTabs
                        employees={employees}
                        setTabIndex = {setTabIndex}
                        editing={editing}
                        setEditing={setEditing}
                        employee={employee}
                        token={token}
                        handleOpenSnackbar={handleOpenSnackbar}
                        month={month}
                        user={user}
                        open={open}
                        setOpen={setOpen}
                        openMiles={openMiles}
                        setOpenMiles={setOpenMiles}
                        handleChangeEmployee={handleChangeEmployee}
                        />
            </Container>
        </div>
    );
};