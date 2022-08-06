import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import QuoteDataService from '../services/Quote.services'

export default function QuotePicker(props) {
    const [ value, setValue ] = React.useState(null);
    const [ quotes, setQuotes ] = React.useState([{}])
    const [ inputValue, setInputValue ] = React.useState('');

    const { handleChangeQuote } = props
    const { editing, editObject } = props;
    const errors = {project: ''}

    React.useEffect(() => {
        retrieveQuotes()
        
    },[])

    const retrieveQuotes = () => {
        QuoteDataService.getAll(props.token)
        .then(response => {
            setQuotes(response.data);
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
        handleChangeQuote(newValue)
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
            options={quotes}
            isOptionEqualToValue={(option, newValue) => {
                return option.id === newValue.id;
            }}
            getOptionLabel={(option) => String(option.number).toString()}
            renderInput={(params) => <TextField 
                                    helperText={errors.project === null ? '' : errors.project}
                                    error={errors.project? true : false}
                                    {...params} 
                                    id="quote"
                                    name='quote'
                                    label="Search Quotes" 
                                    />}
        />
    );
};