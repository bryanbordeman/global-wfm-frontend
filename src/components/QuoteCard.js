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
import moment from 'moment';
import { NumericFormat } from 'react-number-format';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ContactModal from './ContactModal';

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

export default function QuoteCard(props) {
    const { quote, user, token } = props
    const [ openContactModal, setOpenContactModel ] = React.useState(false);
    const [ contacts, setContacts ] = React.useState([]);
    const [ contact, setContact ] = React.useState('');
    const [ company, setCompany ] = React.useState('');
    const [ expanded, setExpanded ] = React.useState('panel1');
    const [ phones, setPhones ] = React.useState([]);
    const didMount = React.useRef(false);

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
            if(quote.id){
                recieveContacts(quote.id);
            }
        } else {
            didMount.current = true;
        }
    },[quote]);

    const recieveContacts = (id) => {
        ContactServices.getContactQuote(id, token)
        .then(response => {
            setContacts(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const handleOpenContact = (contact, company) => {
        setContact(contact);
        setCompany(company);
        setOpenContactModel(!openContactModal);
    };

    const recievePhone = (id) => {
        PhoneServices.getPhone(id, token)
            .then(response => {
                setPhones(oldArray => [...oldArray, response.data]);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <>
            {quote.number ? 
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
                        {quote.number}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {quote.name}
                    </Typography>
                    <Divider/>
                    <Typography sx={{ mb: 1.5, mt: 1.5 }} variant="body2">
                        Due Date: {moment(quote.due).format("MMM Do YYYY")}
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
                        {quote.address?
                        <>
                        <div style={{paddingLeft: 0}}>
                            <Typography variant="body2">
                                Project Address:
                            </Typography>
                            <Link href={`http://maps.google.com/?q=${quote.address.address}, ${quote.address.city}, ${quote.address.state} ${quote.address.postal_code}`} 
                                target="_blank"
                                rel="noopener noreferrer" 
                            >
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {quote.address.address}
                                    <br/>
                                    {`${quote.address.city}, ${quote.address.state} ${quote.address.postal_code}`}
                                    <br/>
                                    {quote.address.country === 'US'? '' : quote.address.country}
                                </Typography>
                            </Link>
                            
                        </div>
                        
                        <Divider orientation="vertical" flexItem/>
                        </>
                        : ''}
                        <div>
                            <Typography variant="body2">
                                Project Category:
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {quote.project_category.name}
                            </Typography>
                            <Typography variant="body2">
                                Project Type:
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {quote.project_type.name}
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
                                {quote.prevailing_rate ? <CheckCircleOutlineIcon color='success'/> : <HighlightOffIcon color='error'/>}
                            </Typography>
                        </Stack>
                    </div>
                    <div>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body2">
                                Travel Job
                            </Typography>
                            <Typography variant="body2">
                                {quote.travel_job ? <CheckCircleOutlineIcon color='success'/> : <HighlightOffIcon color='error'/>}
                            </Typography>
                        </Stack>
                    </div>
                    </Stack>
                    <Divider sx={{mt:2}}/>
                    <div>
                        <Typography variant="body2" sx={{mt:2, mb:2}}>
                            Customer(s):
                        </Typography>
                        {quote.customers.map(customer => (
                            <Accordion key={customer.id} expanded={expanded === customer.id} onChange={handleChange(customer.id)}>
                                <AccordionSummary aria-controls={`${customer.id}-content`} id={`${customer.id}-header`}>
                                <Typography>{customer.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{pb:0}}>
                                {contacts.map((contact) => {
                                    return contact.quotes.includes(quote.id) && contact.company === customer.id? 
                                    <div key={contact.id}>
                                        <Stack direction="row" spacing={1}>
                                            <IconButton 
                                                color="primary" 
                                                sx={{mr:1, ml:0, mb:2}}
                                                onClick={() => {handleOpenContact(contact, customer)}}
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
                                    :
                                    ''
                                })}
                                <ContactModal
                                    contact={contact}
                                    phones={phones}
                                    setContact={setContact}
                                    open={openContactModal}
                                    setOpen={setOpenContactModel}
                                    company={company}
                                />
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>

                    {quote.notes ? 
                    <div>
                    <Divider sx={{mt:2}}/>
                        <Typography variant="body2" sx={{mt:2}}>
                            Notes:
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {quote.notes}
                        </Typography>
                    </div>
                    : ''}

                    {user.groups.filter(group => (group.name === 'ADMIN')).length > 0 && quote.price ? 
                    <div>
                        <Divider sx={{mt:2}}/>
                        <Typography sx={{ fontSize: 14, mt:2 }} color="text.secondary">
                            Revision {quote.revision}
                        </Typography> 
                        <Typography variant="body2">
                            {`Price = `}
                            <NumericFormat value={quote.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        </Typography> 
                    </div>
                    : ''}
                    
                    
                    </CardContent>
                    <CardActions>
                    {/* <Button size="small">Edit</Button> */}
                </CardActions>
            </Card>
            : ''}
        </>
    );
};
