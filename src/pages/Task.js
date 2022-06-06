import React from 'react';
import { Container, Fab } from '@mui/material';
import TaskTabs from '../components/TaskTabs'
import AddIcon from '@mui/icons-material/Add';

function Task(props) {
    // const { user } = props
    return ( 
        <div style={{paddingTop: '1rem'}}> 
            <Container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection:'column',
                        height: '100%'
                    }}>
                    <TaskTabs/>
                    <Fab 
                        sx={{margin: 0,
                            top: 'auto',
                            // right: '20px',
                            bottom: '20px',
                            left: 'auto',
                            position: 'fixed'}}
                        color="primary" 
                        aria-label="add">
                        <AddIcon />
                    </Fab>
            </Container>
        </div>
    );
}

export default Task;