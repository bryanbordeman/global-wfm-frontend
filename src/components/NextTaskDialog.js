import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AddIcon from '@mui/icons-material/Add';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    });

    export default function NextTaskDialog(props) {
    const {open, setOpen, setAddOpen} = props

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Create the Next Task?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                To keep the project progressing forward, a 
                follow-up task is recommended. This task can 
                be assigned to you or another employee. 
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button color='error' variant='outlined' onClick={handleClose}>Cancel</Button>
            <Button 
                color='success' 
                variant="contained" 
                onClick={()=> {
                    setOpen(false);
                    setAddOpen(true);
                }}
                endIcon={<AddIcon />}
            >
                Add</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
