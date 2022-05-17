import React, { useState, useEffect } from 'react';
import WorksegmentDataService from '../services/Worksegment.services'
import { Container, Typography, CardActions, Button, Card, CardContent, Chip } from '@mui/material';
import { Paper, Grid, ListItem, IconButton, ListItemAvatar, ListItemText, Stack, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import WeekPicker from '../components/WeekPicker'
import moment from 'moment';

import AddWorksegmentForm from './AddWorksegmentForm'


function WorksegmentList(props) {
    const [ worksegments, setWorksegments ] = useState([]);
    const [ isoWeek, setIsoWeek ] = React.useState(moment(new Date()).format('GGGG[W]WW'));
    const [ open, setOpen ] = React.useState(false);
    const { user, token } = props

    const [ editing, setEditing ] = React.useState(false)
    const [ submitted, setSubmitted ] = React.useState(false)

    useEffect(() => {
        retrieveWorksegments();
    }, [props.token, isoWeek]);

    const handleClickOpen = () => {
        setOpen(true);
        setEditing(false)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const retrieveWorksegments = () => {
        WorksegmentDataService.getWeek(props.token, isoWeek)
        .then(response => {
            setWorksegments(response.data);
        })
        .catch( e => {
            console.log(e)
        })
    };

    const createWorksegment = (data) => {
        WorksegmentDataService.createWorksegment(data, token)
        .then(response => {
            setSubmitted(true);
            setOpen(false)
            retrieveWorksegments()
        })
        .catch(e => {
            console.log(e)
        });
    };

    const deleteWorksegment = (segmentId) => {
        WorksegmentDataService.deleteWorksegment(segmentId, props.token)
        .then(response => {
            retrieveWorksegments();
        })
        .catch( e => {
            console.log(e)
        });
    };

    const approveWorksegment = (segmentId) => {
        WorksegmentDataService.approveWorksegment(segmentId, props.token)
        .then(response => {
            retrieveWorksegments();
            console.log("approve segment", segmentId)
        })
        .catch( e => {
            console.log(e)
        });
    };

    const getIsoWeek = (week) => {
        setIsoWeek(week)
    }

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
        }

        return {totalHours: totalHours, 
                totalTravelHours: totalTravelHours,
                totalRegularHours: totalRegularHours,
                totalOvertimeHours: totalOvertimeHours}
    }

    const totals = getTotalHours()

    const segmentList = worksegments.map(segment => (
                <Paper
                    sx={{
                    my: 2,
                    width: '100%',
                    maxWidth: '500px',
                    border: 1,
                    borderColor: 'primary.main',
                    borderRadius: '16px'
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
                                            // saveWorksegment(segment)
                                            setEditing(true)} }
                                        >
                                        <Edit/>
                                    </IconButton>
                                    <Divider />
                                    <IconButton 
                                        edge="end" 
                                        color="error"
                                        aria-label="delete"
                                        onClick={ () => deleteWorksegment(segment.id) } >
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
                                    primary={`${segment.is_approved ? 'Approved' : 'Pending'}`}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                key={segment.id}
                                primary={<div style={{fontWeight: 'bold'}}>{moment(segment.date).format("ddd, MMMM Do YYYY")}</div>}
                                secondary={
                                <>
                                    {`${moment(new Date(segment.date + ' ' + segment.start_time)).format('LT')} -  
                                    ${moment(new Date(segment.date + ' ' + segment.end_time)).format('LT')}`}
                                    <br/>
                                    Project: {segment.project}
                                    <br/>
                                    Travel: {segment.travel_duration} {segment.travel_duration > 1 ? 'Hrs' : 'Hr'}
                                </>}
                            />
                        </ListItem>
                    </Grid>
                    </Grid>
                </Paper>
            ))

    return ( 
        <Container
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection:'column',
            marginTop: '1rem',
        }}>
            <div  style={{width: '100%', maxWidth: '500px' }}>
            <Stack direction="row" spacing={2}>
            <WeekPicker 
                getIsoWeek={getIsoWeek}
            />
            <div style={{width: '50%'}}>
            <Button
                sx={{ height: '100%'}}
                fullWidth
                size="large"
                variant='outlined' 
                endIcon={<AddIcon />}
                onClick={handleClickOpen}
            >Add</Button>
            </div>
            </Stack>
            <Card 
                variant='outlined'
                sx={{
                    marginTop: '20px',
                    width: '100%',
                    maxWidth: '500px',
                    border: 1,
                    borderColor: 'primary.main',
                    borderRadius: '16px'
                    }}
                // sx={{ minWidth: 275, marginBottom: '20px', marginTop: '20px' }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection:'column',
                    }}
                    >
                    <Typography mb={1} variant="h4" component="div">
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
                    <Typography variant="body1" color="text.primary" gutterBottom>
                    Total Hours: {totals.totalHours}
                    </Typography>
                </CardContent>
                    
            </Card>
            </div>
            <AddWorksegmentForm 
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                open={open}
                user={user}
                token={token}
                editing={editing}
                createWorksegment={createWorksegment}/>
            {segmentList}
        </Container>
    );
}

export default WorksegmentList;