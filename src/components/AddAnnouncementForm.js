import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, IconButton } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import  Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Transition from './DialogTransistion'

export default function AddAnnouncementForm(props) {
    
    const { 
            editing, 
            createAnnouncement, 
            updateAnnouncement,
            announcement,
            handleClose, 
            openAdd,
            setOpenAdd,
            } = props;

    const initialFormValues = {
        title: '', 
        memo: '',
        is_active: true
    };

    const editFormValues = {
        title: announcement.title,
        memo: announcement.memo,
        is_active: announcement.is_active
    };

    const [ values, setValues ] = React.useState(initialFormValues);
    const [ errors, setErrors ] = React.useState({
        title: null,
        memo: null,
    });

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

        if(values.title.length > 100){
            setErrors({...errors, title: '100 character max.'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, title: null});
            }, 3000);
        }
        else if(values.memo.length > 1000){
            setErrors({...errors, memo: '1000 character max.'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, memo: null});
            }, 3000);
        }
        else{
            setErrors({
                title: null,
                memo: null,
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
                open={openAdd} 
                onClose={handleClose}
                scroll={'body'}
                >
                <DialogTitle>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            {`${editing ? 'Edit' : 'Add'} Announcement`}
                        </div>
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
                        autoFocus={false}
                        id="memo"
                        name="memo"
                        label="Memo"
                        onChange={handleInputValue}
                        value={values.memo}
                        multiline
                        rows={10}
                        helperText={errors.memo === null ? '' : errors.memo}
                        error={errors.memo? true : false}
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
};

