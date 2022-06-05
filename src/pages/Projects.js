import React from 'react';
import ProjectPicker from '../components/ProjectPicker'
import ProjectCard from '../components/ProjectCard';
import { Container } from '@mui/material';
import ContactModal from '../components/ContactModal'


function Projects(props) {
    const { token } = props
    // const { user, token } = props
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
        <div style={{paddingTop: '1rem'}}> 
            <Container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection:'column',
                    height: '100%'
                }}>
                    <div style={{width: '100%', maxWidth: '400px', marginTop: '0.5rem'}}>
                    <ProjectPicker
                        token={token}
                        handleChangeProject={handleChangeProject}
                        errors={{project: ''}}/>
                    </div>
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
    );
}

export default Projects;