import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ProjectDataService from '../services/Project.services'
import CircularProgress from '@mui/material/CircularProgress';

export default function ProjectPicker(props) {
    const [ value, setValue ] = React.useState(null);
    const [ projects, setProjects ] = React.useState([{}])
    const [ inputValue, setInputValue ] = React.useState('');
    const [ isLoading, setIsLoading ] = React.useState(true);

    const { handleChangeProject, errors} = props
    const { editing, editObject } = props;
    const didMount = React.useRef(false);

    React.useEffect(() => {
        //! renders twice??
        if (didMount.current) {
            handleClear();
            retrieveProject();
        } else {
            didMount.current = true;
        }
    },[])

    React.useEffect(() => {
        //! renders twice??
        if (didMount.current) {
            if(editing){
                handleInputValue(editObject.project);
            };
        } else {
            didMount.current = true;
        }
    },[])

    const retrieveProject = () => {
        setIsLoading(true);
        ProjectDataService.getAll(props.token)
            .then(response => {
                setProjects(response.data);
            })
            .catch( e => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    const handleInputValue = (newValue) => {
        setValue(newValue);
        if(!isLoading)
            handleChangeProject(newValue);
    };

    const handleClear = () => {
        setValue(null);
    };

    return (
        <Autocomplete
            disablePortal
            fullWidth
            autoSelect = {false}
            blurOnSelect = 'touch'
            loading={isLoading}
            disabled={isLoading}
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
            getOptionLabel={(option) => isLoading? '' : `${option.number} ${option.name}`}
            renderInput={(params) => <TextField 
                                    helperText={errors.project === null ? '' : errors.project}
                                    error={errors.project? true : false}
                                    {...params} 
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                        <React.Fragment>
                                            {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                        ),
                                    }}
                                    id="project"
                                    name='project'
                                    label={isLoading? "Loading..." : "Search Projects"}
                                    />}
        />
    );
};