import React from 'react';
import DoorWorkOrderDialog from '../components/DoorWorkOrderDialog';
import DoorDataService from '../services/Door.services';
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
        setValue(order.due)
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

let doorCount = 1; // Variable to store the current door count within a series

export default function Doors(props) {
    const { user, token, handleOpenSnackbar, darkState} = props;
    const [ openDoorWorkOrderDialog, setOpenDoorWorkOrderDialog ] = React.useState(false);
    const [ DoorWorkOrder, setDoorWorkOrder ] = React.useState('');
    const [ doorOrderList, setDoorOrderList ] = React.useState([]);
    const [ doorNumberList, setDoorNumberList ] = React.useState([]);

    React.useEffect(() => {
        // Reset doorCount to 1 whenever doorNumberList changes
        doorCount = 1;
    }, [doorNumberList]);

    React.useEffect(() => {
        retrieveOrders();
    },[]);

    const updateOrder = (id, newDate) => {
        const order = doorOrderList.filter((o) => (o.id === id))[0]
        const sanitizeData = {
            ...order,
            project:  order.project ?  order.project.id : '',
            due: newDate,
            rev: order.rev && order.rev.length > 0 ? order.rev.map((i) => (i.id)) : [],
            created_by: order.created_by ? order.created_by.id : '',
            checked_by: order.checked_by ? order.checked_by.id : '',
            door_type: order.door_type ? order.door_type.id : '',
            lockset: order.lockset ? order.lockset.id : '',
            sill_type: order.sill_type ? order.sill_type.id : '',
            frame_type: order.frame_type ? order.frame_type.id : '',
            core_type: order.core_type ? order.core_type.id : '',
            hinge_type: order.hinge_type ? order.hinge_type.id : '',
            options: order.options && order.options.length > 0 ? order.options.map((i) => (i.id)) : [],
            packaging: order.packaging ? order.packaging.id : '',
            drawings:  order.drawings && order.drawings.length > 0 ? order.drawings.map((i) => (i.id)) : [],
            log: order.log && order.log.length > 0 ? order.log.map((i) => (i.id)) : [],
            qr_code: order.qr_code ? order.qr_code.id : null,
        };
        
        DoorDataService.updateDoor(id, sanitizeData, token)
            .then(response => {
                const updatedOrder = response.data;

                const updatedList = [...doorOrderList];
                const index = updatedList.findIndex((item) => item.id === updatedOrder.id);

                if (index !== -1) {
                    updatedList[index] = {
                        ...updatedList[index],
                        due: updatedOrder.due
                    };
                setDoorOrderList(updatedList);
                }
                handleOpenSnackbar('info', 'Door was updated');
            })
            .catch( e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            });
    };


    const retrieveOrders = () => {
        const tempDoorNumberList = []
        // setIsLoading(true);
        DoorDataService.getAll(token)
            .then(response => {
                const data = response.data
                const sortedList = data.sort((a, b) => {
                    // Compare project.number first
                    const projectNumberA = a.project.number;
                    const projectNumberB = b.project.number;
                    if (projectNumberA < projectNumberB) return -1;
                    if (projectNumberA > projectNumberB) return 1;
                    // If project.number is the same, compare due_date
                    const dueDateA = new Date(a.due_date);
                    const dueDateB = new Date(b.due_date);
                    if (dueDateA < dueDateB) return -1;
                    if (dueDateA > dueDateB) return 1;
                    return 0;
                });
                sortedList.map((d) => {
                    let object = {"number": d.project.number, "quantity": 1, "doors" : 1 };
                    // Check if the number already exists in doorNumberList
                    const existingDoor = tempDoorNumberList.find((door) => door.number === object.number);
                    if (existingDoor) {
                    // If the number exists, increase the quantity
                    existingDoor.quantity += object.quantity;
                    existingDoor.doors += object.doors;
                    } else {
                    // If the number doesn't exist, add it to doorNumberList
                    tempDoorNumberList.push(object);
                    }
                });
                // setDoorNumberList(tempDoorNumberList);
                setDoorOrderList(sortedList);
                    
            })
            .catch( e => {
                console.log(e);
            })
            .finally(() => {
                // setIsLoading(false);
            })
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
            { doorOrderList.length > 0 ? <List
                sx={{mb: 3, pb: 0, pt:0, width: '100%', bgcolor: 'background.paper', border: 1, borderRadius:2, borderColor: "#1C88B0 !important" }}
            >
                {doorOrderList.map ((order, key) => {
                    const door = doorNumberList.find((n) => n.number === order.project.number);
                    const seriesCounter = door ? door.quantity : 1;
                    let secondaryText = `Door ${doorCount} of ${seriesCounter}`;
                    if (key > 0 && order.project.number !== doorOrderList[key - 1].project.number) {
                      // Reset doorCount to 1 for a new series
                        doorCount = 1;
                        secondaryText = `Door 1 of ${seriesCounter}`;
                    } else if (door) {
                      // Increment doorCount within the series
                        doorCount += 1;
                    }
                    return (
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
                                //! need to figure out how to 
                                secondary={secondaryText}
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
                )})}
            </List> : ''}
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