import * as React from 'react';
import ContactServices from '../services/Contact.services';
import PhoneServices from '../services/Phone.services';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from '@mui/material/IconButton';
import ContactModal from './ContactModal';
import Loading from '../components/Loading';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    }));

    const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
    ))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));

export default function ProjectCard(props) {
    const { token } = props;
    const { project, menuSelection } = props;
    const [ openContactModal, setOpenContactModel ] = React.useState(false);
    const [ contacts, setContacts ] = React.useState([]);
    const [ contact, setContact ] = React.useState('');
    const didMount = React.useRef(false);
    const [ expanded, setExpanded ] = React.useState('panel1');
    const [ phones, setPhones ] = React.useState([]);
    const [ isLoading, setIsLoading ] = React.useState(true);

    React.useLayoutEffect(() => {
        if (didMount.current) {
            setPhones([]);
            if(contact.phone){
                contact.phone.map((p) => {
                    // check if already exisitng
                    if(!phones.find(e => e.id == p)){
                        // if not already in list get phone
                        recievePhone(p)
                    }
                })
            }
        } else {
            didMount.current = true;
        }
    }, [contact]);

    const handleChange = (panel) => (event, newExpanded) => {
        if(contacts.length > 0) 
            setExpanded(newExpanded ? panel : false);
    };

    React.useEffect(() => {
        if (didMount.current) {
            if(project.id){
                recieveContacts(project.id);
            }
        } else {
            didMount.current = true;
        }
    },[project]);

    const recieveContacts = (id) => {
        switch(menuSelection) {
            case 1:
                // console.log('Services')
                setIsLoading(true);
                ContactServices.getContactService(id, token)
                    .then(response => {
                        setContacts(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            break;
            case 2:
                // console.log("HSE's")
                setIsLoading(true);
                ContactServices.getContactHSE(id, token)
                    .then(response => {
                        setContacts(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            break;
            default:
                // console.log('Projects')
                setIsLoading(true);
                ContactServices.getContactProject(id, token)
                    .then(response => {
                        setContacts(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
        };
    };

    const handleOpenContact = (contact) => {
        setContact(contact);
        setOpenContactModel(!openContactModal);
    };

    const recievePhone = (id) => {
        setIsLoading(true);
        PhoneServices.getPhone(id, token)
            .then(response => {
                setPhones(oldArray => [...oldArray, response.data]);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
        
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
                    <div>
                        <Typography variant="body2" sx={{mt:2, mb:2}}>
                            Customer:
                        </Typography>
                            <Accordion key={project.customer.id} expanded={expanded === project.customer.id} onChange={handleChange(project.customer.id)}>
                                <AccordionSummary aria-controls={`${project.customer.id}-content`} id={`${project.customer.id}-header`}>
                                    <Typography>{project.customer.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{pb:0}}>
                                    {contacts.map((contact) => (
                                        <div key={contact.id}>
                                            <Stack direction="row" spacing={1}>
                                                <IconButton 
                                                    color="primary" 
                                                    sx={{mr:1, ml:0, mb:2}}
                                                    onClick={() => {handleOpenContact(contact)}}
                                                >
                                                    <LaunchIcon />
                                                </IconButton>
                                            <div>
                                                <Typography variant="body2">
                                                    {contact.name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: 14 }} color="text.secondary">
                                                    {contact.job_title}
                                                </Typography>
                                            </div>
                                            </Stack>
                                        </div>
                                    ))}
                                    <ContactModal
                                        contact={contact}
                                        phones={phones}
                                        setContact={setContact}
                                        open={openContactModal}
                                        setOpen={setOpenContactModel}
                                        isLoading={isLoading}
                                        company={project.customer}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </CardContent>
                    <CardActions>
                </CardActions>
            </Card>
            : ''}
            <Loading
                open={isLoading}
            />
        </>
    );
};
