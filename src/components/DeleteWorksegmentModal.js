import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteWorksegmentModal() {
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleClickOpen = () => {
        setOpenDelete(true);
    };

    const handleClose = () => {
        setOpenDelete(false);
    };

    return (
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
            Open alert dialog
        </Button>
        <Dialog
            open={openDelete}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to permanently delete this timesheet?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button variant='outlined' onClick={handleClose}>Close</Button>
            <Button color='error' variant='outlined' onClick={handleClose} autoFocus>
                Delte
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
    }
