import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Stack, Grid } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ForemanModal(props) {
    const {open, setOpen} = props;
    const [foreman, setForeman] = React.useState(null);
    const [shiftDifferential, setShiftDifferential] = React.useState(false);
    const [compressedWorkWeek, setCompressedWorkWeek] = React.useState(false);

    const handleChangeForeman = (event, newForeman) => {
        setForeman(newForeman);
    };

    const handleChangeShiftDifferential = (event, newShiftDifferential) => {
        setShiftDifferential(newShiftDifferential);
    };

    const handleChangeCompressedWorkWeek = (event, newCompressedWorkWeek) => {
        setCompressedWorkWeek(newCompressedWorkWeek);
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false)
        setForeman(null)
    };

    const handleApprove = () => {
        console.log('Approve')
        handleClose()
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack spacing={2}>
                        <div>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Foreman
                            </Typography>
                            <ToggleButtonGroup
                                fullWidth
                                color="primary"
                                value={foreman}
                                exclusive
                                onChange={handleChangeForeman}
                                aria-label="Platform"
                            >
                                <ToggleButton value={true}>Yes</ToggleButton>
                                <ToggleButton value={false}>No</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <Stack direction='row' spacing={2}>
                            <div style={{width: '50%'}}>
                                <Typography variant="caption">
                                    Shift Differential
                                </Typography>
                                <ToggleButtonGroup
                                    fullWidth
                                    color="primary"
                                    value={shiftDifferential}
                                    exclusive
                                    onChange={handleChangeShiftDifferential}
                                    aria-label="Platform"
                                >
                                    <ToggleButton value={true}>Yes</ToggleButton>
                                    <ToggleButton value={false}>No</ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                            <div style={{width: '50%'}}>
                            <Typography variant="caption" style={{whiteSpace: 'nowrap'}}>
                                    Compressed Work Week 4/10's
                                </Typography>
                                <ToggleButtonGroup
                                    fullWidth
                                    color="primary"
                                    value={compressedWorkWeek}
                                    exclusive
                                    onChange={handleChangeCompressedWorkWeek}
                                    aria-label="Platform"
                                >
                                    <ToggleButton value={true}>Yes</ToggleButton>
                                    <ToggleButton value={false}>No</ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </Stack>
                        {foreman !== null && (
                            <Button
                                variant='outlined'
                                color='inherit'
                                size='small'
                                onClick={handleApprove}
                            >Approve</Button>
                        )}
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}