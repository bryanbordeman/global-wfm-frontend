import React from 'react';
import LoginMessage from '../components/LoginMessage';

function Projects(props) {
    const { user } = props
    return ( 
        <div>
            {!user ? 
            <div>
            <LoginMessage/>
            </div>
            : 
            <div> 
                Projects
            </div>
            }
        </div>
    );
}

export default Projects;