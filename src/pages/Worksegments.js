import React, { useState, useEffect } from 'react';
import WorksegmentDataService from '../services/Worksegment.services';
import PTOServices from '../services/PTO.services';
import { Container, Typography, Button, Card, CardContent, Chip } from '@mui/material';
import { Paper, Grid, ListItem, IconButton, ListItemAvatar, ListItemText, Stack, Divider, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import SickIcon from '@mui/icons-material/Sick';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import WeekPicker from '../components/WeekPicker'
import Tooltip from '@mui/material/Tooltip';
import SpeakerNotesTwoToneIcon from '@mui/icons-material/SpeakerNotesTwoTone';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import AddWorksegmentForm from '../components/AddWorksegmentForm'
import DeleteWorksegmentModal from '../components/DeleteWorksegmentModal';
import AddPTOForm from '../components/AddPTOForm';

import EmployeePicker from '../components/EmployeePicker';
import Loading from '../components/Loading';
import { purple, pink} from '@mui/material/colors';

export default function WorksegmentList(props) {
    const { user, token, handleOpenSnackbar, darkState } = props;
    const { worksegments, setWorksegments } = props;
    const { totals, setTotals } = props;
    const { PTOsegments, setPTOsegments } = props;
    const { isoWeek, setIsoWeek } = props;
    const { employees } = props;

    const [ isAdmin, setIsAdmin ] = React.useState(false);
    const [ isSegment, setIsSegment ] = React.useState(false);


    const [ openAdd, setOpenAdd ] = React.useState(false);
    const [ openDelete, setOpenDelete ] = React.useState(false);
    const [ editing, setEditing ] = React.useState(false);
    const [ editSegment, setEditSegment ] = React.useState({});
    const [ employee, setEmployee ] = React.useState({});
    const [ workTypes, setWorkTypes ] = React.useState([]);
    const [ isLoading, setIsLoading ] = React.useState(true);
    
    const [ openAddPTO, setOpenAddPTO ] = React.useState(false);
    const [ PTOsegment, setSegmentPTO ] = React.useState({});
    const [ editingPTO, setEditingPTO ] = React.useState(false);


    //! employee view not working
    //! segments don't load with only PTO
    //! dashboard don't load with only PTO
    //! totals update doesn't work when subracting.

    React.useEffect(() => {
        recieveTypes();
    },[]);

    React.useEffect(() => {
        //* set admin
        if(user.is_staff ){
            setIsAdmin(true);
        };
    },[]);

    React.useEffect(() => {
        //* set isSegment
        if(
            worksegments.filter((s) => 
            user.is_staff && employee? s.user.id === employee.id : s.user.id === user.id).length > 0 
            ||
            PTOsegments.filter((s) => 
            user.is_staff && employee? s.user.id === employee.id : s.user.id === user.id).length > 0 
            )
            {
                setIsSegment(true)
            }else{
                setIsSegment(false)
            }
    },[employee, worksegments, PTOsegments]);

    const replaceAt = (array, index, value) => {
        const ret = array.slice(0);
        ret[index] = value;
        return ret;
    };

    const recalculateTotal = (segment, type, operation) => {
        // types = 1: work segment, 2: PTO segment
        // operations = 1: add, 2: subtract, 3: update
        let userTotalsList = totals.filter((t) => Number(t.user_id) === segment.user.id)[0];
        let currentIndex =  totals.indexOf(totals.find((t) => Number(t.user_id) === segment.user.id));
        let segments = []
        let newTotals = {
            'isoweek': userTotalsList? userTotalsList.isoweek : isoWeek,
            'overtime': '0.00',
            'regular': '0.00',
            'sick': '0.00',
            'total_duration': '0.00',
            'travel': '0.00',
            'user_id': userTotalsList? userTotalsList.user_id : employee.length > 0 ? String(employee.id) : String(user.id),
            'user_name': userTotalsList? userTotalsList.user_name : employee.length > 0 ? `${employee.first_name} ${employee.last_name}` :`${user.first_name} ${user.last_name}`,
            'vacation': '0.00',
        }
        //* worksegments
        if(type === 1){
            newTotals.sick = userTotalsList? userTotalsList.sick : '0.00'
            newTotals.vacation = userTotalsList? userTotalsList.vacation : '0.00'
            // get segments for employee or user
            segments = worksegments.filter((s) => 
            isAdmin && employee? s.user.id === employee.id : s.user.id === user.id)
            
            if(operation === 1){
                // add
                segments.push(segment)
            }
            if(operation === 2){
                // subtract
                segments = segments.filter((s) => s.id !== segment.id)
            }
            if(operation === 3){
                // update
                let currentIndex =  segments.indexOf(segments.find((q) => q.id === segment.id));
                let updatedWorksegments = replaceAt(segments,currentIndex, segment); // replace segment with updated segment 
                segments = updatedWorksegments
            }
            

            //* update new totals
            segments.map((s) => {
                newTotals.regular = String((Number(newTotals.regular) + Number(s.duration)).toFixed(2))
                newTotals.travel = String((Number(newTotals.travel) + Number(s.travel_duration)).toFixed(2))
            })

            newTotals.regular = String((Number(newTotals.regular) - Number(newTotals.travel)).toFixed(2))
            if(Number(newTotals.regular) > 40){
                newTotals.overtime = String((Number(newTotals.regular) - 40).toFixed(2))
                newTotals.regular = "40.00"
            }
        }
        if(type === 2){
            newTotals.regular = userTotalsList? userTotalsList.regular : '0.00'
            newTotals.travel = userTotalsList? userTotalsList.travel : '0.00'
            newTotals.overtime = userTotalsList? userTotalsList.overtime : '0.00'
            // get segments for employee or user
            segments = PTOsegments.filter((s) => 
            isAdmin && employee? s.user.id === employee.id : s.user.id === user.id)
            
            if(operation === 1){
                // add
                segments.push(segment)
            }
            if(operation === 2){
                // subtract
                segments = segments.filter((s) => s.id !== segment.id)
            }
            if(operation === 3){
                let currentIndex =  segments.indexOf(segments.find((q) => q.id === segment.id));
                let updatedPTOsegments = replaceAt(segments,currentIndex, segment ) // replace segment with updated segment
                segments = updatedPTOsegments // set list of segments
            }
            
            segments.map((s) => {
                if(s.PTO_type === 'Sick'){
                    newTotals.sick = String((Number(newTotals.sick) + Number(s.duration)).toFixed(2))
                }else{
                    newTotals.vacation = String((Number(newTotals.vacation) + Number(s.duration)).toFixed(2))
                }
            })
        }

        //* add all totals
        newTotals.total_duration = String((Number(newTotals.regular) +
                                    Number(newTotals.travel) +
                                    Number(newTotals.overtime) +
                                    Number(newTotals.sick) +
                                    Number(newTotals.vacation)).toFixed(2));
        //* set new totals 
        if(userTotalsList){
            setTotals(replaceAt(totals, currentIndex, newTotals));
        }else{
            setTotals(oldArray => [newTotals, ...oldArray]);
        };
    };

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

    const createWorksegment = (data) => {
        const userId = isAdmin? Number(employee.id) : Number(user.id);
        WorksegmentDataService.createWorksegment(data, token, userId)
        .then(response => {
            let data = response.data
            recalculateTotal(data, 1, 1);
            //* update list
            setWorksegments(oldArray => [data, ...oldArray]);
            handleOpenSnackbar('success', 'Your time has been submitted for approval')
        })
        .catch(e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
    };

    const deleteWorksegment = (segmentId) => {
        WorksegmentDataService.deleteWorksegment(segmentId, props.token)
        .then(response => {
            const data = worksegments.find((p) => p.id === segmentId);
            recalculateTotal(data, 1, 2);
            //* remove from segment list
            setWorksegments(worksegments.filter((p) => p.id !== segmentId))
            handleOpenSnackbar('warning', 'Your time has been deleted')
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const updateWorksegment = (segmentId, data) => {
        WorksegmentDataService.updateWorksegment(segmentId, data, token)
        .then(response => {
            //! update worksegmentList
            // update segment card
            let data = response.data;
            data.user = isAdmin? employee : user; // clean data. need user object not pk
            let currentIndex =  worksegments.indexOf(worksegments.find((q) => q.id === segmentId));
            let updatedWorksegments = replaceAt(worksegments,currentIndex, data); // replace segment with updated segment
            setWorksegments(updatedWorksegments); // set list of segments
            recalculateTotal(data, 1, 3);
            handleOpenSnackbar('info', 'Your time has been submitted for approval')
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const approveWorksegment = (segmentId) => {
        WorksegmentDataService.approveWorksegment(segmentId, props.token)
        .then(response => {
            let data = worksegments.find((s) => s.id === segmentId)
            data.user = employee // clean data. need user object not pk
            let id = data.id
            data.is_approved = !data.is_approved
            let currentIndex =  worksegments.indexOf(worksegments.find((q) => q.id === id));
            let updatedWorksegments = replaceAt(worksegments,currentIndex, data ) // replace segment with updated segment
            setWorksegments(updatedWorksegments) // set list of segments
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
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

    const handleClickOpenEditPTO = (segment) => {
        setEditingPTO(true);
        handleClickOpenPTO();
        setSegmentPTO(segment);
    };


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleChangeEmployee = (newEmployee) => {
        setEmployee(newEmployee)
    };

    // ------------ PTO --------------- //

    const handleClickOpenPTO = () => {
        setOpenAddPTO(!openAddPTO)
    };

    const approvePTO = (segmentId) => {
        PTOServices.approvePTO(segmentId, token)
        .then(response => {
            let data = PTOsegments.find((s) => s.id === segmentId)
            data.user = employee // clean data. need user object not pk
            let id = data.id
            data.is_approved = !data.is_approved
            let currentIndex =  PTOsegments.indexOf(PTOsegments.find((q) => q.id === id));
            let updatedPTOsegments = replaceAt(PTOsegments,currentIndex, data ) // replace segment with updated segment
            setPTOsegments(updatedPTOsegments) // set list of segments
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const createPTO = (data) => {
        const userId = isAdmin ? Number(employee.id) : Number(user.id);
        PTOServices.createPTO(data, token, userId)
        .then(response => {
            let data = response.data
            data.user = isAdmin ? employee : user; // clean data. need user object not pk
            recalculateTotal(data, 2, 1);
            setPTOsegments(oldArray => [data, ...oldArray]);
            handleOpenSnackbar('success', 'Your PTO has been submitted for approval')
        })
        .catch(e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const deletePTO = (segment) => {
        PTOServices.deletePTO(segment.id, props.token)
        .then(response => {
            recalculateTotal(segment, 2, 2);
            setPTOsegments(PTOsegments.filter((p) => p.id !== segment.id))
            handleOpenSnackbar('warning', 'Your PTO has been deleted')
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const updatePTO = (segmentId, data) => {
        PTOServices.updatePTO(segmentId, data, props.token)
        .then(response => {
            // update segment card
            let data = response.data
            data.user = employee // clean data. need user object not pk
            let id = data.id
            let currentIndex =  PTOsegments.indexOf(PTOsegments.find((q) => q.id === id));
            let updatedPTOsegments = replaceAt(PTOsegments,currentIndex, data ) // replace segment with updated segment
            setPTOsegments(updatedPTOsegments) // set list of segments
            recalculateTotal(data, 2, 3);
            handleOpenSnackbar('info', 'Your PTO has been updated')
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const PTOsegmentList = 
            PTOsegments ? 
            PTOsegments.filter((s) => 
                isAdmin && employee? s.user.id === employee.id : s.user.id === user.id)
                .map(segment => (
                <Paper
                    sx={{
                    my: 1,
                    width: '100%',
                    maxWidth: '500px',
                    borderWidth: darkState? '1.5px' :'3px',
                    borderColor:  segment.PTO_type === 'Sick'? 'warning.main' : purple[500],
                    borderRadius: '16px', 
                    }}
                    variant="outlined"
                    key={segment.id}
                >
                    <div
                    style={{
                        position: 'relative'
                    }}
                    >
                        <div
                            style={{position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                margin: '5px',
                                zIndex: 1
                                }}
                        >
                        {segment.PTO_type === 'Sick'? 
                            <SickIcon
                                fontSize='large'
                                color='warning'
                            />
                        :
                        <BeachAccessIcon
                            fontSize='large'
                            sx={{color: purple[500]}}
                        />
                        }
                        </div>
                    </div>
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
                                                handleClickOpenEditPTO(segment)}}
                                            >
                                            <Edit/>
                                        </IconButton>
                                        <Divider />
                                        <IconButton 
                                            edge="end" 
                                            color="error"
                                            aria-label="delete"
                                            onClick={ () => {
                                                deletePTO(segment)}}
                                            >
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
                                            marginTop: '2.5rem',
                                            marginBottom: '1.5rem',
                                            // backgroundColor: segment.PTO_type === 'Sick'? 'warning.main' : purple[500]
                                        }}
                                        // color={`${purple[500]}`}
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
                                                onClick={() => {approvePTO(segment.id)}}
                                                >Approved</Button> : 
                                            <Button 
                                                variant='outlined' 
                                                color='inherit'
                                                size='small'
                                                onClick={() => {approvePTO(segment.id)}}
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
                                        Type: {capitalizeFirstLetter(segment.PTO_type)}
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
        )) : ''

    const segmentList = 
                worksegments ? 
                worksegments.filter((s) => 
                    isAdmin && employee? s.user.id === employee.id : s.user.id === user.id)
                    .map(segment => (
                <Paper
                    sx={{
                    my: 1,
                    width: '100%',
                    maxWidth: '500px',
                    borderColor: `${segment.project && segment.project.prevailing_rate === true? pink[500] : 'primary.main'}`,
                    borderWidth: darkState? '1.5px' :'3px',
                    // borderColor: 'primary.main',
                    borderRadius: '16px',
                    }}
                    variant="outlined"
                    key={segment.id}
                >
                    <div
                    style={{
                        position: 'relative'
                    }}
                    >
                        <div
                            style={{position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                margin: '5px',
                                zIndex: 1
                                }}
                        >
                        {segment.project.prevailing_rate === true? 
                            <Typography color={pink[500]} sx={{ml: 1}} variant="h6" gutterBottom>
                                PR
                            </Typography>
                        :
                        ''
                        }
                        </div>
                    </div>
                    
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
                                    {isAdmin? `${segment.user.first_name} ${segment.user.last_name}` :''}
                                    {isAdmin? <br/> :''}
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
            )) : ''

    const totalsList = 
            totals ? 
                totals.filter((t) => 
                    isAdmin && employee? Number(t.user_id) === employee.id : Number(t.user_id) === user.id)
                    .map(total => (
            <div 
            key={uuidv4()}
            style={{textAlign: 'center'}}
            >
                    <Typography style={{fontWeight: '700'}} mb={1} variant="h4" component="div">
                        {isoWeek}
                    </Typography>
                    {Number(total.regular) > 0?
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Regular Hours: {total.regular}
                    </Typography>
                    :''}
                    {Number(total.travel) > 0?
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Travel Hours: {total.travel}
                    </Typography>
                    :''}
                    {Number(total.overtime) > 0?
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Overtime Hours: {total.overtime}
                    </Typography>
                    :''}
                    {Number(total.sick) > 0?
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Sick Hours: {total.sick}
                    </Typography>
                    :''}
                    {Number(total.vacation) > 0?
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Vacation Hours: {total.vacation}
                    </Typography>
                    :''}
                    <Typography style={{fontWeight: '600'}} variant="body1" color="text.primary" gutterBottom>
                        Total Hours: {total.total_duration}
                    </Typography>
            </div>
            ))
            : ''
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
                variant='outlined' 
                color='warning'
                endIcon={<AddIcon />}
                onClick={handleClickOpenPTO}
            >PTO</Button>
            </div>
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
            {isAdmin ? 
            <div style={{marginBottom: '0.75rem'}}>
                <EmployeePicker
                    user={user}
                    token={token}
                    employees={employees}
                    handleChangeEmployee={handleChangeEmployee}/>
            </div> : ''
            }
            {employee && isSegment?
            <Card 
                variant='outlined'
                sx={{
                    my: 1,
                    width: '100%',
                    maxWidth: '500px',
                    border: 0.5,
                    borderWidth: darkState? '1.5px' :'3px',
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
                    {totalsList}
                </CardContent>
            </Card>
            :
            <Typography variant="body2" color="text.secondary" gutterBottom>
                {employee ? `No hours recorded for ${isoWeek}` : ''}
            </Typography>
            }
            </div>
            {employee && isSegment?
            <>
                {segmentList}
                {PTOsegmentList}
            </>
            : ''}
            <AddWorksegmentForm 
                handleChangeEmployee={handleChangeEmployee}
                employee={employee}
                employees={employees}
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
            <AddPTOForm
                user={user}
                token={token}
                employee={employee}
                employees={employees}
                handleChangeEmployee={handleChangeEmployee}
                openAddPTO={openAddPTO}
                setOpenAddPTO={setOpenAddPTO}
                PTOsegment={PTOsegment}
                setSegmentPTO={setSegmentPTO}
                editing={editingPTO}
                setEditing={setEditingPTO}
                createPTO={createPTO}
                updatePTO={updatePTO}
            />

            <DeleteWorksegmentModal
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
                segment={editSegment}
                deleteWorksegment={deleteWorksegment}
                // retrieveWorksegments={retrieveWorksegments}
                />
            
        </Container>
        <Loading
            open={isLoading}
        />
    </div>
    );
};