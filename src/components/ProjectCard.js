import * as React from 'react';
import ContactServices from '../services/Contact.services';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Avatar, Divider, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CompanyContactList from './CompanyContactList';

export default function ProjectCard(props) {
const { user, token } = props
const { project, handleSetContact } = props
const [ contacts, setContacts ] = React.useState([]);
const didMount = React.useRef(false);

React.useEffect(() => {
    if (didMount.current) {
        if(project.id){
            recieveContacts(project.id)
        }
    } else {
        didMount.current = true;
    }
},[project]);

const recieveContacts = (id) => {
    ContactServices.getContactProject(id, token)
    .then(response => {
        setContacts(response.data)
        // handleOpenSnackbar('info', 'Company was updated')
    })
    .catch(e => {
        console.log(e);
        // handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
    });
}
    
return (
    <>
        {project.number ? 
        <Card 
            elevation={0}
            sx={{
                my: 1,
                width: '100%',
                maxWidth: '400px',
                border: 0.5,
                borderColor: 'primary.main',
                borderRadius: '16px',
                marginTop: '1rem'
            }}
            variant="outlined"
            >
            <CardContent>
                <Typography variant="h5" component="div">
                    {project.number}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {project.name}
                </Typography>
                <Divider/>
                <Stack 
                    direction="row" 
                    spacing={2} 
                    sx={{mt:2, mb:2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%'}}>
                    {project.address?
                    <>
                    <div style={{paddingLeft: 0}}>
                        <Typography variant="body2">
                            Project Address:
                        </Typography>
                        <a href={`http://maps.google.com/?q=${project.address.address}, ${project.address.city}, ${project.address.state} ${project.address.postal_code}`} 
                            target="_blank"
                            rel="noopener noreferrer" 
                        >
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {project.address.address}
                                <br/>
                                {`${project.address.city}, ${project.address.state} ${project.address.postal_code}`}
                                <br/>
                                {project.address.country === 'US'? '' : project.address.country}
                            </Typography>
                        </a>
                        
                    </div>
                    
                    <Divider orientation="vertical" flexItem/>
                    </>
                    : ''}
                    <div>
                        <Typography variant="body2">
                            Project Category:
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {project.project_category.name}
                        </Typography>
                        <Typography variant="body2">
                            Project Type:
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {project.project_type.name}
                        </Typography>
                    </div>
                </Stack>
                <Divider/>
                <Stack 
                    direction="row" 
                    spacing={2} 
                    sx={{mt:2, mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%'}}
                    >
                <div>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="body2">
                            Prevailing Rate
                        </Typography>
                        <Typography variant="body2">
                            {project.prevailing_rate ? <CheckCircleOutlineIcon color='success'/> : <HighlightOffIcon color='error'/>}
                        </Typography>
                    </Stack>
                </div>
                {/* <Divider orientation="vertical" flexItem/> */}
                <div>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="body2">
                            Travel Job
                        </Typography>
                        <Typography variant="body2">
                            {project.travel_job ? <CheckCircleOutlineIcon color='success'/> : <HighlightOffIcon color='error'/>}
                        </Typography>
                    </Stack>
                </div>
                </Stack>
                <Divider sx={{mt:2}}/>
                <CompanyContactList
                    customer={project.customer}
                    contacts={contacts}
                    project={project}
                    //! need to add project type for service and HSE
                />
{/* 
                {project.contact.map(contact => (
                    <div key={contact.name}>
                        <Button sx={{
                            textTransform: 'unset !important',
                            p: 0,
                            mt: 1}}
                            onClick={() => {handleSetContact(contact)}}
                            >
                        <Chip
                            avatar={<Avatar 
                                    alt={`${contact.name}`}
                                    src="/broken-image.jpg"
                                    />}
                            label={`${contact.name}`}
                            variant="outlined"
                        />
                        </Button>
                    </div>
                ))}
                <Divider sx={{mt:2}}/>
                <Typography variant="body2" sx={{mt:2}}>
                    Customer:
                </Typography>
                <Button sx={{
                        textTransform: 'unset !important',
                        p: 0,
                        mt: 1}}
                        // onClick={() => {handleSetContact(contact)}}
                        >
                    <Chip
                        avatar={<Avatar 
                                alt={`${project.customer_company.name}`}
                                src="/broken-image.jpg"
                                />}
                        label={`${project.customer_company.name}`}
                        variant="outlined"
                    />
                </Button> */}

                
                </CardContent>
                <CardActions>
                {/* <Button size="small">Edit</Button> */}
            </CardActions>
        </Card>
        : ''}
    </>
);
}
