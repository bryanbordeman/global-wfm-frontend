import React from 'react';
import EngTabs from '../components/EngTabs';

export default function Engineering(props) {
    const { user, token, handleOpenSnackbar, darkState} = props
    return ( 
        <div style={{paddingTop: '1rem'}}> 
            <EngTabs/>
        </div>
    );
};