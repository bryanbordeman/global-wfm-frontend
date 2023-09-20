import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading(props) {
    const { open } = props;

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: 9999 }} // Set a high z-index value
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};
