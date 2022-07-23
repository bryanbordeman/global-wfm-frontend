import * as React from 'react';
import Divider from '@mui/material/Divider';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
        }}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
        }}
        {...props}
    />
    ))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
        padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
            fontSize: '1.25rem',
            // color: theme.palette.text.secondary,
            marginRight: theme.spacing(1.5),
        },
        '&:active': {
            backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
            ),
        },
        },
    },
    }));

export default function SubMenuTask(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };


return (
        <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
        >
            <MenuItem 
                sx={{color: 'primary.main'}} 
                onClick={() => {
                    handleMenuClose();
                }} 
                disableRipple
            >
                <EditIcon />
                Edit
            </MenuItem>
            <MenuItem 
                sx={{color: 'primary.main'}} 
                onClick={() => {
                    handleMenuClose();
                }}
                disableRipple
            >
                <PlaylistAddIcon />
                Add Subtask
            </MenuItem>
            <MenuItem 
                sx={{mb:2, color: 'success.main'}} 
                onClick={() => {
                    handleMenuClose();
                }} 
                disableRipple
            >
                <CheckCircleIcon />
                Complete Task
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem 
                sx={{color: 'error.dark', mt:2}} 
                onClick={() => {
                    handleMenuClose();
                }}
                disableRipple
            >
            <DeleteIcon/>
                Delete
            </MenuItem>
        </StyledMenu>
    );
};
