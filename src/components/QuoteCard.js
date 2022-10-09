import * as React from 'react';
import ContactServices from '../services/Contact.services';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import moment from 'moment';
import { NumericFormat } from 'react-number-format';
import CompanyContactList from './CompanyContactList';

export default function ProjectCard(props) {

const { quote, user, token } = props
const [ contacts, setContacts ] = React.useState([]);
const didMount = React.useRef(false);

React.useEffect(() => {
    if (didMount.current) {
        if(quote.id){
            recieveContacts(quote.id)
        }
    } else {
        didMount.current = true;
    }
},[quote]);

const recieveContacts = (id) => {
    ContactServices.getContactQuote(id, token)
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
                        <a href={`http://maps.google.com/?q=${quote.address.address}, ${quote.address.city}, ${quote.address.state} ${quote.address.zip_code}`} 
                            target="_blank"
                            rel="noopener noreferrer" 
                        >
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {quote.address.address}
                                <br/>
                                {`${quote.address.city}, ${quote.address.state} ${quote.address.postal_code}`}
                                <br/>
                                {quote.address.country}
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
                {/* <Divider orientation="vertical" flexItem/> */}
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
                <CompanyContactList
                    customers={quote.customers}
                    contacts={contacts}
                    quote={quote}
                />
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
}
