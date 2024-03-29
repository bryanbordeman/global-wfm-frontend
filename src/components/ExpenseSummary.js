import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import moment from 'moment';

export default function ExpenseSummary(props) {
    const { month, title, amount } = props
    return (  
        <Card 
            variant='outlined'
            sx={{
                my: 1,
                width: '100%',
                maxWidth: '500px',
                border: 0.5,
                borderColor: 'primary.main',
                borderRadius: '16px'
                }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection:'column',
                }}
                >
                <Typography style={{fontWeight: '700'}} mb={1} variant="h4" component="div">
                    {moment(month).format("MMMM YYYY")}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                {`Total: $${parseFloat(amount).toFixed(2)}`} 
                </Typography>
            </CardContent>
                
        </Card>
    );
};