import React from 'react';
import { Container, Fab } from '@mui/material';
import TaskTabs from '../components/TaskTabs'
import AddIcon from '@mui/icons-material/Add';
import EmployeePicker from '../components/EmployeePicker';
import { Button, Stack } from '@mui/material';
import TaskSortBy from '../components/TaskSortBy';
import TaskSelectlist from '../components/TaskSelectList';

function Task(props) {
    const { user } = props
    const { token } = props
    const { handleOpenSnackbar } = props
    const [ employee, setEmployee ] = React.useState({})
    const [ taskList, setTaskList ] = React.useState({})

    const handleChangeEmployee = (newEmployee) => {
        setEmployee(newEmployee)
    }
    const handleChangeList = (newList) => {
        setTaskList(newList)
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
                            <div style={{width: '50%' }}>
                            <TaskSortBy/>
                            </div>
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
                        <div style={{marginBottom: '0.75rem'}}>
                            <EmployeePicker
                                user={user}
                                token={token}
                                handleChangeEmployee={handleChangeEmployee}/>
                        </div>
                        <div style={{marginBottom: '0.75rem'}}>
                            <TaskSelectlist
                                token={token}
                                handleOpenSnackbar={handleOpenSnackbar}
                                handleChangeList={handleChangeList}
                            />
                        </div>
                        {/* <TaskTabs list={taskList}/> */}
                        </div>
                    
                    {/* <Fab 
                        sx={{margin: 0,
                            top: 'auto',
                            // right: '20px',
                            bottom: '20px',
                            left: 'auto',
                            position: 'fixed'}}
                        color="primary" 
                        aria-label="add">
                        <AddIcon />
                    </Fab> */}
            </Container>
        </div>
    );
}

export default Task;


const taskList = [
    {
        "id": 2,
        "assignee": {
            "id": 2,
            "first_name": "Yvonne",
            "last_name": "Bordeman"
        },
        "project": {
            "id": 1,
            "number": "10022",
            "name": "National Double Doors",
            "is_active": true
        },
        "title": "Test Second User",
        "notes": "Testing 1234",
        "due": "2022-06-30",
        "created": "2022-06-28T05:52:35.621122-04:00",
        "is_complete": false,
        "is_deleted": false,
        "is_read": false,
        "completed": null,
        "updated": null,
        "tasklist": {
            "id": 2,
            "title": "Field",
            "show_completed": true
        },
        "subtasks": []
    },
    {
        "id": 1,
        "assignee": {
            "id": 1,
            "first_name": "Bryan",
            "last_name": "Bordeman"
        },
        "project": {
            "id": 1,
            "number": "10022",
            "name": "National Double Doors",
            "is_active": true
        },
        "title": "Test Task",
        "notes": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\r\n\r\n“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”\r\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.",
        "due": "2022-06-28",
        "created": "2022-06-28T04:40:04.885517-04:00",
        "is_complete": false,
        "is_deleted": false,
        "is_read": false,
        "completed": null,
        "updated": null,
        "tasklist": {
            "id": 2,
            "title": "Field",
            "show_completed": true
        },
        "subtasks": []
    }
]