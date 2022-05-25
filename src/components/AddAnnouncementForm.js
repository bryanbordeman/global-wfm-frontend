import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import  Divider from '@mui/material/Divider';

export default function AddAnnouncementForm(props) {
    
    const { 
            editing, 
            createAnnouncement, 
            updateAnnouncement,
            announcement,
            handleClose, 
            openAdd,
            setOpenAdd,
            } = props

    const initialFormValues = {
        title: '', 
        memo: '',
        is_active: true
    }

    const editFormValues = {
        title: announcement.title,
        memo: announcement.memo,
        is_active: announcement.is_active
    }

    const [ values, setValues ] = React.useState(initialFormValues);
    const [ errors, setErrors ] = React.useState({
        title: null,
        memo: null,
    })

    React.useEffect(() => {
        setValues(editing ? editFormValues : initialFormValues)
    },[openAdd]);


    const handleSubmit = () => {
        const data = {
            title: values.title, 
            memo: values.memo, 
            is_active: values.is_active
        };

        if(editing){
            updateAnnouncement(announcement.id, data);
            setOpenAdd(false);

        }
        else {
            createAnnouncement(data);
            setOpenAdd(false);
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

    //     if(values.project.length > 5){
    //         setErrors({...errors, project: 'Invalid Entry'});
    //         formIsValid = false;
    //         setTimeout(() => {
    //             formIsValid = true;
    //             setErrors({...errors, project: null});
    //         }, 3000);
    //     }
    //     else if(values.project === ''){
    //         setErrors({...errors, project: 'Required field'});
    //         formIsValid = false;
    //         setTimeout(() => {
    //             formIsValid = true;
    //             setErrors({...errors, project: null});
    //         }, 3000);
    //     }
    //     else if(values.date > new Date()){
    //         setErrors({...errors, date: 'Date cannot be in the future.'});
    //         formIsValid = false;
    //         setTimeout(() => {
    //             formIsValid = true;
    //             setErrors({...errors, date: null});
    //         }, 3000);
    //     }
    //     else if(values.startTime > values.endTime){
    //         setErrors({...errors, startTime: 'Start time needs to be before end time'});
    //         formIsValid = false;
    //         setTimeout(() => {
    //             formIsValid = true;
    //             setErrors({...errors, startTime: null});
    //         }, 3000);
    //     }
    //     else if(values.travel < 0){
    //         setErrors({...errors, travel: 'Travel time can not be negitive'});
    //         formIsValid = false;
    //         setTimeout(() => {
    //             formIsValid = true;
    //             setErrors({...errors, travel: null});
    //         }, 3000);
    //     }
    //     else if(values.travel > msToTime(values.endTime - values.startTime)){
    //         setErrors({...errors, travel: 'Travel time can not be greater then total time'});
    //         formIsValid = false;
    //         setTimeout(() => {
    //             formIsValid = true;
    //             setErrors({...errors, travel: null});
    //         }, 3000);
    //     }
    //     else{
    //         setErrors({
    //             project: null,
    //             date: null,
    //             startTime: null,
    //             endTime: null,
    //             travel: null,
    //         });
    //         formIsValid = true;
    //     }
    // return formIsValid ? handleSubmit() : null
    };


    return (
        <div>
        <Dialog 
            fullWidth 
            open={openAdd} 
            onClose={handleClose}
            scroll={'body'}
            
            >
            <DialogTitle>{`${editing ? 'Edit' : 'Add'} Announcement`}</DialogTitle>
            <Divider/>
            <DialogContent>
            <Stack direction="column" spacing={2}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    name='title'
                    label="Title"
                    onChange={handleInputValue}
                    value={values.title}
                    type="text"
                    fullWidth
                    variant="outlined"
                    helperText={errors.title === null ? '' : errors.title}
                    error={errors.title? true : false}
                />
                <TextField
                    id="memo"
                    name="memo"
                    label="Memo"
                    onChange={handleInputValue}
                    value={values.memo}
                    multiline
                    rows={10}
                />
                <FormControlLabel
                    onChange={() => {setValues({...values, is_active: !values.is_active})}}
                    control={<Switch checked={values.is_active} color="primary" />}
                    id="is_active"
                    name="is_active"
                    label="Is Active"
                    value={values.is_active}
                />
            </Stack>
            </DialogContent>
            <Divider/>
            <DialogActions>
            <Button variant='outlined' onClick={handleClose}>Cancel</Button>
            <Button variant='contained' onClick={handleValidation}>{editing ? 'Update' : 'Submit'}</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
