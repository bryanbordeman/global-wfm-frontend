import React from 'react';
import LoginMessage from '../components/LoginMessage';
import ProjectPicker from '../components/ProjectPicker'
import ProjectCard from '../components/ProjectCard';
import { Container } from '@mui/material';
import ContactModal from '../components/ContactModal'


function Projects(props) {
    const { user, token } = props
    const [ project, setProject ] = React.useState({})
    const [ contactOpen, setContactOpen ] = React.useState(false)
    const [ contact, setContact ] = React.useState({})

    const handleChangeProject = (newProject) => {
        setProject(newProject)
    }

    const handleContactOpen = (value) => {
        setContactOpen(value)
    }

    const handleSetContact = (contact) => {
        setContact(contact)
        setContactOpen(true)
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
                        token={token}
                        handleChangeProject={handleChangeProject}/>
                    {project ? 
                    <>
                    <ProjectCard
                        project={project}
                        handleSetContact={handleSetContact}
                    /> 
                    <ContactModal
                        project={project}
                        contact={contact}
                        handleContactOpen={handleContactOpen}
                        open={contactOpen}
                    />
                    </>
                    : ''}
                    
                </Container>
            </div>
            }
        </div>
    );
}

export default Projects;