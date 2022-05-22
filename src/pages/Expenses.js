import React from 'react';
import LoginMessage from '../components/LoginMessage';

function Expenses(props) {
    const { user } = props
    return ( 
        <div>
            {!user.username  ? 
            <div>
            <LoginMessage/>
            </div>
            : 
            <div style={{paddingTop: '1rem'}}> 
                Expenses
            </div>
            }
        </div>
    );
}

export default Expenses;