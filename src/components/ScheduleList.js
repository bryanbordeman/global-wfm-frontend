import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ScheduleSegment from '../components/ScheduleSegment';
import TodayIcon from '@mui/icons-material/Today';
import { Divider, Stack } from '@mui/material';

export default function ScheduleList() {
    const [open, setOpen] = React.useState({});

    const handleClick = (id) => {
        setOpen((prevState => ({...prevState, [id]: !prevState[id]})));
    };

    return (
        <List
            sx={{
                my: 1,
                width: '100%',
                maxWidth: '500px',
                border: 0.5,
                borderColor: 'primary.main',
                borderRadius: '8px',
                bgcolor: 'grey.100'
                }}
        >
            <ListItemButton 
                onClick={() => {handleClick(0)}}
            >
                <ListItemIcon>
                <TodayIcon />
                </ListItemIcon>
                <ListItemText 
                    primary="Day 1" 
                    secondary="Monday 07/25/22"
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[0]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem >
                <Stack sx={{width: '100%'}} spacing={2}>
                    <ScheduleSegment/>
                    <ScheduleSegment/>
                    <ScheduleSegment/>
                </Stack>
                </ListItem>
                </List>
            </Collapse>
            <Divider sx={{ml:2, mr:2}}/>
            <ListItemButton 
                onClick={() => {handleClick(1)}}
            >
                <ListItemIcon>
                <TodayIcon />
                </ListItemIcon>
                <ListItemText 
                    primary="Day 2" 
                    secondary="Tuesday 07/26/22"
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[1]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem >
                <Stack sx={{width: '100%'}} spacing={2}>
                    <ScheduleSegment/>
                    <ScheduleSegment/>
                    <ScheduleSegment/>
                </Stack>
                </ListItem>
                </List>
            </Collapse>
            <Divider sx={{ml:2, mr:2}}/>
            <ListItemButton 
                onClick={() => {handleClick(2)}}
            >
                <ListItemIcon>
                <TodayIcon />
                </ListItemIcon>
                <ListItemText 
                    primary="Day 3" 
                    secondary="Wednesday 07/27/22"
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[2]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem >
                <Stack sx={{width: '100%'}} spacing={2}>
                    <ScheduleSegment/>
                    <ScheduleSegment/>
                    <ScheduleSegment/>
                </Stack>
                </ListItem>
                </List>
            </Collapse>
            <Divider sx={{ml:2, mr:2}}/>
            <ListItemButton 
                onClick={() => {handleClick(3)}}
            >
                <ListItemIcon>
                <TodayIcon />
                </ListItemIcon>
                <ListItemText 
                    primary="Day 4" 
                    secondary="Thursday 07/28/22"
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[3]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem >
                <Stack sx={{width: '100%'}} spacing={2}>
                    <ScheduleSegment/>
                    <ScheduleSegment/>
                    <ScheduleSegment/>
                </Stack>
                </ListItem>
                </List>
            </Collapse>
            <Divider sx={{ml:2, mr:2}}/>
            <ListItemButton 
                onClick={() => {handleClick(4)}}
            >
                <ListItemIcon>
                <TodayIcon />
                </ListItemIcon>
                <ListItemText 
                    primary="Day 5" 
                    secondary="Friday 07/29/22"
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[4]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem >
                <Stack sx={{width: '100%'}} spacing={2}>
                    <ScheduleSegment/>
                    <ScheduleSegment/>
                    <ScheduleSegment/>
                </Stack>
                </ListItem>
                </List>
            </Collapse>
            <Divider sx={{ml:2, mr:2}}/>
            <ListItemButton 
                onClick={() => {handleClick(5)}}
            >
                <ListItemIcon>
                <TodayIcon />
                </ListItemIcon>
                <ListItemText 
                    primary="Day 6" 
                    secondary="Saturday 07/30/22"
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[5]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem >
                <Stack sx={{width: '100%'}} spacing={2}>
                    <ScheduleSegment/>
                    <ScheduleSegment/>
                    <ScheduleSegment/>
                </Stack>
                </ListItem>
                </List>
            </Collapse>
            <Divider sx={{ml:2, mr:2}}/>
            <ListItemButton 
                onClick={() => {handleClick(6)}}
            >
                <ListItemIcon>
                <TodayIcon />
                </ListItemIcon>
                <ListItemText 
                    primary="Day 7" 
                    secondary="Sunday 07/31/22"
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[6]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem >
                <Stack sx={{width: '100%'}} spacing={2}>
                    <ScheduleSegment/>
                    <ScheduleSegment/>
                    <ScheduleSegment/>
                </Stack>
                </ListItem>
                </List>
            </Collapse>
            </List>
        );
    }