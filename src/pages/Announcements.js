import React from 'react';
import AnnouncementDataService from '../services/Announcement.services'
import { Paper, Grid, ListItem, ListItemText, Container, Divider, Stack, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add';
import AddAnnouncementForm from '../components/AddAnnouncementForm';
import DeleteAnnouncementModal from '../components/DeleteAnnouncementModal';
import moment from 'moment';

function Announcements(props) {
    const [ announcements, setAnnouncements ] = React.useState([])
    
    const [ openAdd, setOpenAdd ] = React.useState(false);
    const [ openDelete, setOpenDelete ] = React.useState(false);
    const { user, token, handleOpenSnackbar} = props
    const [ editAnnouncement, setEditAnnouncement ] = React.useState({}) 
    const [ editing, setEditing ] = React.useState(false)

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
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
    }

    const createAnnouncement = (data) => {
        AnnouncementDataService.createAnnouncement(data, token)
        .then(response => {
            window.scrollTo(0, 0);
            handleOpenSnackbar('success', 'Your announcement has been posted')
            retrieveAnnouncements();
        })
        .catch(e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });
    };

    const updateAnnouncement = (announcementId, data) => {
        AnnouncementDataService.updateAnnouncement(announcementId, data, token)
        .then(response => {
            window.scrollTo(0, 0);
            retrieveAnnouncements();
            handleOpenSnackbar('info', 'Your announcement has been updated')
            setEditing(false);
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });

    };

    const deleteAnnouncement = (announcementId) => {
        AnnouncementDataService.deleteAnnouncement(announcementId, token)
        .then(response => {
            window.scrollTo(0, 0);
            retrieveAnnouncements();
            handleOpenSnackbar('error', 'Your announcement has been deleted')
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
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
                            {user.is_staff?
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
                            <span style={{whiteSpace: 'pre-line'}}>{announcement.memo}</span>
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
                    {user.is_staff?
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