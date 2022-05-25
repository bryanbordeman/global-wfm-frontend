import React from 'react';
import LoginMessage from '../components/LoginMessage';
import AnnouncementDataService from '../services/Announcement.services'
import { Paper, Grid, ListItem, ListItemText, Container, Divider } from '@mui/material';

function Announcements(props) {
    const { user } = props
    const [ announcements, setAnnouncements ] = React.useState([])

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
            key={announcement.id}
        >
            <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs zeroMinWidth>
                <ListItem 
                    key={announcement.id}
                >
                    <ListItemText
                        key={announcement.id}
                        primary={
                        <div style={{fontWeight: '700', marginBottom: '.5rem'}}>
                            {announcement.title}
                            <Divider/>
                        </div>
                        }
                        secondary={announcement.memo}
                    />
                </ListItem>
            </Grid>
            </Grid>
        </Paper>
    ))

    return ( 
        <div>
            {!user.username ? 
            <div>
            <LoginMessage/>
            </div>
            : 
            <div style={{paddingTop: '1rem'}}> 
                <Container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection:'column',
                        height: '100%'
                    }}>
                        {announcementList}
                </Container>
            </div>
            }
        </div>
     );
}

export default Announcements;