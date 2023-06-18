import React from 'react';
import DoorWorkOrderDialog from '../components/DoorWorkOrderDialog';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { Button, Chip } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRef } from 'react';
import { parseISO } from 'date-fns';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import moment from 'moment-timezone';
import response from '../json/doorOrders.json';

const currentDate = moment.tz(new Date(), "America/New_York")._d

function DueDate(props) {
    const { order, user, updateOrder, darkState} = props
    const [ isForcePickerOpen, setIsOpen ] = React.useState(false);
    const [ value, setValue ] = React.useState('')
    const customInputRef = useRef();

    React.useLayoutEffect(() => {
        setValue(order.due_date)
    },[order]);
    

    const handleDateChange = (newDate) => {
        // const pythonDate = newDate.toISOString().split('T')[0];
        setValue(newDate)
        updateOrder(order.id, newDate)
    };

    let dateDelta = Math.ceil((new Date(value).getTime()-currentDate.getTime())/(1000 * 3600 * 24))
    let dueMessage = ''

        switch(true) {
            case (dateDelta === 0):
                dueMessage = 'Today'
            break;
            case (dateDelta === 1):
                dueMessage = 'Tomorrow'
            break;
            case (dateDelta < 0 && dateDelta !== -1):
                dueMessage = `${Math.abs(dateDelta)} days ago`
            break;
            case (dateDelta === -1):
                dueMessage = 'Yesterday'
            break;
            case (dateDelta > 1):
                dueMessage = `In ${dateDelta} days`
            break;

            default:
                dueMessage = ''
        }
        
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
            open={isForcePickerOpen}
            onClose={() => {
                setIsOpen(false);
            }}
            value={parseISO(value)}
            onChange={(newDate) => {
                handleDateChange(newDate);
            }}
            PopperProps={{ anchorEl: customInputRef.current }}
            renderInput={({
                ref,
                inputProps,
                disabled,
                onChange,
                value
            }) => (
                <div ref={ref}>
                <input
                    style={{ opacity: 0, width: 0, height: 0 }}
                    value={parseISO(value)}
                    onChange={onChange}
                    disabled={disabled}
                    ref={customInputRef}
                    {...inputProps}
                />
                
                <Button
                    sx={{mr: 1, whiteSpace: 'nowrap', textTransform: 'none', borderColor: !darkState? 'rgba(0, 0, 0, 0.12)' : ''}}
                    size='small'
                    variant="outlined"
                    color={dateDelta < 0? 'warning' : 'primary'} 
                    onClick={() => {
                        setIsOpen(isOpen => user.is_staff? !isOpen : isOpen)
                    }}
                    startIcon={<EventAvailableIcon />}
                >
                    {dueMessage}
                </Button>
                </div>
            )}
            />
        </LocalizationProvider>
    );
};


export default function Doors(props) {
    const { user, token, handleOpenSnackbar, darkState} = props;
    const [ openDoorWorkOrderDialog, setOpenDoorWorkOrderDialog ] = React.useState(false);
    const [ DoorWorkOrder, setDoorWorkOrder ] = React.useState('');
    const [ doorOrderList, setDoorOrderList ] = React.useState([]);


    React.useEffect(() => {
        retrieveOrders();
    },[]);

    const updateOrder = (id, newDate) => {
        console.log(id, newDate);
    }

    const retrieveOrders = () => {
        const data = response.data
        const sortedList = data.sort((a, b) => {
            const dueDateA = new Date(a.due_date);
            const dueDateB = new Date(b.due_date);
            
            return dueDateA - dueDateB;
        });
        setDoorOrderList(sortedList);
    };

    const handleOpenWorkOrder = (order) => {
        setOpenDoorWorkOrderDialog(true);
        setDoorWorkOrder(order)
    };

    return ( 
        <div>
            <Typography sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection:'column',
                        height: '100%',
                    }}
            
            variant="h5" gutterBottom>
                DOOR WORK ORDERS
            </Typography>
            <Divider sx={{mb:3}}/>
            <List
                sx={{mb: 3, pb: 0, pt:0, width: '100%', bgcolor: 'background.paper', border: 1, borderRadius:2, borderColor: "#1C88B0 !important" }}
            >
                {doorOrderList.map ((order, key) => (
                <div key={key}>
                    <ListItem
                        disablePadding
                    >
                        <ListItemButton
                            onClick={() => handleOpenWorkOrder(order)}>
                            <ListItemIcon>
                                <Chip 
                                    sx={{mr:1}} 
                                    // variant={darkState? '' : 'outlined'}
                                    size='small' 
                                    color='primary' 
                                    label={order.project.number}
                                />
                            </ListItemIcon>
                            <ListItemText 
                                primaryTypographyProps={{ 
                                    style: {
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }
                                }}
                                // id={labelId} 
                                primary={order.project.name}
                                secondary='Door 1 of 1'
                                />
                        </ListItemButton>
                        <Grid 
                            xs="auto"
                            item
                            container 
                            justifyContent="flex-end" 
                            alignItems="flex-end">
                            <DueDate
                                order={order}
                                darkState={darkState}
                                user={user}
                                updateOrder={updateOrder}
                            />
                        </Grid>
                    </ListItem>
                    {key < doorOrderList.length - 1 && <Divider  sx={{ borderColor: "#1C88B0 !important" }}
                    />}
                </div>
                ))}
            </List>
            <DoorWorkOrderDialog
                openDoorWorkOrderDialog = {openDoorWorkOrderDialog}
                setOpenDoorWorkOrderDialog = {setOpenDoorWorkOrderDialog}
                order={DoorWorkOrder}
                setDoorWorkOrder={setDoorWorkOrder}
                darkState={darkState}
            />
        </div>
    );
};