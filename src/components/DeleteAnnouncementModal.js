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

export default function DeleteAnnouncementModal(props) {

    const { deleteAnnouncement, announcement , openDelete, setOpenDelete  } = props

    const handleClose = () => {
        setOpenDelete(false);
    };

    const handleDelete = () => {
        deleteAnnouncement(announcement.id);
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
                    <Alert severity="error">Permanently delete this announcement?</Alert>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {moment(announcement.created).format("ddd, MMMM Do YYYY")}
                        <br/>
                        Title: {`${announcement.title}`}
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
};
