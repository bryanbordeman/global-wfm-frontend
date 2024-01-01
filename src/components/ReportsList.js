import * as React from 'react';
import  Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import moment from 'moment';
import { Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone';

export default function ReportsList (props) {
    const { reports, handleOpenForm, setReport } = props;

    const handleOpen = (report) => {
        handleOpenForm();
        setReport(report)
    };

    if (!reports || reports.length === 0) {
        // Return a message or component for an empty reports array
        return <div>No reports available.</div>;
    };

    
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
                                <ListItemButton onClick={() => handleOpen(value)}>
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