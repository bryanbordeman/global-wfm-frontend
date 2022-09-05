import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Avatar, Divider, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function ProjectCard(props) {

const { quote } = props
// const { quote, handleSetContact } = props
    
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
                {/* <Divider/>
                <Typography variant="body2" sx={{mt:2}}>
                    Contact(s):
                </Typography> */}

                {/* {quote.contacts.map(contact => (
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
                ))} */}
                <Divider sx={{mt:2}}/>
                <Typography variant="body2" sx={{mt:2}}>
                    Customer(s):
                </Typography>
                {quote.customers.map(customer => (
                    <div key={customer.name}>
                        <Button sx={{
                            textTransform: 'unset !important',
                            p: 0,
                            mt: 1}}
                            // onClick={() => {handleSetContact(contact)}}
                            >
                        <Chip
                            avatar={<Avatar 
                                    alt={`${customer.name}`}
                                    src="/broken-image.jpg"
                                    />}
                            label={`${customer.name}`}
                            variant="outlined"
                        />
                        </Button>
                    </div>
                ))}
                
                </CardContent>
                <CardActions>
                {/* <Button size="small">Edit</Button> */}
            </CardActions>
        </Card>
        : ''}
    </>
);
}
