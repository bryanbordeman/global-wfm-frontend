import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import packageJson from '../../package.json';


export default function SoftwareCard() {

return (
    <Card 
        elevation={0}
        sx={{
            my: 1,
            width: '100%',
            maxWidth: '500px',
            border: 0.5,
            borderColor: 'primary.main',
            borderRadius: '16px',
            // marginTop: '2rem'
        }}
        >
        <CardContent style={{ marginBottom: 0, paddingBottom: 0, display:'flex', justifyContent:'center' }}>
        </CardContent>
        <CardContent sx={{ marginTop: 0, paddingTop: 0, textAlign: 'center' }}>
            <Typography sx={{ mb: 1 }}variant="h5" component="div">
                Software Information
            </Typography>
            <Divider sx={{ml: 6, mr: 6 }}/>
            <Typography sx={{ mb: 2, mt:2 }} color="text.primary">
                Name: Global WFM
                <br/>
                Version: {packageJson.version}
                <br/>
                Published by: Bryan Bordeman
            </Typography>
        </CardContent>
    </Card>
    );
};
