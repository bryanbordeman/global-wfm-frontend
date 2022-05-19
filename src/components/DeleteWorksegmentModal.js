import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

export default function DeleteWorksegmentModal(props) {

    const { deleteWorksegment, segment , openDelete, setOpenDelete  } = props

    const handleClickOpen = () => {
        setOpenDelete(true);
    };

    const handleClose = () => {
        setOpenDelete(false);
    };

    const handleDelete = () => {
        deleteWorksegment(segment.id);
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
            <Alert severity="error">Permanently delete this timesheet?</Alert>
            {/* {"Are you sure you want to permanently delete this timesheet?"} */}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {moment(segment.date).format("ddd, MMMM Do YYYY")}
                {/* <br/>
                {`${moment(new Date(segment.date + ' ' + segment.start_time)).format('LT')} -  
                ${moment(new Date(segment.date + ' ' + segment.end_time)).format('LT')}`}
                <br/>
                Project: {segment.project}
                <br/>
                Travel: {segment.travel_duration} {segment.travel_duration > 1 ? 'Hrs' : 'Hr'} */}
                <br/>
                Total Hours: {`${segment.duration} ${segment.duration > 1 ? 'Hrs' : 'Hr'}`}
 
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
