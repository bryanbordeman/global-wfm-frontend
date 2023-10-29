import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import  Divider from '@mui/material/Divider';
import Transition from './DialogTransistion'
import DocIframe from './DocIframe';

export default function DrawingDialog(props) {
    const { openDrawingDialog, setOpenDrawingDialog } = props;
    const { drawing } = props;

    const pdfData = drawing.document
    
    const handleClose = () => {
        setOpenDrawingDialog(false);
    };

    return (
        <div>
            <Dialog 
                TransitionComponent={Transition}
                fullWidth 
                fullScreen
                open={openDrawingDialog} 
                onClose={handleClose}
                scroll={'paper'}
                >
                <Divider/>
                <DialogContent sx={{m:0, p:0}}>
                    <DocIframe
                        source={pdfData}
                    />    
                </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
};