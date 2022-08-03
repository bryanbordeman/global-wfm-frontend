import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, Typography, IconButton } from '@mui/material';
import  Divider from '@mui/material/Divider';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import moment from 'moment';

export default function TaskDialog(props) {
    const { task } = props;
    const { setOpenDelete } = props
    const { created_by } = props.task
    const { project } = props.task
    const { setOpenTaskDialog, openTaskDialog } = props;

    const [createdBy, setCreatedBy] = React.useState()
    const [projectNumber, setProjectNumber ] = React.useState()

    React.useLayoutEffect(()=>{
        if(created_by)
        {setCreatedBy(`${created_by.first_name} ${created_by.last_name}`)
        }else{
            setCreatedBy(`${props.user.first_name} ${props.user.last_name}`)
        }
        if(project)
        {setProjectNumber(`${project.number}`)
        }else{
            setProjectNumber('')
        }
    },[task])

    const handleClose = () => {
        setOpenTaskDialog(false);
    };

    const handleDelete = () => {
        setOpenDelete(true);
        setOpenTaskDialog(false);
    }

    return (
        <div>
            <Dialog 
                fullWidth 
                fullScreen
                open={openTaskDialog} 
                onClose={handleClose}
                scroll={'body'}
                
                >
            <DialogTitle>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    {`${task.title}`}
                </div>
                
                <div>
                <IconButton 
                    edge="end" 
                    color="error"
                    aria-label="delete"
                    onClick={ () => {
                        handleDelete()}}
                        >
                    <DeleteOutlineIcon />
                </IconButton>
                </div>
                </div>
            </DialogTitle>
                <Divider/>
                <DialogContent 
                    style={{
                        height: '100%',
                        maxHeight: 'calc(100vh - 320px)'
                    }}
                >
                    <Typography variant="body1" style={{whiteSpace: 'pre-line'}}>
                        {`${task.notes}`}
                    </Typography>
                </DialogContent>
                <Divider/>
                <DialogContent>
                <Stack direction="column" spacing={0}>
                    <Typography variant="caption" color={'primary'}>
                    Project: {projectNumber}
                    </Typography>
                    <Typography variant="caption" color={'primary'}>
                    Completed: {moment(task.completed).calendar()}
                    </Typography>
                    <Typography variant="caption" color={'primary'}>
                    Created By: {createdBy}
                    </Typography>
                </Stack>
                </DialogContent>
                <Divider/>
                <DialogActions >
                <Button variant='outlined' onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};