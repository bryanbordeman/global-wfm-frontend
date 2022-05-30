import React from 'react';
import AnnouncementDataService from '../services/Announcement.services'
import { Paper, Grid, ListItem, ListItemText, Container, Divider, Stack, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AddAnnouncementForm from '../components/AddAnnouncementForm';
import DeleteAnnouncementModal from '../components/DeleteAnnouncementModal';
import moment from 'moment';

function Announcements(props) {
    const [ announcements, setAnnouncements ] = React.useState([])
    
    const [ openAdd, setOpenAdd ] = React.useState(false);
    const [ openDelete, setOpenDelete ] = React.useState(false);
    const { user, token} = props
    const [ editAnnouncement, setEditAnnouncement ] = React.useState({}) 

    const [ editing, setEditing ] = React.useState(false)
    const [ submitted, setSubmitted ] = React.useState(false)
    const [ edited, setEdited] = React.useState(false)
    const [ deleted, setDeleted ] = React.useState(false)
    const [ error, setError ] = React.useState(false)

    React.useEffect(() => {
        retrieveAnnouncements()
    },[])

    const retrieveAnnouncements = () => {
        AnnouncementDataService.getAll(props.token)
        .then(response => {
            setAnnouncements(response.data);
        })
        .catch( e => {
            console.log(e);
        })
    }

    const createAnnouncement = (data) => {
        AnnouncementDataService.createAnnouncement(data, token)
        .then(response => {
            window.scrollTo(0, 0);
            retrieveAnnouncements();
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

    const updateAnnouncement = (announcementId, data) => {
        AnnouncementDataService.updateAnnouncement(announcementId, data, token)
        .then(response => {
            window.scrollTo(0, 0);
            retrieveAnnouncements();
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

    };

    const deleteAnnouncement = (announcementId) => {
        AnnouncementDataService.deleteAnnouncement(announcementId, token)
        .then(response => {
            window.scrollTo(0, 0);
            retrieveAnnouncements();
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

    const handleClickOpen = () => {
        setOpenAdd(true);
        setEditing(false)
    };

    const handleClose = () => {
        setOpenAdd(false);
    };

    const handleClickOpenEdit = (announcement) => {
        setEditing(true)
        setOpenAdd(true)
        setEditAnnouncement(announcement)
    };

    const handleClickOpenDelete = (announcement) => {
        setOpenDelete(true)
        setEditAnnouncement(announcement)
    };

    const announcementList = announcements.map(announcement => (
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
            key={announcement.title}
        >
            <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs zeroMinWidth>
                
                <ListItem 
                    key={announcement.title}         
                >
                    <ListItemText
                        key={announcement.title}
                        primary={
                        <Stack direction="row" spacing={1}>
                            <div style={{fontWeight: '600', fontSize: '1.5rem', marginBottom: '.5rem'}}>
                                {announcement.title}
                                {/* <Divider/> */}
                            </div>
                            {user.isStaff?
                            <div style={{marginLeft: 'auto'}} >
                            <Stack direction="row" spacing={1}>
                            <IconButton
                                color='primary'
                                onClick={ () => {
                                    handleClickOpenEdit(announcement)}}
                                >
                                <Edit/>
                            </IconButton>
                            <Divider orientation="vertical" flexItem/>
                            <IconButton 
                                edge="end" 
                                color="error"
                                aria-label="delete"
                                onClick={ () => {
                                    handleClickOpenDelete(announcement)}}
                                    >
                                <DeleteIcon />
                            </IconButton>
                            </Stack>
                            </div> : '' }
                        </Stack> 
                        }
                        secondary={
                            <>
                            {`Date Posted: ${moment(announcement.created).format("ddd, MMMM Do YYYY")}`}
                            <br/>
                            {``}
                            <br/>
                            {`${announcement.memo}`}
                            </>}
                    />
                </ListItem>
            </Grid>
            </Grid>
        </Paper>
    ))

    return ( 
        <div>
            <div style={{paddingTop: '1rem'}}> 
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
                                <AlertTitle>Posted</AlertTitle>
                                Your announcement has been posted— <strong>Status = Posted</strong>
                            </Alert> : ''}
                            {edited ? 
                            <Alert 
                                sx={{marginBottom: '1rem', width: '100%', height: '100%'}}
                                severity="info">
                                <AlertTitle>Updated</AlertTitle>
                                Your announcement has been posted— <strong>Status = Updated</strong>
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

                    {user.isStaff?
                    <div style={{width: '10rem', marginBottom: '.5rem', marginTop: '.35rem'}}>
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
                    : ''}
                        {announcementList}
                </Container>
            </div>
            <DeleteAnnouncementModal
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
                announcement={editAnnouncement}
                deleteAnnouncement={deleteAnnouncement}
                retrieveAnnouncements={retrieveAnnouncements}/>

            <AddAnnouncementForm
                announcement={editAnnouncement}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                openAdd={openAdd}
                setOpenAdd={setOpenAdd}
                user={user}
                token={token}
                editing={editing}
                createAnnouncement={createAnnouncement}
                updateAnnouncement={updateAnnouncement}/>
        </div>
     );
}

export default Announcements;