import React, { useState, useEffect } from 'react';
import WorksegmentDataService from '../services/Worksegment.services'
import { Container, Typography, Button, Card, CardContent, Chip } from '@mui/material';
import { Paper, Grid, ListItem, IconButton, ListItemAvatar, ListItemText, Stack, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import WeekPicker from '../components/WeekPicker'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Tooltip from '@mui/material/Tooltip';
import SpeakerNotesTwoToneIcon from '@mui/icons-material/SpeakerNotesTwoTone';
import moment from 'moment';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import AddWorksegmentForm from '../components/AddWorksegmentForm'
import DeleteWorksegmentModal from '../components/DeleteWorksegmentModal';


function WorksegmentList(props) {
    const [ worksegments, setWorksegments ] = useState([]);
    const [ isoWeek, setIsoWeek ] = React.useState(moment(new Date()).format('GGGG[W]WW'));
    const [ openAdd, setOpenAdd ] = React.useState(false);
    const [ openDelete, setOpenDelete ] = React.useState(false);
    const { user, token, users } = props
    const [ editSegment, setEditSegment ] = React.useState({}) 

    const [ editing, setEditing ] = React.useState(false)
    const [ submitted, setSubmitted ] = React.useState(false)
    const [ edited, setEdited] = React.useState(false)
    const [ deleted, setDeleted ] = React.useState(false)
    const [ error, setError ] = React.useState(false)
    const [ selectUser, setSelectUser ] = React.useState('')
    const [ selectUserId, setSelectUserId ] = React.useState(0)

    useEffect(() => {
        retrieveWorksegments();
    }, [props.token, isoWeek, selectUser]);

    const handleClickOpen = () => {
        setOpenAdd(true);
        setEditing(false)
    };

    const handleClose = () => {
        setOpenAdd(false);
    };

    const retrieveWorksegments = () => {
        user.isStaff? WorksegmentDataService.adminGetWeek(props.token, isoWeek)
        .then(response => {
            // !sort segments by user request
        const filteredUser = []
        Object.values(response.data).find((obj) => {
            if(obj.user.id === selectUserId){
                filteredUser.push(obj)
            }
        return ''
        });

            setWorksegments(filteredUser);
        })
        .catch( e => {
            console.log(e);
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000);
        })
        :
        WorksegmentDataService.getWeek(props.token, isoWeek)
        .then(response => {
            setWorksegments(response.data);
            console.log(response.data)
        })
        .catch( e => {
            console.log(e);
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000);
        })
    }

    const createWorksegment = (data) => {
        user.isStaff? 
        WorksegmentDataService.adminCreateWorksegment(data, token, selectUserId)
        .then(response => {
            window.scrollTo(0, 0);
            retrieveWorksegments();
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false)
            }, 3000);
        })
        .catch(e => {
            console.log(e);
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000);
        }) :
        WorksegmentDataService.createWorksegment(data, token)
        .then(response => {
            window.scrollTo(0, 0);
            retrieveWorksegments();
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false)
            }, 3000);
        })
        .catch(e => {
            console.log(e);
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000);
        });
    };

    const deleteWorksegment = (segmentId) => {
        WorksegmentDataService.deleteWorksegment(segmentId, props.token)
        .then(response => {
            window.scrollTo(0, 0);
            retrieveWorksegments();
            setDeleted(true)
            setTimeout(() => {
                setDeleted(false)
            }, 3000)
        })
        .catch( e => {
            console.log(e);
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000);
        });
    };

    const updateWorksegment = (segmentId, data) => {
        WorksegmentDataService.updateWorksegment(segmentId, data, props.token)
        .then(response => {
            window.scrollTo(0, 0);
            retrieveWorksegments();
            setEdited(true);
            setTimeout(() => {
                setEdited(false)
            }, 3000);
            setEditing(false);
        })
        .catch( e => {
            console.log(e);
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000);
        });

    }

    const approveWorksegment = (segmentId) => {
        WorksegmentDataService.approveWorksegment(segmentId, props.token)
        .then(response => {
            retrieveWorksegments();
        })
        .catch( e => {
            console.log(e);
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000);
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
        setEditing(true)
        setOpenAdd(true)
        setEditSegment(segment)
    };

    const getTotalHours = () => {
        let totalHours = 0
        let totalTravelHours = 0

        for (let i = 0; i < worksegments.length; i++){
            totalHours += Number(worksegments[i].duration)
            totalTravelHours += Number(worksegments[i].travel_duration)
            }
        let totalRegularHours = totalHours - totalTravelHours
        let totalOvertimeHours = 0
        if(totalRegularHours > 40 ){
            totalOvertimeHours = totalRegularHours - 40
            totalRegularHours = 40
        }

        return {totalHours: totalHours, 
                totalTravelHours: totalTravelHours,
                totalRegularHours: totalRegularHours,
                totalOvertimeHours: totalOvertimeHours}
    }
    
    const handleSelectUser = (e) => {
        const selectedUser = e.target.value;
        setSelectUser(selectedUser);
        setSelectUserId(users[selectedUser].id)
    }

    const totals = getTotalHours()

    const usersList = Object.keys(users)

    const segmentList = worksegments.map(segment => (
                <Paper
                    sx={{
                    my: 1,
                    width: '100%',
                    maxWidth: '500px',
                    border: 0.5,
                    borderColor: 'primary.main',
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
                                    primary={user.isStaff ? 
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
                                <div style={{fontWeight: '700', marginBottom: '.5rem'}}>
                                    {moment(segment.date).format("ddd, MMMM Do YYYY")}
                                </div>
                                }
                                secondary={
                                <>
                                    {`${moment(segment.start_time, "HH:mm:ss").format("hh:mm A")} -  
                                    ${moment(segment.end_time, "HH:mm:ss").format("hh:mm A")}`}
                                    <br/>
                                    Project: {segment.project.number}
                                    <br/>
                                    Travel: {segment.travel_duration} {segment.travel_duration > 1 ? 'Hrs' : 'Hr'}
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
            {submitted ? 
            <Alert 
                sx={{marginBottom: '1rem', width: '100%', height: '100%'}}
                severity="success">
                <AlertTitle>Submitted</AlertTitle>
                Your time has been submitted for approval— <strong>Status = Pending</strong>
            </Alert> : ''}
            {edited ? 
            <Alert 
                sx={{marginBottom: '1rem', width: '100%', height: '100%'}}
                severity="info">
                <AlertTitle>Updated</AlertTitle>
                Your time has been submitted for approval— <strong>Status = Pending</strong>
            </Alert> : ''}
            {deleted ? 
            <Alert 
                sx={{marginBottom: '1rem', width: '100%'}}
                severity="error">
                <AlertTitle>Deleted</AlertTitle>
                Your time has been deleted
            </Alert> : ''}
            
            {error ? 
            <Alert 
                sx={{marginBottom: '1rem', width: '100%'}}
                severity="error">
                <AlertTitle>Error</AlertTitle>
                Something Went Wrong!! Please try again.
            </Alert> : ''}
            
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
            {user.isStaff ? 
            <div>
                <InputLabel id="employee-select-label">Employee</InputLabel>
                <Select
                fullWidth
                sx={{mb: 2}}
                labelId="employee-select-label"
                id="employees"
                value={selectUser}
                label="Employee"
                onChange={handleSelectUser}
                >
                {usersList.map((u, index) => {
                    return (
                    <MenuItem 
                        key={index} 
                        value={u}
                        >
                        {u}
                    </MenuItem>
                    )
                })}
                </Select>
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
                    Regular Hours: {totals.totalRegularHours}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                    Travel Hours: {totals.totalTravelHours}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                    Overtime Hours: {totals.totalOvertimeHours}
                    </Typography>
                    <Typography style={{fontWeight: '600'}} variant="body1" color="text.primary" gutterBottom>
                    Total Hours: {totals.totalHours}
                    </Typography>
                </CardContent>
                    
            </Card>
            </div>
            <AddWorksegmentForm 
                usersList={usersList}
                selectUser={selectUser}
                handleSelectUser={handleSelectUser}
                segment={editSegment}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                openAdd={openAdd}
                setOpenAdd={setOpenAdd}
                user={user}
                token={token}
                editing={editing}
                createWorksegment={createWorksegment}
                updateWorksegment={updateWorksegment}/>

            {segmentList}

            <DeleteWorksegmentModal
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
                segment={editSegment}
                deleteWorksegment={deleteWorksegment}
                retrieveWorksegments={retrieveWorksegments}/>
        </Container>
    </div>
    );
}

export default WorksegmentList;