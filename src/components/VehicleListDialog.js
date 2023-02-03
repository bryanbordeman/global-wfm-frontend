import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, Typography, IconButton } from '@mui/material';
import  Divider from '@mui/material/Divider';
import Transition from './DialogTransistion'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';

import AddVehicleIssueForm from '../components/AddVehicleIssueForm';


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    }));

    const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
    ))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));


export default function VehicleListDialog(props) {
    const { user } = props
    const { vehicles, createVehicleIssue } = props
    const { open, setOpen } = props;
    const [ vehicle, setVehicle ] = React.useState({});
    const [ openIssue, setOpenIssue ] = React.useState(false);
    const [ expanded, setExpanded ] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        if(vehicles.length > 0) 
            setExpanded(newExpanded ? panel : false);
    };
    
    const handleClose = () => {
        setOpen(false);
        setExpanded(false);
    };

    const handleOpenIssue = (vehicle) => {
        setVehicle(vehicle);
        setOpenIssue(true);
    }

    return (
        <div>
            <Dialog 
                TransitionComponent={Transition}
                fullWidth 
                fullScreen
                open={open} 
                onClose={handleClose}
                scroll={'paper'} 
            >
            <DialogTitle>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            Vehicles
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
                {vehicles.map((v) => (
                    <Accordion key={v.id} expanded={expanded === v.id} onChange={handleChange(v.id)}>
                        <AccordionSummary 
                            aria-controls={`${v.id}-content`} 
                            id={`${v.id}-header`}
                        >
                            <Typography>{v.nickname}</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{display:'flex', justifyContent:'center'}}
                        >
                            <Card sx={{ maxWidth: 500 }}>
                                <CardMedia
                                    component="img"
                                    alt={`${v.nickname}-image`}
                                    image={v.image}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {v.make} {v.model} {v.year}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Color: {v.color}
                                    <br/>
                                    License Plate: {v.license_plate}
                                    <br/>
                                    Max Passagers: {v.max_passagers}
                                    <br/>
                                    Max Weight: {v.max_weight}
                                    </Typography>
                                    <Divider sx={{ mb: 2, mt:2}}/>
                                    <Typography variant="body2">
                                        {`Assigned to: ${v.assignment.first_name} ${v.assignment.last_name}`}
                                    </Typography>
                                    <Divider sx={{ mb: 2, mt:2}}/>
                                    <CardActions  sx={{display:'flex', justifyContent:'center'}}>
                                        <Stack spacing={1} sx={{width: '100%'}}>
                                            <Button variant='outlined' size="small" onClick={() => {handleOpenIssue(v)}}>Report Issue</Button>
                                            <Button variant='outlined' size="small">Log Cleaning</Button>
                                            <Button variant='outlined' size="small">Log Inspection</Button>
                                            <Button variant='outlined' size="small">Log Service</Button>
                                        </Stack>
                                    </CardActions>
                                    
                                </CardContent>
                            </Card>  
                        </AccordionDetails>
                    </Accordion>
                ))}
                </DialogContent>
                <Divider/>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </DialogActions>
            </Dialog>
            <AddVehicleIssueForm
                open={openIssue}
                setOpen={setOpenIssue}
                vehicle={vehicle}
                user={user}
                createVehicleIssue={createVehicleIssue}
            />
        </div>
    );
};