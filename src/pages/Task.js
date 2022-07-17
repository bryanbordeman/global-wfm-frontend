import React from 'react';
import { Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EmployeePicker from '../components/EmployeePicker';
import { Button, Stack } from '@mui/material';
import TaskSortBy from '../components/TaskSortBy';
import TaskSelectlist from '../components/TaskSelectList';
import TaskDataService from '../services/Task.services';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import AddSubtaskForm from '../components/AddSubtaskForm';

function Task(props) {
    const { user } = props;
    const { token } = props;
    const { handleOpenSnackbar } = props;
    const [ employee, setEmployee ] = React.useState(null);
    const [ selectedList, setSelectedList ] = React.useState([]);
    const [ currentList, setCurrentList ] = React.useState('')
    const [ taskLists, setTaskLists ] = React.useState([]);
    const [ tasks, setTasks ] = React.useState([]);
    const [ subtask, setSubtask ] = React.useState({});
    const [ editTask, setEditTask ] = React.useState([]);
    const [ open, setOpen ] = React.useState(false);
    const [ editing, setEditing ] = React.useState(false);
    const [ openSubtaskForm, setOpenSubtaskForm ] = React.useState(false)
    // const forceUpdate = React.useCallback(() => setSelectedList([]), []);

    React.useEffect(() => {
        setSelectedList([]) // not a great solution to clear list after employee change
        retrieveTasks();
        retrieveTaskList();
        setCurrentList('')
    },[employee])

    React.useEffect(() => {
        if(currentList)
        retrieveList();
    },[currentList, tasks, open])

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


    const retrieveList = () => {
        if(employee)
        TaskDataService.getAssigneeList(token, employee.id, currentList.id)
        .then(response => {
            const result = response.data;
            let userResult = result.filter(task => task.created_by.id === user.id || user.id === task.assignee.id );
            setSelectedList(userResult);
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const createTask = () => {

    };

    const updateTask = (tasktId, data) => {
        // const tempSelectList = selectedList
        TaskDataService.updateTask(tasktId, data, token)
        .then(response => {
            // window.scrollTo(0, 0);
            handleOpenSnackbar('info', 'Due Date has been updated')
            retrieveTasks();
            // forceUpdate();
            // retrieveTaskList();
            // setSelectedList([]);
            // setSelectedList(tasks[`${editList.title}`])
            // console.log(tempSelectList)
            
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const completeSubtask = (subtaskId) => {
        TaskDataService.completeSubtask(subtaskId, token)
        .then(response => {
            retrieveList();
            // console.log(response)
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const updateSubtask = (tasktId, data) => {
        TaskDataService.updateSubtask(tasktId, data, token)
        .then(response => {
            handleOpenSnackbar('info', 'Due Date has been updated')
            retrieveTasks();     
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const deleteSubtask = (id) => {
        TaskDataService.deleteSubtask(id, token)
        .then(response => {
            window.scrollTo(0, 0);
            retrieveTasks(); 
            handleOpenSnackbar('error', 'Your subtask has been deleted')
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });

    };


    const handleChangeEmployee = (newEmployee) => {
        setEmployee(newEmployee)
    }
    const handleChangeList = (newList) => {
        setSelectedList(tasks[`${newList.title}`])
        // console.log(tasks[`${newList.title}`])
    }

    const handleOpenTaskForm = () => {
        setOpen(true)
    }

    const handleOpenSubtaskForm = (id) => {
        selectedList.map(task => {
            task.subtasks.map(sub => {
                if(sub.id === id) setSubtask(sub)
            });
        })
        setOpenSubtaskForm(true);
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
                                onClick={handleOpenTaskForm}
                            >Add</Button>
                            </div>
                        </Stack> 
                        <div style={{marginBottom: '0.75rem'}}>
                            <EmployeePicker
                                user={user}
                                employee={employee}
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
                                setCurrentList={setCurrentList}
                            />
                        </div>
                        {selectedList.length > 0? 
                        <TaskList
                            user={user}
                            selectedList={selectedList}
                            updateTask={updateTask}
                            // retrieveTasks={retrieveTasks}
                            // retrieveList={retrieveList}
                            handleOpenTaskForm={handleOpenTaskForm}
                            handleOpenSubtaskForm={handleOpenSubtaskForm}
                            setOpenSubtaskForm={setOpenSubtaskForm}
                            setEditing={setEditing}
                            completeSubtask={completeSubtask}
                        />
                        : '' }
                        </div>
                        <AddTaskForm
                            open={open}
                            expense={editTask}
                            setOpen={setOpen}
                            editing={editing}
                            setEditing={setEditing}
                            user={user}
                            token={token}
                            employee={employee}
                            handleChangeEmployee={handleChangeEmployee}
                            createExpense={createTask}
                            updateExpense={updateTask}
                        />

                        <AddSubtaskForm
                            setOpenSubtaskForm={setOpenSubtaskForm}
                            editing={editing}
                            setEditing={setEditing}
                            open={openSubtaskForm}
                            subtask={subtask}
                            setSubtask={setSubtask}
                            updateSubtask={updateSubtask}
                            deleteSubtask={deleteSubtask}
                        />

            </Container>
        </div>
    );
}

export default Task;
