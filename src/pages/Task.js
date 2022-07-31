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
import DeleteTaskModal from '../components/DeleteTaskModal';
import TaskCompletedList from '../components/TaskCompletedList';
import NextTaskDialog from '../components/NextTaskDialog'

function Task(props) {
    const { user } = props;
    const { token } = props;
    const { handleOpenSnackbar } = props;
    const [ employee, setEmployee ] = React.useState(null);
    const [ selectedList, setSelectedList ] = React.useState([]); // current selected list task in progress
    const [ selectedCompleteList, setSelectedCompleteList ] = React.useState([]); // current selected list completed task
    const [ currentList, setCurrentList ] = React.useState('')
    const [ taskLists, setTaskLists ] = React.useState([]);
    const [ tasks, setTasks ] = React.useState([]);
    const [ subtask, setSubtask ] = React.useState({});
    const [ task, setTask ] = React.useState({});
    // const [ editTask, setEditTask ] = React.useState([]);
    const [ open, setOpen ] = React.useState(false);
    const [ editing, setEditing ] = React.useState(false);
    const [ openSubtaskForm, setOpenSubtaskForm ] = React.useState(false);
    const [ openDelete, setOpenDelete ] = React.useState(false);
    const [ openNextTask, setOpenNextTask ] = React.useState(false);

    React.useEffect(() => {
        setSelectedList([]) // not a great solution to clear list after employee change
        retrieveTasks();
        retrieveTaskList();
        setCurrentList('');
        setSelectedCompleteList([]);
    },[employee])

    React.useEffect(() => {
        if(currentList)
        retrieveList();
        // retrieveCompletedTasks();
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
    };

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
                
                if(result) {
                    return tempObject[`${list.title}`] = userResult
                }else{
                    return userResult
                }
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
        });
        TaskDataService.getAssigneeListComplete(token, employee.id, currentList.id)
        .then(response => {
                // console.log(currentList.id)
            const result = response.data;
            let userResult = result.filter(task => task.created_by.id === user.id || user.id === task.assignee.id );
            setSelectedCompleteList(userResult);
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const createTask = (data) => {
        TaskDataService.createTask(data, token)
            .then(response => {
                window.scrollTo(0, 0);
                handleOpenSnackbar('success', 'Your Task has been created')
                retrieveTasks();
            })
            .catch(e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            });
    };

    const deleteTask = (id) => {
        TaskDataService.deleteTask(id, token)
        .then(response => {
            handleOpenSnackbar('error', 'Tasks has been deleted')
            retrieveTasks();
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    }

    const updateTask = (tasktId, data) => {
        TaskDataService.updateTask(tasktId, data, token)
        .then(response => {
            handleOpenSnackbar('info', 'Tasks has been updated')
            retrieveTasks();
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };
    const completeTask = () => {
        TaskDataService.completeTask(task.id, token)
        .then(response => {
            retrieveList();
            retrieveTasks();
            setOpenNextTask(true);
            
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const uncompleteTask = (id) => {
        TaskDataService.completeTask(id, token)
        .then(response => {
            retrieveList();
            retrieveTasks();
            
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
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const updateSubtask = (tasktId, data) => {
        TaskDataService.updateSubtask(tasktId, data, token)
        .then(response => {
            handleOpenSnackbar('info', 'Subtask has been updated')
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

    const createSubtask = (data) => {
        TaskDataService.createSubtask(data, token)
        .then(response => {
            setTask((prevState) => ({
                ...prevState,
                [prevState.subtasks]: prevState.subtasks.push(response.data),
            }))
            handleOpenSnackbar('success', 'Subtask has been created');
            //sanitize data before submitting for update
            const taskData = task
            taskData.assignee = task.assignee.id
            taskData.created_by = task.created_by.id
            taskData.project = task.project.id
            taskData.tasklist = task.tasklist.id
            taskData.subtasks = task.subtasks.map(subT => (subT.id))
            // ......
            updateTask(task.id, taskData);
    
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };
    
    const handleChangeEmployee = (newEmployee) => {
        setEmployee(newEmployee)
    };

    const handleChangeList = (newList) => {
        setSelectedList(tasks[`${newList.title}`]);
    };

    const handleOpenTaskForm = () => {
        setOpen(true);
    };

    const handleOpenSubtaskForm = (id) => {
        selectedList.map(task => {
            return (
            task.subtasks.map(sub => {
                if(sub.id === id) {
                    return setSubtask(sub)
                }else{
                    return ''
                }
            }))
        });
        setOpenSubtaskForm(true);
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
                        <Stack>
                        <TaskList
                            user={user}
                            task={task}
                            editing={editing}
                            selectedList={selectedList}
                            updateTask={updateTask}
                            handleOpenTaskForm={handleOpenTaskForm}
                            handleOpenSubtaskForm={handleOpenSubtaskForm}
                            setOpenSubtaskForm={setOpenSubtaskForm}
                            setEditing={setEditing}
                            completeSubtask={completeSubtask}
                            completeTask={completeTask}
                            setTask={setTask}
                            openDelete={openDelete}
                            setOpenDelete={setOpenDelete}
                        />
                        </Stack>
                        : '' }
                        <TaskCompletedList
                            user={user}
                            uncompleteTask={uncompleteTask}
                            selectedCompleteList={selectedCompleteList}
                        />
                        </div>
                        <AddTaskForm
                            task={task}
                            open={open}
                            // editTask={editTask}
                            setOpen={setOpen}
                            editing={editing}
                            setEditing={setEditing}
                            user={user}
                            token={token}
                            createTask={createTask}
                            updateTask={updateTask}
                            handleOpenSnackbar={handleOpenSnackbar}
                        />
                        <AddSubtaskForm
                            setOpenSubtaskForm={setOpenSubtaskForm}
                            editing={editing}
                            setEditing={setEditing}
                            open={openSubtaskForm}
                            subtask={subtask}
                            setSubtask={setSubtask}
                            updateSubtask={updateSubtask}
                            createSubtask={createSubtask}
                            deleteSubtask={deleteSubtask}
                        />

                        <DeleteTaskModal
                            deleteTask={deleteTask}
                            task={task}
                            openDelete={openDelete}
                            setOpenDelete={setOpenDelete}
                        />

                        <NextTaskDialog
                            setAddOpen={setOpen}
                            open={openNextTask}
                            setOpen={setOpenNextTask}
                        />

            </Container>
        </div>
    );
}

export default Task;
