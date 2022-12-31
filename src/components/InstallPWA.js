import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IosShareOutlined from '@mui/icons-material/IosShareOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Divider from '@mui/material/Divider';

export default function InstallPWA() {
const [open, setOpen] = React.useState(true);


// const handleClickOpen = () => {
//     setOpen(true);
// };

const handleClose = () => {
    setOpen(false);
};

React.useEffect(() => {
    console.log('Install PWA Dialog')
})

return (
    <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
            Open alert dialog
        </Button> */}
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Install Global WFM"}
            </DialogTitle>
            <DialogContent>
            <div>
                Install this application on your homescreen for a better experience.
                <Divider
                sx={{marginTop:'0.5rem',
                marginBottom:'0.5rem'}}/>
                <div>
                    <IosShareOutlined
                        sx={{marginRight:'0.5rem'}}
                        color='primary'/> 
                    Tap the Share Icon 
                </div> 
                <Divider
                sx={{marginTop:'0.5rem',
                marginBottom:'0.5rem'}}/>
                <div>
                    <AddBoxOutlinedIcon
                    sx={{marginRight:'0.5rem'}}
                    color='primary'/>
                    Then Add to Home Screen
                </div>
            </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            {/* <Button onClick={handleClose} autoFocus>
                Install
            </Button> */}
            </DialogActions>
        </Dialog>
    </div>
);
}
