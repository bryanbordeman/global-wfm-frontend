import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ImageDialog(props) {
    const { image, id} = props;
    const { open, setOpen } = props
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Attachement: {id}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <img 
                            src={image} 
                            alt="image"
                            style={{width: '100%'}}
                            />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        variant='contained'
                        color='primary'
                        onClick={handleClose} 
                        autoFocus
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
