import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import  Divider from '@mui/material/Divider';
import Transition from './DialogTransistion'
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';

export default function VehicleIssuesListDialog(props) {
    const { user } = props
    const { issues } = props
    const { open, setOpen } = props;
    const { setVehicle } = props;
    const { setOpenIssue } = props;
    const { setEditIssue } = props;
    const { openDelete, setDeleteId, setDeleteMessage, setOpenDelete } = props;

    const handleClose = () => {
        setOpen(false);
        setEditIssue({});
    };

    const handleOpenIssue = (vehicle, issue) => {
        setVehicle(vehicle);
        setEditIssue(issue);
        setOpenIssue(true);
    };

    const handleDelete = (value) => {
        setDeleteId(value.id);
        setDeleteMessage({title: 'Permanently delete this issue', content: `Issue: ${value.description}`})
        setOpenDelete(!openDelete)
        // deleteVehicleService();
    };

    const issueList = 
        <div>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {issues.map((value, index) => {
                    const labelId = `list-label-${value.id}`;
                    return (
                        <div style={{marginRight: '0.5rem', marginLeft: '0.5rem'}} key={value.id}>
                            <ListItem
                                dense
                                secondaryAction={
                                    user.is_staff?
                                        <IconButton onClick={() => handleDelete(value)} edge="end" aria-label="delete" color='error'>
                                            <DeleteIcon />
                                        </IconButton>
                                    :''
                                }
                            >
                                {user.is_staff?
                                    <ListItemIcon>
                                        <IconButton  
                                            onClick={() => {handleOpenIssue(value.vehicle, value)}}
                                            edge="start"
                                        >
                                            <EditIcon color='primary'/>
                                        </IconButton>
                                    </ListItemIcon>
                                    :''
                                }
                                <ListItemText 
                                    id={labelId} 
                                    primary={value.description} 
                                    secondary={
                                        <> Vehicle: {value.vehicle.nickname} 
                                        <br/> 
                                        Serviced on: {moment(value.date).format('L')}
                                        </>} 
                                    />
                            </ListItem>
                            {index === issues.length - 1?
                                ''
                                : <Divider/>}
                        </div>
                    );
                })}
            </List>
        </div>

    return (
        <div>
            <Dialog 
                TransitionComponent={Transition}
                fullWidth 
                fullScreen
                open={open} 
                onClose={handleClose}
                scroll={'paper'} 
            >
            <DialogTitle>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            Vehicle Issues
                        </div>
                        <div>
                        <IconButton 
                            edge="end" 
                            aria-label="close"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                        </div> 
                    </div>
                </DialogTitle>
                <Divider/>
                <DialogContent>
                <Stack direction='row' spacing={2}>
                        <Box sx={{width: '100%'}}>
                            <Button 
                                size='large'
                                disableElevation
                                sx={{
                                    width: '100%', 
                                    maxWidth: '150px', 
                                    float: 'right',
                                    mr: '1.25rem',
                                    mb: 3}}
                                variant="contained"
                                onClick={() => setOpenIssue(true)}
                            >Add</Button>
                        </Box>
                    </Stack>
                    {issues.length > 0 ? issueList : 'No Issues Recorded'}
                </DialogContent>
                <Divider/>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
};