import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteTaskModal(props) {

    const { deleteTask, task , openDelete, setOpenDelete  } = props

    const handleClose = () => {
        setOpenDelete(false);
    };

    const handleDelete = () => {
        deleteTask(task.id);
        setOpenDelete(false);
    };

    return (
        <div>
        <Dialog
            open={openDelete}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            <Alert severity="error">Permanently delete this task?</Alert>
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {/* {moment(announcement.created).format("ddd, MMMM Do YYYY")} */}
                <br/>
                Tilte: {`${task.title}`}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button variant='outlined' onClick={handleClose}>Close</Button>
            <Button color='error' variant="contained" onClick={handleDelete} startIcon={<DeleteIcon />}>
                Delete
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
    }
