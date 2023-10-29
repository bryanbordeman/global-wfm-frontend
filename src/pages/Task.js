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
import TaskDialog from '../components/TaskDialog';
import Loading from '../components/Loading';

function Task(props) {
    const { user } = props;
    const { token } = props;
    const { handleOpenSnackbar, darkState } = props;
    const { employees } = props;
    const [ employee, setEmployee ] = React.useState(null);
    const [ selectedList, setSelectedList ] = React.useState([]); // current selected list task in progress
    const [ selectedCompleteList, setSelectedCompleteList ] = React.useState([]); // current selected list completed task
    const [ currentList, setCurrentList ] = React.useState('')
    const [ taskLists, setTaskLists ] = React.useState([]);
    const [ tasks, setTasks ] = React.useState([]);
    const [ subtask, setSubtask ] = React.useState({});
    const [ task, setTask ] = React.useState({});
    const [ sortBy, setSortBy ] = React.useState(1);
    const [ open, setOpen ] = React.useState(false);
    const [ editing, setEditing ] = React.useState(false);
    const [ openSubtaskForm, setOpenSubtaskForm ] = React.useState(false);
    const [ openDelete, setOpenDelete ] = React.useState(false);
    const [ openNextTask, setOpenNextTask ] = React.useState(false);
    const [ openTaskDialog, setOpenTaskDialog ] = React.useState(false);
    const [ isLoading, setIsLoading ] = React.useState(true);
    const [ isLoadingTask, setIsLoadingTask ] = React.useState(true);

    React.useEffect(() => {
            setSelectedList([]) // not a great solution to clear list after employee change
            retrieveTaskList();
            setCurrentList('');
            setSelectedCompleteList([]);
    },[employee]);

    React.useEffect(() => {
        sortList();
    },[sortBy]);

    React.useEffect(() => {
        //! look into this effect not effective.
        if(currentList) {
            retrieveList();
        };
    },[currentList, tasks, open]);

    //! ^^^ fix effect above to make sortList Function that doesnt require API call
    
    const retrieveTaskList = () => {
        setIsLoading(true);
        TaskDataService.getAllTaskList(token)
            .then(response => {
                // sort the select list
                retrieveTasks(response.data.sort((a, b) => (a.title > b.title) ? 1 : -1))
                setTaskLists(response.data.sort((a, b) => (a.title > b.title) ? 1 : -1));
                
            })
            .catch( e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const retrieveTasks = (inputList) => {
        setIsLoadingTask(true);
        let allTasks= [];
        let tempObject = {};
        setIsLoading(true);
        if(employee)
            TaskDataService.getAssigneeTasks(token, employee.id)
                .then(response => {
                    allTasks = response.data;
                    let list = inputList? inputList : taskLists // only use inputList on initial load
                    list.map(list => {
                        // sort results into taskObject
                        let result = allTasks.filter(task => task.tasklist.id === list.id);
                        // sort results based on user and assignee. If user === to assignee or user === created_by show task
                        let userResult = result.filter(task => task.created_by.id === user.id || user.id === task.assignee.id || task.is_public )
                        
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
                    setIsLoading(false);
                    handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
                })
                .finally(() => {
                    setIsLoading(false);
                    setIsLoadingTask(false);
                });
    };

    const sortList = (sort) => {
        const userResult = tasks[currentList.title]
        let projectSort = []
        let serviceSort = []
        let hseSort = []
        let QuoteSort = []
        let sortList = []

        if (userResult){
            // sort list
            switch(sort) {
                case (1):
                    // Due Date (Oldest to Newest
                    setSelectedList(userResult.sort((a, b) => (a.due > b.due) ? 1 : -1));
                break;
                case (2):
                    // Due Date (Newest to Oldest)
                    setSelectedList(userResult.sort((a, b) => (a.due < b.due) ? 1 : -1));
                break;
                case (3):
                    // Project (Descending)
                    userResult.forEach(task => {
                        if(task.project != null){
                            projectSort.push(task);
                        };
                        if(task.service != null){
                            serviceSort.push(task);
                        };
                        if(task.hse != null){
                            hseSort.push(task);
                        };
                        if(task.quote != null){
                            QuoteSort.push(task);
                        };
                        
                        projectSort.sort((a, b) => (a.project.number > b.project.number) ? 1 : -1);
                        serviceSort.sort((a, b) => (a.service.number > b.service.number) ? 1 : -1);
                        hseSort.sort((a, b) => (a.hse.number > b.hse.number) ? 1 : -1);
                        QuoteSort.sort((a, b) => (a.quote.number > b.quote.number) ? 1 : -1);
                    });
                    
                    sortList = QuoteSort.concat(projectSort, serviceSort, hseSort);
                    setSelectedList(sortList);
                    break;
                case (4):
                    // Task (Alphabetically)
                    setSelectedList(userResult.sort((a, b) => (a.title > b.title) ? 1 : -1));
                break;

                default:
                    setSelectedList(userResult);
            };
        };
    };

    const retrieveList = () => {
        setIsLoading(true);
        if(employee)
            TaskDataService.getAssigneeList(token, employee.id, currentList.id)
                .then(response => {
                    const result = response.data;
                    let userResult = result.filter(task => task.created_by.id === user.id || user.id === task.assignee.id  || task.is_public);
                    
                    // sort list
                    switch(sortBy) {
                        case (1):
                            setSelectedList(userResult);
                        break;
                        case (2):
                            setSelectedList(userResult.reverse());
                        break;
                        case (3):
                            let projectSort = []
                            let QuoteSort = []
                            userResult.forEach(task => {
                                if(task.project != null){
                                    projectSort.push(task);
                                }
                                if(task.quote != null){
                                    QuoteSort.push(task);
                                }
                                projectSort.sort((a, b) => (a.project.number > b.project.number) ? 1 : -1);
                                QuoteSort.sort((a, b) => (a.quote.number > b.quote.number) ? 1 : -1)
                            })
                            const sortList = projectSort.concat(QuoteSort);
                            setSelectedList(sortList)

                        break;
                        case (4):
                            setSelectedList(userResult.sort((a, b) => (a.title > b.title) ? 1 : -1));
                        break;
            
                        default:
                            setSelectedList(userResult);
                    }
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
                    setIsLoading(false);
                    handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
                })
                .finally(() => {
                    setIsLoading(false);
                });
    };

    const createTask = (data) => {
        setIsLoading(true);
        TaskDataService.createTask(data, token)
            .then(response => {
                window.scrollTo(0, 0);
                handleOpenSnackbar('success', 'Your Task has been created')
                retrieveTasks();
            })
            .catch(e => {
                console.log(e);
                setIsLoading(false);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const deleteTask = (id) => {
        setIsLoading(true);
        TaskDataService.deleteTask(id, token)
            .then(response => {
                handleOpenSnackbar('warning', 'Tasks has been deleted')
                retrieveTasks();
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

    const updateTask = (tasktId, data) => {
        setIsLoading(true);
        TaskDataService.updateTask(tasktId, data, token)
            .then(response => {
                handleOpenSnackbar('info', 'Tasks has been updated')
                retrieveTasks();
            })
            .catch( e => {
                console.log(e);
                setIsLoading(false);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const completeTask = () => {
        setIsLoading(true);
        TaskDataService.completeTask(task.id, token)
            .then(response => {
                retrieveList();
                retrieveTasks();
                setOpenNextTask(true);
                
            })
            .catch( e => {
                console.log(e);
                setIsLoading(false);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const readTask = (id) => {
        TaskDataService.readTask(id, token)
            .then(response => {
                retrieveTasks();
            })
            .catch( e => {
                console.log(e);
                setIsLoading(false);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
    };

    const uncompleteTask = (id) => {
        setIsLoading(true);
        TaskDataService.completeTask(id, token)
            .then(response => {
                retrieveList();
                retrieveTasks();
                
            })
            .catch( e => {
                console.log(e);
                setIsLoading(false);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const completeSubtask = (subtaskId) => {
        setIsLoading(true);
        TaskDataService.completeSubtask(subtaskId, token)
            .then(response => {
                retrieveList();
            })
            .catch( e => {
                console.log(e);
                setIsLoading(false);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const updateSubtask = (tasktId, data) => {
        setIsLoading(true);
        TaskDataService.updateSubtask(tasktId, data, token)
            .then(response => {
                handleOpenSnackbar('info', 'Subtask has been updated')
                retrieveTasks();     
            })
            .catch( e => {
                console.log(e);
                setIsLoading(false);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const deleteSubtask = (id) => {
        setIsLoading(true);
        TaskDataService.deleteSubtask(id, token)
            .then(response => {
                window.scrollTo(0, 0);
                retrieveTasks(); 
                handleOpenSnackbar('warning', 'Your subtask has been deleted')
            })
            .catch( e => {
                console.log(e);
                setIsLoading(false);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const createSubtask = (data) => {
        setIsLoading(true);
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
                taskData.project = task.project? task.project.id : ''
                taskData.service = task.service? task.service.id : ''
                taskData.hse = task.hse? task.hse.id : ''
                taskData.quote = task.quote? task.quote.id : ''
                taskData.tasklist = task.tasklist.id
                taskData.subtasks = task.subtasks.map(subT => (subT.id))
                // ......
                updateTask(task.id, taskData);
        
            })
            .catch( e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
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
                            <TaskSortBy
                                setSortBy={setSortBy}
                                sortList={sortList}
                            />
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
                                editing={true}
                                editObject={{user:user}}
                                employee={employee}
                                token={token}
                                handleChangeEmployee={handleChangeEmployee}
                                employees={employees}
                                />
                        </div>
                        <div style={{marginBottom: '0.75rem'}}>
                            <TaskSelectlist
                                isLoadingTask={isLoadingTask}
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
                            darkState={darkState}
                            setOpenTaskDialog={setOpenTaskDialog}
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
                            readTask={readTask}
                            setTask={setTask}
                            openDelete={openDelete}
                            setOpenDelete={setOpenDelete}
                        />
                        </Stack>
                        : '' }
                        <TaskCompletedList
                            user={user}
                            setTask={setTask}
                            setEditing={setEditing}
                            setOpenTaskDialog={setOpenTaskDialog}
                            uncompleteTask={uncompleteTask}
                            selectedCompleteList={selectedCompleteList}
                        />
                        </div>
                        <AddTaskForm
                            task={task}
                            open={open}
                            // editTask={editTask}
                            employees={employees}
                            setOpen={setOpen}
                            editing={editing}
                            setEditing={setEditing}
                            setIsLoading={setIsLoading}
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
                        <TaskDialog
                            task={task}
                            user={user}
                            editing={editing}
                            setEditing={setEditing}
                            handleOpenTaskForm={handleOpenTaskForm}
                            setOpenDelete={setOpenDelete}
                            setOpenTaskDialog={setOpenTaskDialog}
                            openTaskDialog={openTaskDialog}
                        />
                <Loading
                    open={isLoading}
                />
            </Container>
        </div>
    );
}

export default Task;
