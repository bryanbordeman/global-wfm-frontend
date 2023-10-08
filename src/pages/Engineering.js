import React from 'react';
import EngTabs from '../components/EngTabs';

export default function Engineering(props) {
    const { user, token, handleOpenSnackbar } = props
    return ( 
        <div style={{paddingTop: '1rem'}}> 
            <EngTabs
                user={user}
                token={token}
                handleOpenSnackbar={handleOpenSnackbar}
            />
        </div>
    );
};