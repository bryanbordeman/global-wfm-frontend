import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, Typography, IconButton, TextField } from '@mui/material';
import  Divider from '@mui/material/Divider';
import Transition from './DialogTransistion'
import CloseIcon from '@mui/icons-material/Close';

export default function AddVehicleIssueForm(props) {
    const { user } = props 
    const { open, setOpen } = props;
    const { vehicle, createVehicleIssue, updateVehicleIssue } = props;
    const { editIssue } = props;
    const [ isValid, setIsValid ] = React.useState(true);
    const [ errors, setErrors ] = React.useState({});
    const [ isEdit, setIsEdit ] = React.useState(false);

    const initialFormValues = {
        created_by: user.id,
        vehicle: vehicle.id,
        description:'',
        is_resolved: false,
    };
    
    const [ values, setValues ] = React.useState({});

    React.useEffect(() => {
        if(editIssue !== undefined && Object.keys(editIssue).length > 0){
            // setValues(editIssue);
            setValues({...editIssue, date: new Date(editIssue.date.replaceAll('-','/'))})
            setIsEdit(true);
        }else{
            setValues(initialFormValues);
        }
    },[open]);
    
    
    // React.useEffect(() => {
    //     setValues(initialFormValues);
    // },[props])
    
    const handleClose = () => {
        setOpen(false);
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

        if(values.description === ''){
            setErrors({...errors, description: 'Required field'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, description: null});
            }, 3000);
        }
        
        else{
            setErrors({
                description: null,
            });
            formIsValid = true;
        }
        setIsValid(formIsValid)
        setTimeout(() => {
            setIsValid(true);
        }, 3000);
    return formIsValid ? handleSubmit() : null
    };

    const handleSubmit = () => {
        if(isEdit){
            if(values.description !== editIssue.description){
                if(Object.keys(values.created_by).length > 0 && Object.keys(values.vehicle).length > 0){
                    let temp = values
                    temp.created_by = values.created_by.id
                    temp.vehicle = values.vehicle.id
                    updateVehicleIssue(editIssue.id, temp);
                }  
            }
        }else{
            createVehicleIssue(values);
        }
        handleClose();
    };

    return (
        <div>
            <Dialog 
                TransitionComponent={Transition}
                fullWidth 
                fullScreen
                open={open} 
                onClose={handleClose}
                scroll={'paper'} 
            >
            <DialogTitle>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Stack>
                            <Typography variant="h6">
                                {isEdit? 'Edit Vehicle Issue' : 'Report Vehicle Issue'}
                            </Typography>
                            <Typography variant="subtitle1">
                                {vehicle.nickname}
                            </Typography>
                        </Stack>
                    <div>
                        <IconButton 
                            edge="end" 
                            aria-label="close"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                        </div> 
                    </div>
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <Stack direction="column" spacing={2}>
                        <TextField
                            autoFocus={false}
                            id="description"
                            name="description"
                            label="Description of Issue "
                            onChange={handleInputValue}
                            value={values.description}
                            multiline
                            rows={8}
                            helperText={errors.description === null ? '' : errors.description}
                            error={errors.description? true : false}
                        />
                    </Stack>
                
                </DialogContent>
                <Divider/>
                    {isEdit?
                    <div>
                        <DialogActions>
                            <DialogContent sx={{pt:0, pb:0}}>
                                <Stack direction="column" spacing={0}>
                                    <Typography variant="caption" color={'error'}>
                                        Created By: {isEdit && editIssue.created_by? 
                                        `${editIssue.created_by.first_name} ${editIssue.created_by.last_name}` 
                                        : ''}
                                    </Typography>
                                </Stack>
                            </DialogContent>
                        </DialogActions>
                        <Divider/>
                    </div>
                    :''}
                    <DialogActions>
                    <Button 
                        variant='outlined' 
                        onClick={handleClose}
                    >Cancel</Button>
                    <Button 
                        variant='contained' 
                        onClick={handleValidation}
                        // onClick={handleValidation}
                        color={`${isValid? 'primary' : 'error'}`}
                    >
                        {isEdit ? 'Update' : 'Submit'}
                    </Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
};