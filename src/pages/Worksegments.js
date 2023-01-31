import React, { useState, useEffect } from 'react';
import WorksegmentDataService from '../services/Worksegment.services';
import { Container, Typography, Button, Card, CardContent, Chip } from '@mui/material';
import { Paper, Grid, ListItem, IconButton, ListItemAvatar, ListItemText, Stack, Divider, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import WeekPicker from '../components/WeekPicker'
import Tooltip from '@mui/material/Tooltip';
import SpeakerNotesTwoToneIcon from '@mui/icons-material/SpeakerNotesTwoTone';
import moment from 'moment';

import AddWorksegmentForm from '../components/AddWorksegmentForm'
import DeleteWorksegmentModal from '../components/DeleteWorksegmentModal';

import EmployeePicker from '../components/EmployeePicker';
import Loading from '../components/Loading';
import { purple } from '@mui/material/colors';

function WorksegmentList(props) {
    const [ worksegments, setWorksegments ] = useState([]);
    const [ isoWeek, setIsoWeek ] = React.useState(moment(new Date()).format('GGGG[W]WW'));
    const [ openAdd, setOpenAdd ] = React.useState(false);
    const [ openDelete, setOpenDelete ] = React.useState(false);
    const [ editing, setEditing ] = React.useState(false);
    const [ editSegment, setEditSegment ] = React.useState({});
    const { user, token, handleOpenSnackbar } = props;
    const [ employee, setEmployee ] = React.useState({});
    const [ workTypes, setWorkTypes ] = React.useState([]);
    const [ isLoading, setIsLoading ] = React.useState(true);
    const [ totals, setTotals ] = React.useState('')

    React.useEffect(() => {
        recieveTypes();
    },[]);
    
    useEffect(() => {
        retrieveWorksegments();
    }, [token, isoWeek, employee,]);
    
    useEffect(() => {
        recieveTotals();
    }, [worksegments]);

    const recieveTypes = () => {
        // get work types [shop, field, office....]
        setIsLoading(true);
        WorksegmentDataService.getAllTypes(token)
        .then(response => {
            setWorkTypes(response.data);
        })
        .catch(e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const handleClickOpen = () => {
        // setEditing(false);
        setOpenAdd(true);
    };

    const retrieveWorksegments = () => {
        // get segments from API
        setIsLoading(true);
        user.is_staff? 
        WorksegmentDataService.adminGetWeek(props.token, isoWeek)
            .then(response => {
                // !sort segments by user request
                const filteredEmployee = []
                if(employee){
                    Object.values(response.data).find((obj) => {
                        if(obj.user.id === employee.id){
                            filteredEmployee.push(obj)
                        }
                    return ''
                    });
                }

                setWorksegments(filteredEmployee);
            })
            .catch( e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            })
        :
        WorksegmentDataService.getWeek(props.token, isoWeek)
            .then(response => {
                setWorksegments(response.data);
            })
            .catch( e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const createWorksegment = (data) => {
        const userId = user.is_staff ? Number(employee.id) : Number(user.id);
        setIsLoading(true);
        WorksegmentDataService.createWorksegment(data, token, userId)
        .then(response => {
            window.scrollTo(0, 0);
            handleOpenSnackbar('success', 'Your time has been submitted for approval')
            retrieveWorksegments();
            // setSubmitted(true);
            // setTimeout(() => {
            //     setSubmitted(true)
            // }, 3000);
        })
        .catch(e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const deleteWorksegment = (segmentId) => {
        setIsLoading(true);
        WorksegmentDataService.deleteWorksegment(segmentId, props.token)
        .then(response => {
            window.scrollTo(0, 0);
            handleOpenSnackbar('warning', 'Your time has been deleted')
            retrieveWorksegments();
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const updateWorksegment = (segmentId, data) => {
        setIsLoading(true);
        WorksegmentDataService.updateWorksegment(segmentId, data, props.token)
        .then(response => {
            window.scrollTo(0, 0);
            handleOpenSnackbar('info', 'Your time has been submitted for approval')
            retrieveWorksegments();
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const approveWorksegment = (segmentId) => {
        setIsLoading(true);
        WorksegmentDataService.approveWorksegment(segmentId, props.token)
        .then(response => {
            retrieveWorksegments();
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const recieveTotals = () => {
        // get total hours for all users in isoweek.
        const isAdmin = user.is_staff ? true : false;
        setIsLoading(true);
        WorksegmentDataService.getTotals(token, isoWeek)
        .then(response => {
            if(employee && isAdmin){
                // if user is admin
                setTotals(response.data.filter((d) => (d.user_id === String(employee.id)))[0]);
            }
            else if(employee){
                // if user is employee
                setTotals(response.data.filter((d) => (d.user_id === String(user.id)))[0]);
            }else{
                // if no employee is selected
                setTotals('')
            }
        })
        .catch(e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const getIsoWeek = (week) => {
        setIsoWeek(week)
    };

    const handleClickOpenDelete = (segment) => {
        setOpenDelete(true)
        setEditSegment(segment)
    };

    const handleClickOpenEdit = (segment) => {
        setEditing(true);
        handleClickOpen();
        setEditSegment(segment);
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleChangeEmployee = (newEmployee) => {
        setEmployee(newEmployee)
    };

    const segmentList = worksegments.map(segment => (
                <Paper
                    sx={{
                    my: 1,
                    width: '100%',
                    maxWidth: '500px',
                    borderWidth: `${segment.project && segment.project.id === 36 || segment.project && segment.project.id === 37? '3px' : '1px'}`,
                    borderColor: `${segment.project && segment.project.id === 36 || segment.project && segment.project.id === 37? purple[500] : 'primary.main'}`,
                    borderRadius: '16px',
                    }}
                    variant="outlined"
                    key={segment.id}
                >
                    <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                        <ListItem 
                            key={segment.id}
                            secondaryAction={
                                !segment.is_approved ?
                                <Stack spacing={2}>
                                    <IconButton
                                        color='primary'
                                        onClick={ () => {
                                            handleClickOpenEdit(segment)}}
                                        >
                                        <Edit/>
                                    </IconButton>
                                    <Divider />
                                    <IconButton 
                                        edge="end" 
                                        color="error"
                                        aria-label="delete"
                                        onClick={ () => {
                                            handleClickOpenDelete(segment)}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack> : ''
                            }
                        >
                            <ListItemAvatar
                            sx={{ 
                                marginRight: '1rem', 
                                marginBottom: '1rem',
                            }}
                            >
                                <Chip 
                                    sx={{ 
                                        marginTop: '1.5rem',
                                        marginBottom: '1.5rem',
                                    }}
                                    color={`${segment.is_approved ? 'success' : 'primary'}`}
                                    icon={segment.is_approved ? <CheckIcon /> : <QueryBuilderIcon/>} 
                                    label={`${segment.duration} ${segment.duration > 1 ? 'Hrs' : 'Hr'}`} 
                                    // variant="outlined" 
                                />
                                <Divider/>
                                <ListItemText
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: '1rem',
                                    }}
                                    key={segment.id}
                                    primary={user.is_staff ? 
                                        segment.is_approved ? 
                                        <Button 
                                            variant='outlined' 
                                            startIcon={<CheckBoxIcon />} 
                                            color='success'
                                            size='small'
                                            onClick={() => {approveWorksegment(segment.id)}}
                                            >Approved</Button> : 
                                        <Button 
                                            variant='outlined' 
                                            color='inherit'
                                            size='small'
                                            onClick={() => {approveWorksegment(segment.id)}}
                                            >Approve</Button> : 
                                        `${segment.is_approved ? 'Approved' : 'Pending'}`
                                        }
                                />
                            </ListItemAvatar>
                            <ListItemText
                                key={segment.id}
                                primary={
                                <div style={{fontWeight: '700', marginBottom: '.25rem'}}>
                                    {moment(segment.date).format("ddd, MMMM Do YYYY")}
                                </div>
                                }
                                secondary={
                                <>  
                                    {/* {user.is_staff? <Chip sx={{mb:1}}label={`${segment.user.first_name} ${segment.user.last_name}`} />:''} */}
                                    {user.is_staff? `${segment.user.first_name} ${segment.user.last_name}` :''}
                                    {user.is_staff? <br/> :''}
                                    {`${moment(segment.start_time, "HH:mm:ss").format("hh:mm A")} -  
                                    ${moment(segment.end_time, "HH:mm:ss").format("hh:mm A")}`}
                                    <br/>
                                    Type: {capitalizeFirstLetter(segment.segment_type.name)}
                                    <br/>
                                    {segment.quote?
                                    `Quote: ${segment.quote.number}`
                                    : ''}
                                    {segment.project?
                                    `Project: ${segment.project.number}`
                                    : ''}
                                    {segment.service?
                                    `Service: ${segment.service.number}`
                                    : ''}
                                    {segment.hse?
                                    `HSE: ${segment.hse.number}`
                                    : ''}
                                    <br/>
                                    {segment.quote?
                                    `Quote Name: ${segment.quote.name}`
                                    : ''}
                                    {segment.project?
                                    `Project Name: ${segment.project.name}`
                                    : ''}
                                    {segment.service?
                                    `Service Name: ${segment.service.name}`
                                    : ''}
                                    {segment.hse?
                                    `HSE Name: ${segment.hse.name}`
                                    : ''}
                                    <br/>
                                    Travel: {segment.travel_duration} {segment.travel_duration > 1 ? 'Hrs' : 'Hr'}
                                    <br/>
                                    Lunch: {segment.lunch ? 'Yes' : 'No'}
                                    <br/>
                                    {segment.notes ? <Tooltip title={segment.notes} enterTouchDelay={0}>
                                                        <IconButton size="small" aria-label="notes">
                                                            <SpeakerNotesTwoToneIcon />
                                                        </IconButton>
                                                    </Tooltip> : ''}
                                </>}
                            />
                        </ListItem>
                    </Grid>
                    </Grid>
                </Paper>
            ))
    return ( 
        <div>
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
            <WeekPicker 
                getIsoWeek={getIsoWeek}
            />
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
            <div style={{marginBottom: '0.75rem'}}>
                <EmployeePicker
                    user={user}
                    token={token}
                    handleChangeEmployee={handleChangeEmployee}/>
            </div> : ''
            }
            <Card 
                variant='outlined'
                sx={{
                    my: 1,
                    width: '100%',
                    maxWidth: '500px',
                    border: 0.5,
                    borderColor: 'primary.main',
                    borderRadius: '16px'
                    }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection:'column',
                    }}
                    >
                    <Typography style={{fontWeight: '700'}} mb={1} variant="h4" component="div">
                        {isoWeek}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                    Regular Hours: {totals? totals.regular : ''}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                    Travel Hours: {totals? totals.travel : ''}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                    Overtime Hours: {totals? totals.overtime : ''}
                    </Typography>
                    <Typography style={{fontWeight: '600'}} variant="body1" color="text.primary" gutterBottom>
                    Total Hours: {totals? totals.total_duration : ''}
                    </Typography>
                </CardContent>
                    
            </Card>
            </div>
            <AddWorksegmentForm 
                handleChangeEmployee={handleChangeEmployee}
                employee={employee}
                segment={editSegment}
                setSegment={setEditSegment}
                handleClickOpen={handleClickOpen}
                openAdd={openAdd}
                setOpenAdd={setOpenAdd}
                user={user}
                token={token}
                editing={editing}
                setEditing={setEditing}
                createWorksegment={createWorksegment}
                updateWorksegment={updateWorksegment}
                workTypes={workTypes}
            />

            {segmentList}

            <DeleteWorksegmentModal
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
                segment={editSegment}
                deleteWorksegment={deleteWorksegment}
                retrieveWorksegments={retrieveWorksegments}/>
            
        </Container>
        <Loading
            open={isLoading}
        />
    </div>
    );
}

export default WorksegmentList;