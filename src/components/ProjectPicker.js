import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ProjectDataService from '../services/Project.services'

export default function ProjectPicker(props) {
    const [ value, setValue ] = React.useState(null);
    const [ projects, setProjects ] = React.useState([{}])
    const [ inputValue, setInputValue ] = React.useState('');

    const { handleChangeProject, errors} = props
    const { editing, editObject } = props;

    React.useEffect(() => {
        retrieveProject()
        
    },[])

    const retrieveProject = () => {
        ProjectDataService.getAll(props.token)
        .then(response => {
            setProjects(response.data);
            if(editing){
                handleInputValue(editObject.project);
            };
        })
        .catch( e => {
            console.log(e);
        })
    }
    const handleInputValue = (newValue) => {
        setValue(newValue);
        handleChangeProject(newValue)
    };

    return (
        <Autocomplete
            disablePortal
            fullWidth
            autoSelect = {false}
            blurOnSelect = 'touch'
            // value={editing? editObject.project : value}
            value={value}
            onChange={(event, newValue) => {
                handleInputValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            options={projects}
            isOptionEqualToValue={(option, newValue) => {
                return option.id === newValue.id;
            }}
            getOptionLabel={(option) => `${option.number} ${option.name}`}
            renderInput={(params) => <TextField 
                                    helperText={errors.project === null ? '' : errors.project}
                                    error={errors.project? true : false}
                                    {...params} 
                                    id="project"
                                    name='project'
                                    label="Search Projects" 
                                    />}
        />
    );
};