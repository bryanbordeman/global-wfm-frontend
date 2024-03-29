import React from 'react';
import DrawingDialog from './DrawingDialog';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, Typography, IconButton } from '@mui/material';
import  Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import Transition from './DialogTransistion'

import RHInSwing from '../assets/door_swing_icons/RHInSwing.svg'
import RHOutSwing from '../assets/door_swing_icons/RHOutSwing.svg'
import LHInSwing from '../assets/door_swing_icons/LHInSwing.svg'
import LHOutSwing from '../assets/door_swing_icons/LHOutSwing.svg'

import RHInSwingDark from '../assets/door_swing_icons/RHInSwingDark.svg'
import RHOutSwingDark  from '../assets/door_swing_icons/RHOutSwingDark.svg'
import LHInSwingDark  from '../assets/door_swing_icons/LHInSwingDark.svg'
import LHOutSwingDark  from '../assets/door_swing_icons/LHOutSwingDark.svg'

import RHAInSwing from '../assets/door_swing_icons/RHAInSwing.svg'
import RHAOutSwing  from '../assets/door_swing_icons/RHAOutSwing.svg'
import LHAInSwing  from '../assets/door_swing_icons/LHAInSwing.svg'
import LHAOutSwing  from '../assets/door_swing_icons/LHAOutSwing.svg'

import RHAInSwingDark from '../assets/door_swing_icons/RHAInSwingDark.svg'
import RHAOutSwingDark  from '../assets/door_swing_icons/RHAOutSwingDark.svg'
import LHAInSwingDark  from '../assets/door_swing_icons/LHAInSwingDark.svg'
import LHAOutSwingDark  from '../assets/door_swing_icons/LHAOutSwingDark.svg'

import RHSlidingIn from '../assets/door_swing_icons/RHSlidingIn.svg'
import LHSlidingIn from '../assets/door_swing_icons/LHSlidingIn.svg'
import RHSlidingInDark from '../assets/door_swing_icons/RHSlidingInDark.svg'
import LHSlidingInDark from '../assets/door_swing_icons/LHSlidingInDark.svg'

import RHSlidingOut from '../assets/door_swing_icons/RHSlidingOut.svg'
import LHSlidingOut from '../assets/door_swing_icons/LHSlidingOut.svg'
import RHSlidingOutDark from '../assets/door_swing_icons/RHSlidingOutDark.svg'
import LHSlidingOutDark from '../assets/door_swing_icons/LHSlidingOutDark.svg'

import BiPartingIn from '../assets/door_swing_icons/BiPartingIn.svg'
import BiPartingOut from '../assets/door_swing_icons/BiPartingOut.svg'
import BiPartingInDark from '../assets/door_swing_icons/BiPartingInDark.svg'
import BiPartingOutDark from '../assets/door_swing_icons/BiPartingOutDark.svg'

