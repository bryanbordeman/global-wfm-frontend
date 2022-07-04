import React from 'react';
import { Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EmployeePicker from '../components/EmployeePicker';
import { Button, Stack } from '@mui/material';
import TaskSortBy from '../components/TaskSortBy';
import TaskSelectlist from '../components/TaskSelectList';
import TaskDataService from '../services/Task.services';
import TaskList from '../components/TaskList';

function Task(props) {
    const { user } = props
    const { token } = props
    const { handleOpenSnackbar } = props
    const [ employee, setEmployee ] = React.useState({})
    const [ selectedList, setSelectedList ] = React.useState([])
    const [ taskLists, setTaskLists ] = React.useState([]);
    const [ tasks, setTasks ] = React.useState([])

    React.useEffect(() => {
        setSelectedList([]) // not a great solution to clear list after employee change
        retrieveTasks();
        setTimeout(function(){
            retrieveTaskList();
        }, 100);
        if(!employee){ 
            setSelectedList([])
        };
        // retrieveTaskList();
    },[employee])

    const retrieveTaskList = () => {
        TaskDataService.getAllTaskList(token)
        .then(response => {
            setTaskLists(response.data.sort((a, b) => (a.title > b.title) ? 1 : -1));
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
    }

    const retrieveTasks = () => {
        let tempList = []
        let tempObject = {}
        if (employee){
        taskLists.map( list => {
            TaskDataService.getAll(token, employee.id, list.id)
            .then(response => {
                tempList.push(response.data);
                tempObject[`${list.title}`] = response.data
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        })
        setTasks(tempObject)
        // console.log(tempObject)
    }
    }

    const handleChangeEmployee = (newEmployee) => {
        setEmployee(newEmployee)
    }
    const handleChangeList = (newList) => {
        setSelectedList(tasks[`${newList.title}`])
        // console.log(tasks[`${newList.title}`])
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
                                tasks={tasks}
                                taskLists={taskLists}
                                employee={employee}
                                token={token}
                                handleOpenSnackbar={handleOpenSnackbar}
                                handleChangeList={handleChangeList}
                            />
                        </div>
                        {selectedList.length > 0? 
                        <TaskList
                            selectedList={selectedList}/>
                        : '' }
                        {/* {selectedList? selectedList.map((task, key) =>(
                            <div style={{marginBottom: '.5rem'}} key={key}> {task.title} <br/> </div>
                        )) : ''} */}
                        </div>
            </Container>
        </div>
    );
}

export default Task;


// const tasks = [
//     {
//         "id": 2,
//         "assignee": {
//             "id": 1,
//             "first_name": "Bryan",
//             "last_name": "Bordeman"
//         },
//         "project": {
//             "id": 1,
//             "number": "10022",
//             "name": "National Double Doors",
//             "is_active": true
//         },
//         "title": "Test Second User",
//         "notes": "Testing 1234",
//         "due": "2022-06-30",
//         "created": "2022-06-28T05:52:35.621122-04:00",
//         "is_complete": false,
//         "is_deleted": false,
//         "is_read": false,
//         "completed": null,
//         "updated": null,
//         "tasklist": {
//             "id": 2,
//             "title": "Field",
//             "show_completed": true
//         },
//         "subtasks": []
//     },
//     {
//         "id": 1,
//         "assignee": {
//             "id": 1,
//             "first_name": "Bryan",
//             "last_name": "Bordeman"
//         },
//         "project": {
//             "id": 1,
//             "number": "10022",
//             "name": "National Double Doors",
//             "is_active": true
//         },
//         "title": "Test Task",
//         "notes": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\r\n\r\n“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”\r\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.",
//         "due": "2022-06-28",
//         "created": "2022-06-28T04:40:04.885517-04:00",
//         "is_complete": false,
//         "is_deleted": false,
//         "is_read": false,
//         "completed": null,
//         "updated": null,
//         "tasklist": {
//             "id": 2,
//             "title": "Field",
//             "show_completed": true
//         },
//         "subtasks": []
//     },
//     {
//         "id": 1,
//         "assignee": {
//             "id": 1,
//             "first_name": "Bryan",
//             "last_name": "Bordeman"
//         },
//         "project": {
//             "id": 1,
//             "number": "10022",
//             "name": "National Double Doors",
//             "is_active": true
//         },
//         "title": "Test Task",
//         "notes": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\r\n\r\n“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”\r\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.",
//         "due": "2022-06-28",
//         "created": "2022-06-28T04:40:04.885517-04:00",
//         "is_complete": false,
//         "is_deleted": false,
//         "is_read": false,
//         "completed": null,
//         "updated": null,
//         "tasklist": {
//             "id": 2,
//             "title": "Field",
//             "show_completed": true
//         },
//         "subtasks": []
//     },
//     {
//         "id": 1,
//         "assignee": {
//             "id": 1,
//             "first_name": "Bryan",
//             "last_name": "Bordeman"
//         },
//         "project": {
//             "id": 1,
//             "number": "10022",
//             "name": "National Double Doors",
//             "is_active": true
//         },
//         "title": "Test Task",
//         "notes": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\r\n\r\n“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”\r\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.",
//         "due": "2022-06-28",
//         "created": "2022-06-28T04:40:04.885517-04:00",
//         "is_complete": false,
//         "is_deleted": false,
//         "is_read": false,
//         "completed": null,
//         "updated": null,
//         "tasklist": {
//             "id": 2,
//             "title": "Field",
//             "show_completed": true
//         },
//         "subtasks": []
//     }
// ]