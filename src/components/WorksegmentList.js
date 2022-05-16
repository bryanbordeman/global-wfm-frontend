import React, { useState, useEffect } from 'react';
import WorksegmentDataService from '../services/Worksegment.services'
import { Container, Typography, CardActions, Button, Card, CardContent, Chip } from '@mui/material';
import { Paper, Grid, ListItem, IconButton, ListItemAvatar, ListItemText, Stack, Divider } from '@mui/material';


import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CheckIcon from '@mui/icons-material/Check';
import WeekPicker from '../components/WeekPicker'
import moment from 'moment';


function WorksegmentList(props) {
    const [ worksegments, setWorksegments ] = useState([]);
    const [ isoWeek, setIsoWeek ] = React.useState(moment(new Date()).format('GGGG[W]WW'));

    useEffect(() => {
        retrieveWorksegments();
    }, [props.token, isoWeek]);

    const retrieveWorksegments = () => {
        WorksegmentDataService.getWeek(props.token, isoWeek)
        .then(response => {
            setWorksegments(response.data);
        })
        .catch( e => {
            console.log(e)
        })
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
                                        marginTop: '1rem',
                                        marginBottom: '1rem',
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
                                primary={<div style={{textDecoration: 'underline'}}>{moment(segment.date).format("ddd, MMMM Do YYYY")}</div>}
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
            <div  style={{marginBottom: '20px', marginTop: '20px' }}>
            <WeekPicker 
                getIsoWeek={getIsoWeek}
            />
            <Card 
                variant='outlined'
                sx={{
                    marginTop: '20px',
                    width: '100%',
                    maxWidth: '500px',
                    }}
                // sx={{ minWidth: 275, marginBottom: '20px', marginTop: '20px' }}
            >
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Regular Hours: {totals.totalRegularHours}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Travel Hours: {totals.totalTravelHours}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Overtime Hours: {totals.totalOvertimeHours}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Total Hours: {totals.totalHours}
                    </Typography>
                </CardContent>
                    
            </Card>
            </div>
            {/* {worksegments.map((segment) => {
                return (
                    <Card 
                        key={segment.id}
                        variant='outlined'
                        sx={{ minWidth: 275, marginBottom: '20px' }}
                    >                    
                        <CardContent>
                            <Chip 
                                color={`${segment.is_approved ? 'success' : 'primary'}`}
                                sx={{marginBottom: '10px'}}
                                icon={segment.is_approved ? <CheckIcon /> : <QueryBuilderIcon/>} 
                                label={`${segment.duration} ${segment.duration > 1 ? 'Hrs' : 'Hr'}`} 
                                variant="outlined" 
                            />
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Date: {moment(segment.date).format("ddd, MMMM Do YYYY")}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {moment(new Date(segment.date + ' ' + segment.start_time)).format('LT')} -  
                            {moment(new Date(segment.date + ' ' + segment.end_time)).format('LT')}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Project Number: {segment.project}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Travel: {segment.travel_duration}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Status: {segment.is_approved ? 'Approved' : 'Pending'}
                            </Typography>
                        </CardContent>
                        {!segment.is_approved ? 
                        <CardActions>
                            <Button size="small" variant='outlined'>Edit</Button>
                            <Button 
                                size="small" 
                                color='error' 
                                variant='outlined'
                                onClick={() => {deleteWorksegment(segment.id)}}
                            >Delete</Button>
                        </CardActions>
                        : ''}
                    </Card>
                    )
            })} */}
            {segmentList}
        </Container>
    );
}

export default WorksegmentList;