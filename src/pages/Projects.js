import React from 'react';
import ProjectPicker from '../components/ProjectPicker'
import ProjectCard from '../components/ProjectCard';
import { Container, Stack } from '@mui/material';
import ContactModal from '../components/ContactModal'
import QuoteProjectToggle from '../components/QuoteProjectToggle';
import QuotePicker from '../components/QuotePicker'



function Projects(props) {
    const { token, user } = props
    // const { user, token } = props
    const [ project, setProject ] = React.useState({})
    const [ contactOpen, setContactOpen ] = React.useState(false)
    const [ contact, setContact ] = React.useState({})
    const [ choosePicker, setChoosePicker ] = React.useState('projects')

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

    const handleChangePicker = (newValue) => {
        setChoosePicker(newValue);
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
                    <Stack direction="row" spacing={1}>
                    {choosePicker === 'projects'?
                    <ProjectPicker
                        token={token}
                        handleChangeProject={handleChangeProject}
                        errors={{project: ''}}/>
                    :
                        <QuotePicker
                            token={token}
                            handleChangeQuote={handleChangeProject}
                            errors={{quote: ''}}
                        />
                    }
                    {user.groups.filter(group => (group.name === 'SALES')).length > 0 ? 
                        <QuoteProjectToggle
                            handleChangePicker={handleChangePicker}
                            choosePicker={choosePicker}
                        />
                        : ''}
                    </Stack>
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