import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ProjectDataService from '../services/Project.services'
import CircularProgress from '@mui/material/CircularProgress';

export default function ProjectPicker(props) {
    const [ value, setValue ] = React.useState(null);
    const [ projects, setProjects ] = React.useState([{}])
    const [ inputValue, setInputValue ] = React.useState('');
    const [ isLoading, setIsLoading ] = React.useState(false);

    const { handleChangeProject, errors} = props
    const { editing, editObject } = props;
    const didMount = React.useRef(false);

    React.useEffect(() => {
        handleClear();
        retrieveProject();
    },[]);

    // React.useEffect(() => {
    //     //! renders twice??
    //     if (didMount.current && editing) {
    //         handleClear();
    //         retrieveProject();
    //     } else {
    //         didMount.current = true;
    //         handleClear();
    //         retrieveProject();
    //     }
    // },[editing])

    React.useEffect(() => {
        //! renders twice??
        if(editing){
            handleInputValue(editObject.project);
        };
    },[editing])

    const retrieveProject = () => {
        setProjects([]);
        setIsLoading(true);
        ProjectDataService.getAll(props.token)
            .then(response => {
                // setProjects(response.data)
                //!sort by project number
                let obj = response.data; // object of all open projects
                let tempObj = {}; // temp object to be sorted by year
                // make keys of years
                obj.map((p) => {
                    tempObj[`${p.number.slice(-2)}`] = []
                });
                obj.map((p) => {
                    // add object to year list
                    Object.entries(tempObj).filter(([key]) => {
                        if(key === p.number.slice(-2)){
                            tempObj[key].push(p)
                        }
                    });
                });
                // make list of keys so it can be mapped
                let keys = Object.keys(tempObj);
                keys.map((k) => {
                    tempObj[k].sort((a, b) => (a.number < b.number) ? 1 : -1)
                })
                // map through keys and add ojects to rows
                keys.slice(0).reverse().map((k) => {
                    tempObj[k].map((p) => {
                        setProjects(oldArray => [...oldArray, p]);
                    });
                });
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