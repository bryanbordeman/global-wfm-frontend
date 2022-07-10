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
    const [ employee, setEmployee ] = React.useState(null)
    const [ selectedList, setSelectedList ] = React.useState([])
    const [ taskLists, setTaskLists ] = React.useState([]);
    const [ tasks, setTasks ] = React.useState([])
    // const forceUpdate = React.useCallback(() => setSelectedList([]), []);

    React.useEffect(() => {
        setSelectedList([]) // not a great solution to clear list after employee change
        retrieveTasks();
        retrieveTaskList();
        // setTimeout(function(){
        //     retrieveTaskList();
        // }, 100);
        // if(!employee){ 
        //     setSelectedList([])
        // };
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
        let allTasks= [];
        let tempObject = {};
        if(employee)
        TaskDataService.getAssigneeTasks(token, employee.id)
        .then(response => {
            allTasks = response.data;
            taskLists.map(list => {
                // sort results into taskObject
                let result = allTasks.filter(task => task.tasklist.id === list.id);
                // sort results based on user and assignee. If user === to assignee or user === created_by show task
                let userResult = result.filter(task => task.created_by.id === user.id || user.id === task.assignee.id )
                if(result) tempObject[`${list.title}`] = userResult
            })
            setTasks(tempObject);
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const updateTask = (tasktId, data, list) => {
        // const tempSelectList = selectedList
        TaskDataService.updateTask(tasktId, data, token)
        .then(response => {
            window.scrollTo(0, 0);
            handleOpenSnackbar('info', 'Due Date has been updated')
            retrieveTasks();
            // forceUpdate();
            // retrieveTaskList();
            // setSelectedList([]);
            // console.log(tempSelectList)
            
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
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
                            user={user}
                            selectedList={selectedList}
                            updateTask={updateTask}
                            retrieveTasks={retrieveTasks}
                        />
                        : '' }
                        </div>
            </Container>
        </div>
    );
}

export default Task;
