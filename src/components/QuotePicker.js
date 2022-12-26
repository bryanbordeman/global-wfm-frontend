import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import QuoteDataService from '../services/Quote.services'
import CircularProgress from '@mui/material/CircularProgress';

export default function QuotePicker(props) {
    const [ value, setValue ] = React.useState(null);
    const [ quotes, setQuotes ] = React.useState([{}])
    const [ inputValue, setInputValue ] = React.useState('');
    const [ isLoading, setIsLoading ] = React.useState(true);

    const { handleChangeQuote, errors } = props
    const { editing, editObject } = props;

    React.useEffect(() => {
        retrieveQuotes()
        
    },[])

    const retrieveQuotes = () => {
        setIsLoading(true);
        QuoteDataService.getAll(props.token)
        .then(response => {
            setQuotes(response.data);
            if(editing){
                handleInputValue(editObject.quote);
            };
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
        handleChangeQuote(newValue)
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
            options={quotes}
            isOptionEqualToValue={(option, newValue) => {
                return option.id === newValue.id;
            }}
            getOptionLabel={(option) => `${option.number} ${option.name}`}
            renderInput={(params) => <TextField 
                                    helperText={errors.quote === null || errors.project === null? '' : errors.quote || errors.project}
                                    error={errors.quote || errors.project? true : false}
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
                                    id="quote"
                                    name='quote'
                                    label={isLoading? "Loading..." : "Search Quotes"}
                                    />}
        />
    );
};