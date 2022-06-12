import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import moment from 'moment';

function ExpenseSummary(props) {
    const { month } = props
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
                <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Reimbursable: $37.94
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Company Card: $240.00
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Miles: 300 miles at $0.57 mile = $171.00
                </Typography>
            </CardContent>
                
        </Card>
    );
}

export default ExpenseSummary;