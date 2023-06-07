import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, Typography, IconButton } from '@mui/material';
import  Divider from '@mui/material/Divider';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import Transition from './DialogTransistion'

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
                    <div style={{overflow: "auto!important",
                                "-webkit-overflow-scrolling": "touch!important",
                                width: '100%',
                                height: '100%'
                                }}>
                        <iframe 
                            src={`https://docs.google.com/gview?url=${pdfData}&embedded=true`}
                            width="100%" 
                            height="100%" 
                        />
                    </div>
                </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
};