import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import  Divider from '@mui/material/Divider';
import Transition from './DialogTransistion'
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

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
        expandIcon={<ArrowForwardIosSharpIcon sx={{ color: 'white', fontSize: '0.9rem' }} />}
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


export default function VehicleCleaningsListDialog(props) {

    const { user } = props
    const { year, setYear } = props
    const { cleanings } = props
    const { open, setOpen } = props;
    const { setVehicle } = props;
    const { setOpenCleaning } = props;
    const { setEditCleaning } = props;
    const { openDelete, setDeleteId, setDeleteMessage, setOpenDelete } = props;
    const [ expanded, setExpanded ] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleClose = () => {
        setOpen(false);
        setEditCleaning({});
        setYear(new Date());
        setExpanded('')
    };

    const handleOpenCleaning = (vehicle, cleaning) => {
        setVehicle(vehicle);
        setEditCleaning(cleaning);
        setOpenCleaning(true);
    };

    const handleDelete = (value, isFullyCleaned) => {
        setDeleteId(value.id);
        setDeleteMessage({title: 'Permanently delete this cleaning', content: `${isFullyCleaned} for ${value.vehicle.nickname}`})
        setOpenDelete(!openDelete)
    };

    const cleaningsList = 
        <div>
            {cleanings.map((value, index) => {
                let isFullyCleaned = value.wash_exterior === true &&
                                    value.wash_interior === true &&
                                    value.clean_windows === true &&
                                    value.wash_seats === true &&
                                    value.vacuum_seats === true &&
                                    value.vacuum_floor === true? 'Full Cleaning' : 'Partial Cleaning';
                return(
                    <Accordion 
                        elevation={0}
                        sx={{ 
                            mb:2,
                            borderRadius: '16px',
                        }}
                        key={value.id} 
                        expanded={expanded === value.id} 
                        onChange={handleChange(value.id)}
                    >
                        <AccordionSummary 
                            sx={{
                                border: Number(`${isFullyCleaned === 'Full Cleaning'? 3 : 0}`),
                                borderColor: `${isFullyCleaned === 'Full Cleaning'? 'warning.main' : ''}`,
                                borderRadius: '16px',
                            }} 
                            aria-controls={`${value.id}-content`} 
                            id={`${value.id}-header`}
                            >
                            <Stack>
                                <Stack direction={'row'} spacing={2}>
                                    {isFullyCleaned === 'Full Cleaning'? <StarIcon sx={{color: 'warning.main'}}/> : ''}
                                    <Typography 
                                    variant="h6" 
                                >
                                    {value.vehicle.nickname}
                                </Typography>
                                </Stack>
                                
                                <Typography>
                                {<> 
                                    {isFullyCleaned}
                                    <br/> 
                                    Cleaned on: {moment(value.date).format('L')}    
                                </>} 
                                </Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {<>
                                    {value.wash_exterior? 
                                    <CheckCircleOutlineIcon fontSize='small' color= 'success'/>
                                    :
                                    <CancelOutlinedIcon fontSize='small' color= 'error'/>
                                    }
                                    &nbsp;Wash Exterior
                                    <br/>
                                    {value.wash_interior? 
                                    <CheckCircleOutlineIcon fontSize='small' color= 'success'/>
                                    :
                                    <CancelOutlinedIcon fontSize='small' color= 'error'/>
                                    }
                                    &nbsp;Wash Interior
                                    <br/>
                                    {value.clean_windows? 
                                    <CheckCircleOutlineIcon fontSize='small' color= 'success'/>
                                    :
                                    <CancelOutlinedIcon fontSize='small' color= 'error'/>
                                    }
                                    &nbsp;Clean Windows
                                    <br/>
                                    {value.wash_seats? 
                                    <CheckCircleOutlineIcon fontSize='small' color= 'success'/>
                                    :
                                    <CancelOutlinedIcon fontSize='small' color= 'error'/>
                                    }
                                    &nbsp;Wash Seats
                                    <br/>
                                    {value.vacuum_seats? 
                                    <CheckCircleOutlineIcon fontSize='small' color= 'success'/>
                                    :
                                    <CancelOutlinedIcon fontSize='small' color= 'error'/>
                                    }
                                    &nbsp;Vacuum Seats
                                    <br/>
                                    {value.vacuum_floor? 
                                    <CheckCircleOutlineIcon fontSize='small' color= 'success'/>
                                    :
                                    <CancelOutlinedIcon fontSize='small' color= 'error'/>
                                    }
                                    &nbsp;Vacuum Floor
                                    <br/>
                                    {value.other? 
                                    `Other: ${value.other_description}`
                                    :
                                    ''
                                    }
                                    
                                </>
                                }
                            </Typography>
                            {user.is_staff?
                            <div>
                                <Divider sx={{m:2}}/>
                                <Stack 
                                    direction="row" 
                                    spacing={2}
                                >
                                    <Button 
                                        sx={{
                                            width: '100%',
                                            maxWidth: '150px'
                                        }}
                                        onClick={() => handleDelete(value, isFullyCleaned)} 
                                        color='error' 
                                        variant="outlined" 
                                        startIcon={<DeleteIcon />}
                                    >
                                        Delete
                                    </Button>
                                    <Button 
                                        sx={{
                                            width: '100%',
                                            maxWidth: '150px'
                                        }}
                                        onClick={() => handleOpenCleaning(value.vehicle, value)} 
                                        color='primary' 
                                        variant="contained" 
                                        startIcon={<EditIcon />}
                                    >
                                        Edit
                                    </Button>
                                </Stack>
                            </div>
                            :
                            ''
                            }
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </div>

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
                            Vehicle Cleanings
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
                    <Stack direction='row' spacing={2}>
                    <Box sx={{marginBottom: 4}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <DatePicker
                                label="Year"
                                id="year"
                                name="year"
                                views={['year']}
                                value={year}
                                onChange={(date) => {setYear(date)}}
                                renderInput={(params) => < TextField {...params} variant="filled"/>}
                                fullWidth
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{width: '100%'}}>
                        <Button 
                            size='large'
                            disableElevation
                            sx={{
                                width: '100%', 
                                maxWidth: '150px', 
                                float: 'right',
                                mr: '1.25rem'}}
                            variant="contained"
                            onClick={() => setOpenCleaning(true)}
                        >Add</Button>
                    </Box>
                    </Stack>
                    {cleanings.length > 0 ? cleaningsList : 'No Cleanings Recorded'}
                </DialogContent>
                <Divider/>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
};