import React from 'react';
import ProjectPicker from '../components/ProjectPicker'
import ProjectCard from '../components/ProjectCard';
import QuoteCard from '../components/QuoteCard';
import { Button, Container, Stack } from '@mui/material';
import ContactModal from '../components/ContactModal'
import QuoteProjectToggle from '../components/QuoteProjectToggle';
import QuotePicker from '../components/QuotePicker'
import { projectType } from '../components/ToggleObjects';
import AddAddressForm from '../components/AddAddressForm';

function Projects(props) {
    const { token, user } = props;
    const [ project, setProject ] = React.useState({});
    const [ quote, setQuote ] = React.useState({});
    const [ contactOpen, setContactOpen ] = React.useState(false);
    const [ contact, setContact ] = React.useState({});
    const [ choosePicker, setChoosePicker ] = React.useState('projects');
    const [ openAddress, setOpenAddress ] = React.useState(false);

    const handleChangeProject = (newProject) => {
        setProject(newProject);
        setQuote({});
    };

    const handleChangeQuote = (newQuote) => {
        setQuote(newQuote);
        setProject({});
    };

    const handleContactOpen = (value) => {
        setContactOpen(value);
    };

    const handleSetContact = (contact) => {
        setContact(contact);
        setContactOpen(true);
    };

    const handleChangePicker = (newValue) => {
        setChoosePicker(newValue);
    };

    const handleOpenAddress = () => {
        setOpenAddress(!openAddress);
    };


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
                    {choosePicker === projectType[0].name?
                    <ProjectPicker
                        token={token}
                        handleChangeProject={handleChangeProject}
                        errors={{project: ''}}/>
                    :
                        <QuotePicker
                            token={token}
                            handleChangeQuote={handleChangeQuote}
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
                    {quote?
                    <>
                    <QuoteCard
                        quote={quote}
                        handleSetContact={handleSetContact}
                    />
                    <ContactModal
                        project={quote}
                        contact={contact}
                        handleContactOpen={handleContactOpen}
                        open={contactOpen}
                    />
                    </>
                    : ''
                    }
                    {/* <Button variant='contained' onClick={handleOpenAddress}>
                        Open Address
                    </Button> */}
                    <AddAddressForm
                        openAddress={openAddress}
                        setOpenAddress={setOpenAddress}
                        handleOpenAddress={handleOpenAddress}
                    />
            </Container>
        </div>
    );
};

export default Projects;