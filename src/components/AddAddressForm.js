import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, IconButton } from '@mui/material';
import  Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Transition from './DialogTransistion';
import GoogleMapAutocomplete from './GoogleMapAutocomplete';
import CountrySelect from './CountrySelect';

export default function AddAddressForm(props) {
    
    const { 
            editing, 
            createAddress, 
            updateAddress,
            address,
            handleOpenAddress, 
            openAddress,
            setOpenAddress,
            } = props

    const initialFormValues = {
        address1: '', 
        address2: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
    }


    const editFormValues = {
        address1: editing? address.address1 : '', 
        address2: editing? address.address2 : '', 
        city: editing? address.city : '', 
        state: editing? address.state : '',  
        zip_code: editing? address.zip_code : '', 
        country: editing? address.country : '', 
    }

    const [ values, setValues ] = React.useState(initialFormValues);
    const [ errors, setErrors ] = React.useState({
        address1: null, 
        address2: null,
        city: null,
        state: null,
        zip_code: null,
        country: null,
    })

    React.useEffect(() => {
        setValues(editing ? editFormValues : initialFormValues)
    },[openAddress]);


    const handleSubmit = () => {
        const data = {
            address1: values.address1, 
            address2: values.address2, 
            city: values.city, 
            state: values.state, 
            zip_code: values.zip_code, 
            country: values.country,
        };

        if(editing){
            updateAddress(address.id, data);
            setOpenAddress(false);

        }
        else {
            createAddress(data);
            setOpenAddress(false);
        };
    };

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value
        });
    };


    const handleValidation = () => {
        let formIsValid = true;

        if(values.address1.length > 0){
            setErrors({...errors, address1: 'Field Required'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, address1: null});
            }, 3000);
        }
        else if(values.address2.length > 0){
            setErrors({...errors, address2: 'Field Required'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, address2: null});
            }, 3000);
        }
        else if(values.city.length > 0){
            setErrors({...errors, city: 'Field Required'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, city: null});
            }, 3000);
        }
        else if(values.state.length > 0){
            setErrors({...errors, state: 'Field Required'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, state: null});
            }, 3000);
        }
        else if(values.zip_code.length > 0){
            setErrors({...errors, zip_code: 'Field Required'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, zip_code: null});
            }, 3000);
        }
        else if(values.country.length > 0){
            setErrors({...errors, country: 'Field Required'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, country: null});
            }, 3000);
        }
        else{
            setErrors({
                address1: null, 
                address2: null,
                city: null,
                state: null,
                zip_code: null,
                country: null,
            });
            formIsValid = true;
        }
    return formIsValid ? handleSubmit() : null
    };


    return (
        <div>
        <Dialog 
            TransitionComponent={Transition}
            fullWidth 
            fullScreen
            open={openAddress} 
            onClose={handleOpenAddress}
            scroll={'body'}
            >
            <DialogTitle>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        {`${editing ? 'Edit' : 'Add'} Address`}
                    </div>
                    <div>
                    <IconButton 
                        edge="end" 
                        aria-label="close"
                        onClick={handleOpenAddress}
                            >
                        <CloseIcon />
                    </IconButton>
                    </div> 
                </div>
            </DialogTitle>
            <Divider/>
            <DialogContent>
            <Stack direction="column" spacing={2}>
                <GoogleMapAutocomplete/>
                <TextField
                    autoFocus={false}
                    margin="dense"
                    id="address1"
                    name='address1'
                    label="Address 1"
                    onChange={handleInputValue}
                    value={values.address1}
                    type="text"
                    fullWidth
                    variant="outlined"
                    helperText={errors.address1 === null ? '' : errors.address1}
                    error={errors.address1? true : false}
                />
                <TextField
                    autoFocus={false}
                    margin="dense"
                    id="address2"
                    name='address2'
                    label="Address 2"
                    onChange={handleInputValue}
                    value={values.address2}
                    type="text"
                    fullWidth
                    variant="outlined"
                    helperText={errors.address2 === null ? '' : errors.address2}
                    error={errors.address2? true : false}
                />
                <TextField
                    autoFocus={false}
                    margin="dense"
                    id="city"
                    name='city'
                    label="City"
                    onChange={handleInputValue}
                    value={values.city}
                    type="text"
                    fullWidth
                    variant="outlined"
                    helperText={errors.city === null ? '' : errors.city}
                    error={errors.city? true : false}
                />
                <TextField
                    autoFocus={false}
                    margin="dense"
                    id="state"
                    name='state'
                    label="State"
                    onChange={handleInputValue}
                    value={values.state}
                    type="text"
                    fullWidth
                    variant="outlined"
                    helperText={errors.state === null ? '' : errors.state}
                    error={errors.state? true : false}
                />
                <TextField
                    autoFocus={false}
                    margin="dense"
                    id="zip_code"
                    name='zip_code'
                    label="Zip Code"
                    onChange={handleInputValue}
                    value={values.zip_code}
                    type="text"
                    fullWidth
                    variant="outlined"
                    helperText={errors.zip_code === null ? '' : errors.zip_code}
                    error={errors.zip_code? true : false}
                />
                <CountrySelect/>
                {/* <TextField
                    autoFocus={false}
                    margin="dense"
                    id="country"
                    name='country'
                    label="Country"
                    onChange={handleInputValue}
                    value={values.country}
                    type="text"
                    fullWidth
                    variant="outlined"
                    helperText={errors.country === null ? '' : errors.country}
                    error={errors.country? true : false}
                /> */}
            </Stack>
            </DialogContent>
            <Divider/>
            <DialogActions>
                <Button variant='outlined' onClick={handleOpenAddress}>Cancel</Button>
                <Button variant='contained' onClick={handleValidation}>{editing ? 'Update' : 'Submit'}</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
