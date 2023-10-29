import * as React from 'react';
import  Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import moment from 'moment';
import { Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone';

const reports = [
    {
        number: '12345.1',
        user: {id: 1, first_name: 'Bryan', last_name: 'Bordeman'},
        quote: null,
        project: {number: '12345', name: 'New Project'},
        service: null,
        hse: null,
        comments: 'Test Report',
        date: new Date(),
        isoweek: '2023W42',
        attachments: [],
        is_active: true
    },
    {
        number: '12345.2',
        user: {id: 1, first_name: 'Bryan', last_name: 'Bordeman'},
        quote: null,
        project: {number: '12345', name: 'New Project'},
        service: null,
        hse: null,
        comments: 'Test Report',
        date: new Date(),
        isoweek: '2023W42',
        attachments: [],
        is_active: true
    },
    {
        number: '12345.3',
        user: {id: 1, first_name: 'Bryan', last_name: 'Bordeman'},
        quote: null,
        project: {number: '12345', name: 'New Project'},
        service: null,
        hse: null,
        comments: 'Test Report',
        date: new Date(),
        isoweek: '2023W42',
        attachments: [],
        is_active: true
    },
    {
        number: '12345.4',
        user: {id: 1, first_name: 'Bryan', last_name: 'Bordeman'},
        quote: null,
        project: {number: '12345', name: 'New Project'},
        service: null,
        hse: null,
        comments: 'Test Report',
        date: new Date(),
        isoweek: '2023W42',
        attachments: [],
        is_active: true
    }
];

export default function ReportsList (props) {

    const reportsList = 
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List>
                {reports.map((value, index) => {
                    const labelId = `list-label-${value.id}`;
                    return (
                        <div 
                            key={index} 
                            style={{width: '100%', margin: 0, padding: 0}}
                        >
                                <Stack>
                                <ListItemButton onClick={() => {}}>
                                    <SummarizeTwoToneIcon fontSize='large' sx={{marginRight: 3}}/>
                                    <ListItemText 
                                        sx={{width: 200}}
                                        id={labelId} 
                                        primary={value.number} 
                                        secondary={
                                            <> 
                                            Date: {moment(value.date).format('MM/DD/YY')}
                                            </>} 
                                        />
                                </ListItemButton>
                                </Stack>
                            {index === reports.length - 1?
                                ''
                                : <Divider/>}
                        </div>
                    );
                })}
            </List>
        </Box>

    return (
        <div >
            {reportsList}
        </div>
    )
};