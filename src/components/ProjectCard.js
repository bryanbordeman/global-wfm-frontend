import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Avatar, Divider, Stack } from '@mui/material';



    export default function ProjectCard(props) {

        const { project } = props
        

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
                    <div style={{paddingLeft: 0}}>
                        <Typography variant="body2">
                            Project Address:
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {project.address.address1}
                            
                            {project.address.address2 ? 
                            <br/> : ''}
                            {project.address.address2}
                            <br/>
                            {`${project.address.city}, ${project.address.state} ${project.address.zip_code}`}
                            <br/>
                            {project.address.country}
                        </Typography>
                    </div>
                    <Divider orientation="vertical" flexItem/>
                    <div>
                        <Typography variant="body2">
                            Project Category:
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {project.project_category}
                        </Typography>

                        <Typography variant="body2">
                            Project Type:
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {project.project_type}
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
                        height: '100%'}}>
                
                
                <div>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="body2">
                            Prevailing Rate:
                        </Typography>
                        <Typography variant="body2">
                            {project.prevailing_rate ? 'Yes' : 'No'}
                        </Typography>
                    </Stack>
                </div>
                <Divider orientation="vertical" flexItem/>
                <div>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="body2">
                            Travel Job:
                        </Typography>

                        <Typography variant="body2">
                            {project.travel_job ? 'Yes' : 'No'}
                        </Typography>
                    </Stack>
                </div>
                </Stack>
                <Divider/>
                <Typography variant="body2" sx={{mt:2}}>
                    Contact(s):
                </Typography>
                <Button sx={{
                        textTransform: 'unset !important',
                        p: 0,
                        mt: 1}}>
                <Chip
                    avatar={<Avatar 
                            alt={`${project.contact.name}`}
                            src="/broken-image.jpg"
                            />}
                    label={`${project.contact.name}`}
                    variant="outlined"
                    // sx={{width: '100%'}}
                />
                </Button>
            

                </CardContent>
                <CardActions>
                {/* <Button size="small">Learn More</Button> */}
            </CardActions>

        </Card>
            : ''}
        </>
    );
}
