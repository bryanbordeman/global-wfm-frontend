import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const options = ['Projects', 'Services', "HSE's"];

//! need to figure out good UI for services and hses. maybe popup menu?

export default function QuoteProjectToggle(props) {
    const { choosePicker, handleChangePicker } = props
    const [value, setValue] = React.useState('projects');
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };


    // React.useEffect(() => {
    //     projectType.forEach((project) => {
    //         if(choosePicker === project.name)
    //             setValue(project.id)
    //     })
    // })

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // if(projectType.find(x => x.id === newValue))
        //     handleChangePicker(projectType.find(x => x.id === newValue).name)
    };

    return (
        <ToggleButtonGroup
            fullWidth
            orientation="vertical"
            sx={{width: '7rem'}}
            color="primary"
            value={value}
            exclusive
            onChange={handleChange}
        >
            <div>
            <ButtonGroup fullWidth variant="outlined" ref={anchorRef} aria-label="split button">
                <ToggleButton key={1} sx={{width: '100%', pt:0, pb:0}} value={1} onClick={handleClick}>{options[selectedIndex]}</ToggleButton>
                <Button
                sx={{width:'20%', pt:0, pb:0}}
                size="small"
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
                >
                <ArrowDropDownIcon/>
                </Button>
            </ButtonGroup>
            <ToggleButton key={2} sx={{width: '100%', pt:0, pb:0}} value={2}>Quote</ToggleButton>
        <Popper
            sx={{
            zIndex: 1,
            }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
        >
            {({ TransitionProps, placement }) => (
            <Grow
                {...TransitionProps}
                style={{
                transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
            >
                <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                        <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                        >
                        {option}
                        </MenuItem>
                    ))}
                    </MenuList>
                </ClickAwayListener>
                </Paper>
            </Grow>
            )}
        </Popper>
        </div>
            {/* {projectType.map(project => (
                <ToggleButton key={project.id} sx={{width: '100%', pt:0, pb:0}} value={project.id}>{project.name}</ToggleButton>
            ))} */}
            {/* <ToggleButton sx={{width: '100%', pt:0, pb:0}}>Quote</ToggleButton> */}
        </ToggleButtonGroup>
    );
}
