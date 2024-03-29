import React from 'react';
import ProjectPicker from '../components/ProjectPicker';
import QuotePicker from '../components/QuotePicker';
import ServicePicker from '../components/ServicePicker';
import HSEPicker from '../components/HSEPicker';
import ProjectCard from '../components/ProjectCard';
import QuoteCard from '../components/QuoteCard';
import { Container, Stack } from '@mui/material';
import ProjectTypeDropdown from '../components/ProjectTypeDropdown';

export default function Projects(props) {
    const { token, user } = props;
    const [ project, setProject ] = React.useState({});
    const [ quote, setQuote ] = React.useState({});
    const [ menuOptions, setMenuOptions ] = React.useState(['Projects', 'Services', "HSE's"]);
    const [ menuSelection, setMenuSelection ] = React.useState(0);
    const [ picker, setPicker ] = React.useState('')

    React.useEffect(() => {
        if(user.groups.filter(group => (group.name === 'SALES')).length > 0){
            setMenuOptions(['Projects', 'Services', "HSE's", 'Quotes']);
        }
    },[])

    React.useEffect(() => {
        // if (didMount.current) {
            switch(menuSelection) {
                case 1:
                    // console.log('Services')
                    handleClear();
                    setPicker(
                        <ServicePicker
                            token={token}
                            handleChangeProject={handleChangeProject}
                            errors={{project: ''}}
                        />
                    )
                break;
                case 2:
                    // console.log("HSE's")
                    handleClear();
                    setPicker(
                        <HSEPicker
                            token={token}
                            handleChangeProject={handleChangeProject}
                            errors={{project: ''}}
                        />
                    )
                break;
                case 3:
                    // console.log('Quotes')
                    handleClear();
                    setPicker(
                        <QuotePicker
                            token={token}
                            handleChangeQuote={handleChangeQuote}
                            errors={{quote: ''}}
                        />
                    )
                break;
                default:
                    // console.log('Projects')
                    handleClear();
                    setPicker(
                        <ProjectPicker
                            token={token}
                            handleChangeProject={handleChangeProject}
                            errors={{project: ''}}
                        />
                    )
            }
        // } else {
        //     didMount.current = true;
        // }
    },[menuSelection]);

    const handleChangeProject = (newProject) => {
        setProject(newProject);
        setQuote({});
    };

    const handleChangeQuote = (newQuote) => {
        setQuote(newQuote);
        setProject({});
    };

    const handleClear = () => {
        setProject('');
        setQuote('');
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
                    <div style={{width: '100%', maxWidth: '400px', marginTop: '1.5rem'}}>
                    <Stack direction="row" spacing={1}>
                        {picker}
                        <ProjectTypeDropdown
                            user={user}
                            menuOptions={menuOptions}
                            menuSelection={menuSelection}
                            setMenuSelection={setMenuSelection}
                        />
                    </Stack>
                    </div>
                    {project ? 
                    <>
                    <ProjectCard
                        project={project}
                        user={user}
                        token={token}
                        menuSelection={menuSelection}
                    /> 
                    
                    </>
                    : ''}
                    {quote?
                    <>
                    <QuoteCard
                        quote={quote}
                        user={user}
                        token={token}
                    />
                    </>
                    : ''
                    }
            </Container>
        </div>
    );
};