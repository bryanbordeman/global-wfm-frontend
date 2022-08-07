import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, Typography, IconButton, AppBar } from '@mui/material';
import  Divider from '@mui/material/Divider';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import Transition from './DialogTransistion'

export default function TaskDialog(props) {
    const { task } = props;
    const { setOpenDelete } = props
    const { created_by } = props.task
    const { project } = props.task
    const { quote } = props.task
    const { editing, handleOpenTaskForm } = props
    const { setOpenTaskDialog, openTaskDialog } = props;

    const [createdBy, setCreatedBy] = React.useState()
    const [projectNumber, setProjectNumber ] = React.useState()
    const [quoteNumber, setQuoteNumber ] = React.useState()

    React.useLayoutEffect(()=>{
        if(created_by)
        {setCreatedBy(`${created_by.first_name} ${created_by.last_name}`)
        }else{
            setCreatedBy(`${props.user.first_name} ${props.user.last_name}`)
        }
        if(project){
            setProjectNumber(`${project.number}`);
        }else{
            setProjectNumber('')
        }

        if(quote){
            setQuoteNumber(`${quote.number}`);
        }else{
            setQuoteNumber('');
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
                TransitionComponent={Transition}
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
                
                {editing ? 
                <div>
                <IconButton 
                    edge="end" 
                    color="primary"
                    aria-label="edit"
                    onClick={ () => {
                        setOpenTaskDialog(false);
                        handleOpenTaskForm();
                    }}
                        >
                    <EditIcon />
                </IconButton>
                </div> 
                :
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
                }
                </div>
            </DialogTitle>
                <Divider/>
                <DialogContent>
                    <Typography variant="body1" style={{whiteSpace: 'pre-line'}}>
                        {`${task.notes}`}
                    </Typography>
                </DialogContent>
                <AppBar position="fixed" color="transparent" elevation={0} sx={{ top: 'auto', bottom: 0 }}>
                    <Divider/>
                    <DialogContent>
                    <Stack direction="column" spacing={0}>
                        {projectNumber? 
                        <Typography variant="caption" color={'primary'}>
                            Project: {projectNumber}
                        </Typography>
                        :
                        <Typography variant="caption" color={'primary'}>
                            Quote: {quoteNumber}
                        </Typography>
                        }
                        <Typography variant="caption" color={'primary'}>
                            Created By: {createdBy}
                        </Typography>
                        {editing?
                        <Typography variant="caption" color={'error'}>
                            Last Updated: {moment(task.updated).calendar()}
                        </Typography>
                        :
                        <Typography variant="caption" color={'error'}>
                            Completed: {moment(task.completed).calendar()}
                        </Typography>
                        }
                    </Stack>
                    </DialogContent>
                    <Divider/>
                    <DialogActions >
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </DialogActions>
                </AppBar>
            </Dialog>
        </div>
    );
};