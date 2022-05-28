import React from 'react';
import LoginMessage from '../components/LoginMessage';
import ProjectPicker from '../components/ProjectPicker'
import ProjectCard from '../components/ProjectCard';
import { Container } from '@mui/material';

function Projects(props) {
    const { user } = props
    const [ project, setProject ] = React.useState({})

    const handleChangeProject = (newProject) => {
        setProject(newProject)
    }

    return ( 
        <div>
            {!user.username  ? 
            <div>
            <LoginMessage/>
            </div>
            : 
            <div style={{paddingTop: '1rem'}}> 
            <Container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection:'column',
                    height: '100%'
                }}>
                    <ProjectPicker
                        handleChangeProject={handleChangeProject}/>
                    {project ? <ProjectCard
                        project={project}/> : ''}
                </Container>
            </div>
            }
        </div>
    );
}

export default Projects;