import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, Typography, IconButton } from '@mui/material';
import  Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Transition from './DialogTransistion'

export default function DNCDialog(props) {
    const { openDCNDialog, setOpenDCNDialog } = props;
    const { DCN, formatDate } = props;

    // let project = ''
    // React.useLayoutEffect(() => {
    //     project = DCN.project !== null
    //     ? DCN.project
    //     : DCN.service !== null
    //     ? DCN.service
    //     : DCN.hse !== null
    //     ? DCN.hse
    //     : DCN.quote
    // }, [openDCNDialog])

    const handleClose = () => {
        setOpenDCNDialog(false);
    };
    
    return (
        <div>
            <Dialog 
                TransitionComponent={Transition}
                fullWidth 
                fullScreen
                open={openDCNDialog} 
                onClose={handleClose}
                scroll={'paper'}
                >
                <DialogTitle>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            {DCN? `DCN# ${DCN.number}` : ''}
                        </div>
                        <div>
                        <IconButton 
                            edge="end" 
                            aria-label="close"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                        </div> 
                    </div>
                </DialogTitle>
                <Divider/>
                <DialogContent>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Project:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {DCN ? (DCN.project !== null
                                ? DCN.project.number
                                : DCN.service !== null
                                ? DCN.service.number
                                : DCN.hse !== null
                                ? DCN.hse.number
                                : DCN.quote.number) : ''}
                        </Typography>
                    </Stack>
                    <Divider/>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Rev:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {DCN.rev}
                        </Typography>
                    </Stack>
                    <Divider/>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Date:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {formatDate(DCN.created)}
                        </Typography>
                    </Stack>
                    <Divider/>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Created By:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {DCN.created? `${DCN.created_by.first_name} ${DCN.created_by.last_name}` : ''}
                        </Typography>
                    </Stack>
                    <Divider/>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            External:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {DCN.is_external ? 'Yes' : 'No'}
                        </Typography>
                    </Stack>
                    <Divider color='primary' sx={{ borderWidth: '2px' }} />
                    <Stack spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Comments:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {DCN.comments}
                        </Typography>
                    </Stack>
                    
                </Stack>
                </DialogContent>
                    <Divider/>
                    <DialogActions>
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={2}
                        >
                            <Button
                                color='primary' 
                                variant="contained" 
                                onClick={handleClose}
                            >Close
                            </Button>
                        </Stack>
                    </DialogActions>
            </Dialog>
        </div>
    )
};