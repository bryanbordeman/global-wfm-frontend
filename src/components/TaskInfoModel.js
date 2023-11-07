import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';
import { Chip } from '@mui/material';
import  Divider from '@mui/material/Divider';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 375,
    width: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    };

const buttonStyle = {
    position: 'fixed',
    bottom: '10px', // Adjust this value to change the button's vertical position
    right: '10px',  // Adjust this value to change the button's horizontal position
};

export default function TaskInfoModel() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <IconButton style={buttonStyle} onClick={handleOpen} >
                <InfoOutlinedIcon/>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Task Format Information
                </Typography>
                <Divider color='primary' sx={{ borderWidth: '1px', marginBottom: 2 }} />
                <List>
                    <ListItem
                        disablePadding
                    >
                        <ListItemIcon >
                            <Badge 
                                color='secondary'
                                badgeContent=" "
                                invisible={true}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <Chip 
                                    sx={{mr:1}} 
                                    size='small' 
                                    color='primary'
                                    label='00000'
                                />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText 
                            primaryTypographyProps={{ 
                                style: {
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }
                            }}
                            primary='Public Task'
                        />
                    </ListItem>
                    <ListItem
                        disablePadding
                    >
                        <ListItemIcon >
                            <Badge 
                                color='secondary'
                                badgeContent=" "
                                invisible={true}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <Chip 
                                    sx={{mr:1}} 
                                    size='small' 
                                    color='success'
                                    label='00000'
                                />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText 
                            primaryTypographyProps={{ 
                                style: {
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }
                            }}
                            primary='Private Task'
                        />
                    </ListItem>
                    <ListItem
                        disablePadding
                    >
                        <ListItemIcon >
                            <Badge 
                                color='secondary'
                                badgeContent=" "
                                // invisible={true}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <Chip 
                                    sx={{mr:1}} 
                                    size='small' 
                                    color='primary'
                                    label='00000'
                                />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText 
                            primaryTypographyProps={{ 
                                style: {
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }
                            }}
                            primary='Unread created by you'
                        />
                    </ListItem>
                    <ListItem
                        disablePadding
                    >
                        <ListItemIcon >
                            <Badge 
                                color='warning'
                                badgeContent=" "
                                // invisible={true}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <Chip 
                                    sx={{mr:1}} 
                                    size='small' 
                                    color='primary'
                                    label='00000'
                                />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText 
                            primaryTypographyProps={{ 
                                style: {
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }
                            }}
                            primary='Unread created by others'
                        />
                    </ListItem>
                </List>
                </Box>
            </Modal>
        </div>
    );
};