import ArchitectureIcon from '@mui/icons-material/Architecture';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function DoorWorkOrderDialog(props) {
    const { openDoorWorkOrderDialog, setOpenDoorWorkOrderDialog } = props;
    const { order, setDoorWorkOrder, darkState } = props;
    const [ doorIcon, setDoorIcon ] = React.useState('');
    const [ drawing, setDrawing ] = React.useState([]);
    const [ openDrawingDialog, setOpenDrawingDialog ] = React.useState(false);

    React.useEffect(() => {
        switch (`${order.hand}-${order.swing}-${order.is_double_door}-${order.is_sliding}-${order.is_biparting}`) {
            case "RH-in-false-false-false":
                setDoorIcon(darkState ? RHInSwingDark : RHInSwing);
                break;
            case "LH-in-false-false-false":
                setDoorIcon(darkState ? LHInSwingDark : LHInSwing);
                break;
            case "RH-out-false-false-false":
                setDoorIcon(darkState ? RHOutSwingDark : RHOutSwing);
                break;
            case "LH-out-false-false-false":
                setDoorIcon(darkState ? LHOutSwingDark : LHOutSwing);
                break;
            case "RHA-in-true-false-false":
                setDoorIcon(darkState ? RHAInSwingDark : RHAInSwing);
                break;
            case "RHA-out-true-false-false":
                setDoorIcon(darkState ? RHAOutSwingDark : RHAOutSwing);
                break;
            case "LHA-in-true-false-false":
                setDoorIcon(darkState ? LHAInSwingDark : LHAInSwing);
                break;
            case "LHA-out-true-false-false":
                setDoorIcon(darkState ? LHAOutSwingDark : LHAOutSwing);
                break;

            case "RH-in-false-true-false":
                setDoorIcon(darkState ? RHSlidingInDark : RHSlidingIn);
                break;

            case "LH-in-false-true-false":
                setDoorIcon(darkState ? LHSlidingInDark : LHSlidingIn);
                break;
            case "RH-out-false-true-false":
                setDoorIcon(darkState ? RHSlidingOutDark : RHSlidingOut);
                break;
            case "LH-out-false-true-false":
                setDoorIcon(darkState ? LHSlidingOutDark : LHSlidingOut);
                break;
            case "BI-in-false-true-true":
                setDoorIcon(darkState ? BiPartingInDark : BiPartingIn);
                break;
            case "BI-out-false-true-true":
                setDoorIcon(darkState ? BiPartingOutDark : BiPartingOut);
                break;
            default:
                setDoorIcon('');
            }
        }, [order, darkState]);

    const handleOpenDrawing = (d) => {
        setDrawing(d)
        setOpenDrawingDialog(true);
    };

    const handleClose = () => {
        setOpenDoorWorkOrderDialog(false);
        setDoorWorkOrder('')
    };

    return (
        <div>
            {order? 
            <Dialog 
                TransitionComponent={Transition}
                fullWidth 
                fullScreen
                open={openDoorWorkOrderDialog} 
                onClose={handleClose}
                scroll={'paper'}
                >
                <DialogTitle>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            {order? `${order.project.number} ${order.project.name}` : ''}
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
                    {order.rev.length > 0? 
                        order.rev.map((r, k) => (
                        <Accordion key={k}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                
                            <Stack direction="row" spacing={1}>
                                <Typography sx={{color: 'text.secondary'}}>
                                    Rev:
                                </Typography>
                                <Typography sx={{fontWeight: "bold"}}>
                                    {r.rev}
                                </Typography>
                            </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack spacing={2}>
                                    <Stack direction="row" spacing={1}>
                                        <Typography sx={{color: 'text.secondary'}}>
                                            Comment:
                                        </Typography>
                                        <Typography sx={{fontWeight: "bold"}}>
                                            {r.comment}
                                        </Typography>
                                    </Stack>
                                    <Divider/>
                                    <Stack direction="row" spacing={1}>
                                        <Typography sx={{color: 'text.secondary'}}>
                                            Issue Date:
                                        </Typography>
                                        <Typography sx={{fontWeight: "bold"}}>
                                            {moment(r.issue_date).format("MM/DD/YY")}
                                        </Typography>
                                    </Stack>
                                    <Divider/>
                                    <Stack direction="row" spacing={1}>
                                        <Typography sx={{color: 'text.secondary'}}>
                                            Created By:
                                        </Typography>
                                        <Typography sx={{fontWeight: "bold"}}>
                                            {`${r.created_by.first_name} ${r.created_by.last_name}`}
                                        </Typography>
                                    </Stack>
                                    <Divider/>
                                    <Stack direction="row" spacing={1}>
                                        <Typography sx={{color: 'text.secondary'}}>
                                            Checked By:
                                        </Typography>
                                        <Typography sx={{fontWeight: "bold"}}>
                                            {`${r.approved_by.first_name} ${r.approved_by.last_name}`}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                        ))
                    : ''}
                    <Stack spacing={2}>
                    {darkState? 
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img alt='door-icon' style={{ width: '300px'}} src={doorIcon}/>
                        </div>
                    </div>
                    :
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}> 
                            <img alt='door-icon' style={{ width: '300px'}} src={doorIcon}/>
                        </div>
                    </div>
                    }
                    <Divider/>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Due Date:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {moment(order.due).format("MM/DD/YY")}
                        </Typography>
                    </Stack>
                    <Divider/>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Issue Date:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {moment(order.issue_date).format("MM/DD/YY")}
                        </Typography>
                    </Stack>
                    <Divider/>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Created By:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {`${order.created_by.first_name} ${order.created_by.last_name}`}
                        </Typography>
                    </Stack>
                    <Divider/>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Checked By:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {`${order.checked_by.first_name} ${order.checked_by.last_name}`}
                        </Typography>
                    </Stack>
                    <Divider color='primary' sx={{ borderWidth: '2px' }} />
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Door Type:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {order.door_type.description}
                        </Typography>
                    </Stack>
                    <Divider/>
                    <Stack spacing={1}>
                        <Typography sx={{textDecoration: 'underline'}}>
                            Size:
                        </Typography>
                            <Stack direction="row" spacing={1}>
                                <Typography sx={{color: 'text.secondary'}}>
                                    {order.is_double_door? "Active Width =" : "Width ="}
                                </Typography>
                                <Typography sx={{fontWeight: "bold"}}>
                                    {`${order.width % 1 === 0 ? Math.round(order.width) : order.width}"`}
                                </Typography>
                                <Divider orientation="vertical" flexItem />
                                <Typography sx={{color: 'text.secondary'}}>
                                    Height =
                                </Typography>
                                <Typography sx={{fontWeight: "bold"}}>
                                    {`${order.height % 1 === 0 ? Math.round(order.height) : order.height}"`}
                                </Typography>
                            </Stack>
                            {order.is_double_door?
                                <Stack direction="row" spacing={1}>
                                    <Typography sx={{color: 'text.secondary'}}>
                                        Inactive Width =
                                    </Typography>
                                    <Typography sx={{fontWeight: "bold"}}>
                                        {`${order.inactive_width % 1 === 0 ? Math.round(order.inactive_width) : order.inactive_width}"`}
                                    </Typography>
                                    <Divider orientation="vertical" flexItem />
                                    <Typography sx={{color: 'text.secondary'}}>
                                        Height =
                                    </Typography>
                                    <Typography sx={{fontWeight: "bold"}}>
                                        {`${order.height % 1 === 0 ? Math.round(order.height) : order.height}"`}
                                    </Typography>
                                </Stack>
                                : ''
                            }
                    
                    </Stack>
                    <Divider/>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Veneer:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {order.veneer}
                        </Typography>
                    </Stack>
                    <Divider/>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Lockset:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {order.lockset.description}
                        </Typography>
                    </Stack>
                    <Divider/>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Door Swith:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {order.door_switch? "Yes" : "No"}
                        </Typography>
                    </Stack>
                    <Divider/>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Sill Style:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {order.sill_type.description}
                        </Typography>
                    </Stack>
                    <Divider/>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Frame Type:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {order.frame_type.description}
                        </Typography>
                    </Stack>
                    <Divider/>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Core Type:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {order.core_type.description}
                        </Typography>
                    </Stack>
                    <Divider/>
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Hinge Type:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {order.hinge_type.description}
                        </Typography>
                    </Stack>
                    {order.options.length > 0? 
                    <Stack spacing={2}>
                        <Divider/>
                        <Stack direction="row" spacing={1}>
                            <Typography sx={{color: 'text.secondary'}}>
                                Options:
                            </Typography>
                            {order.options.map ((op, k) => (
                                <Typography key={k} sx={{fontWeight: "bold"}}>
                                    {`${op.description} ${order.options.length > 1 && k !== order.options.length - 1? ',' : ''}`}
                                </Typography>
                            ))}
                        </Stack>
                    </Stack>
                    : ''}
                    <Divider color='primary' sx={{ borderWidth: '2px' }} />
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{color: 'text.secondary'}}>
                            Packaging:
                        </Typography>
                        <Typography sx={{fontWeight: "bold"}}>
                            {order.packaging.description}
                        </Typography>
                    </Stack>
                    <Divider/>
                    {order.notes? 
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={1}>
                            <Typography sx={{color: 'text.secondary'}}>
                                Notes:
                            </Typography>
                            <Typography sx={{fontWeight: "bold"}}>
                                {order.notes}
                            </Typography>
                        </Stack>
                        <Divider/>
                    </Stack>
                    : ''}
                    {order.drawings.length > 0?
                    <Box textAlign='center'>
                        <List
                            sx={{mb: 3, pb: 0, pt:0, width: '100%', bgcolor: 'background.paper', border: 1, borderRadius:2, borderColor: "#1C88B0 !important" }}
                        >
                            {order.drawings.map((d, i) => (
                            <div key={i}>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => handleOpenDrawing(d)}>
                                    <ListItemIcon>
                                        <ArchitectureIcon color='secondary' />
                                    </ListItemIcon>
                                    <ListItemText primary={d.title} />
                                    </ListItemButton>
                                </ListItem>
                                {i < order.drawings.length - 1 && <Divider sx={{ borderColor: '#1C88B0' }} />}
                            </div>
                        ))}
                        </List>
                    </Box>
                    :''}
                    </Stack>
                </DialogContent>
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
            : '' }
            <DrawingDialog
                drawing={drawing}
                openDrawingDialog={openDrawingDialog}
                setOpenDrawingDialog={setOpenDrawingDialog} 
            />
        </div>
    );
};