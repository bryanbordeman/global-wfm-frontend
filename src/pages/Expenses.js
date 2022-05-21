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
            <div> 
                Expenses
            </div>
            }
        </div>
    );
}

export default Expenses;