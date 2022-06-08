import React from 'react';
import { Container, Fab } from '@mui/material';
import TaskTabs from '../components/TaskTabs'
import AddIcon from '@mui/icons-material/Add';
import EmployeePicker from '../components/EmployeePicker';

function Task(props) {
    const { user, token } = props
    const [ employee, setEmployee ] = React.useState({})

    const handleChangeEmployee = (newEmployee) => {
        setEmployee(newEmployee)
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
                        <div style={{width: '100%', marginTop: '1rem', marginBottom: '1rem'}}>
                        <EmployeePicker
                        handleChangeEmployee={handleChangeEmployee}
                        token={token}
                        />
                        </div>
                    <TaskTabs list={taskList}/>
                    <Fab 
                        sx={{margin: 0,
                            top: 'auto',
                            // right: '20px',
                            bottom: '20px',
                            left: 'auto',
                            position: 'fixed'}}
                        color="primary" 
                        aria-label="add">
                        <AddIcon />
                    </Fab>
            </Container>
        </div>
    );
}

export default Task;


const taskList = [
    {
        "id": 1,
        "title": "Estimate Project",
        "notes": "See folder for Plans",
        "due": "2022-06-10",
        "created": "2022-06-07T04:57:42.623047-04:00",
        "is_complete": false,
        "is_deleted": false,
        "is_read": false,
        "completed": null,
        "updated": null,
        "tasklist": {
            "id": 1,
            "title": "Sales/ Estimating",
            "show_completed": true
        },
        "assignee": {
            "id": 1,
            "password": "pbkdf2_sha256$320000$hQCF672CjQ5VgfmQcwA02z$/TQXapw74utdBKGLIl1+JJ+AoYMncLTEhun4Z5TasXE=",
            "last_login": "2022-06-07T04:30:51.064003-04:00",
            "is_superuser": true,
            "username": "bryanbordeman",
            "first_name": "Bryan",
            "last_name": "Bordeman",
            "email": "bryanbordeman@hotmail.com",
            "is_staff": true,
            "is_active": true,
            "date_joined": "2022-05-11T18:39:43-04:00",
            "groups": [],
            "user_permissions": []
        },
        "project": {
            "id": 1,
            "is_active": true,
            "number": "12345",
            "name": "Testing First Project from DB",
            "prevailing_rate": true,
            "travel_job": true,
            "notes": "sdcdscdscdsc",
            "project_category": 1,
            "project_type": 1,
            "address": 1,
            "customer_company": 1,
            "contact": [
                1,
                2
            ]
        },
        "subtasks": [
            {
                "id": 1,
                "title": "Test Sub Task",
                "notes": "",
                "due": "2022-06-07",
                "created": "2022-06-07T04:52:19.033943-04:00",
                "is_complete": false,
                "is_deleted": false,
                "completed": "2022-06-07T04:52:19.033993-04:00",
                "updated": "2022-06-07T04:52:19.034006-04:00"
            }
        ]
    }
]