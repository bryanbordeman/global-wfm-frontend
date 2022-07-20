import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, IconButton} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import moment from 'moment';

export default function AddSubtaskForm(props) {
    const { 
            editing, 
            setEditing,
            createSubtask, 
            updateSubtask,
            deleteSubtask,
            subtask,
            setSubtask,
            setOpenSubtaskForm,
            open,
            } = props

    const initialFormValues = {
        title: '', 
        notes: '',
        is_complete: false
    }

    const editFormValues = {
        title: subtask.title,
        notes: subtask.notes,
        is_complete: subtask.is_complete
    }

    const [ values, setValues ] = React.useState(initialFormValues);
    const [ errors, setErrors ] = React.useState({
        title: null,
        notes: null,
    })

    React.useEffect(() => {
        setValues(editing ? editFormValues : initialFormValues)
    },[open]);


    const handleSubmit = () => {
        const data = {
            title: values.title, 
            notes: values.notes, 
            is_complete: values.is_complete,
        };

        if(editing){
            updateSubtask(subtask.id, data);
            setOpenSubtaskForm(false);

        }
        else {
            createSubtask(data);
            setOpenSubtaskForm(false);
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
        else if(values.notes.length > 1000){
            setErrors({...errors, notes: '1000 character max.'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, notes: null});
            }, 3000);
        }
        else{
            setErrors({
                title: null,
                notes: null,
            });
            formIsValid = true;
        }
    return formIsValid ? handleSubmit() : null
    };

    const handleClose = () => {
        setOpenSubtaskForm(false);
        setSubtask({});
        setEditing(false);
    }

    const handleDelete = () => {
        deleteSubtask(subtask.id)
        handleClose();
    }

    return (
        <div>
        <Dialog 
            fullWidth 
            open={open} 
            onClose={handleClose}
            scroll={'body'}
            
            >
            <DialogTitle  sx={editing? {mb:0, pb:0} : {}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    {`${editing ? 'Edit' : 'Add'} Subtask`}
                </div>
                {editing? 
                <div>
                <IconButton 
                    edge="end" 
                    color="error"
                    aria-label="delete"
                    onClick={ () => {
                        handleDelete()}}
                        >
                    <DeleteOutlineIcon />
                </IconButton>
                </div>
                : ''}
                </div>
            </DialogTitle>
            {editing? 
            <DialogContent sx={{ typography: 'caption', mb:0, pb: 1}}>
                {`Last Updated | ${moment(subtask.updated).format("ddd, MMMM Do YYYY")}`}
            </DialogContent> 
            : ''}
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
                    id="notes"
                    name="notes"
                    label="notes"
                    onChange={handleInputValue}
                    value={values.notes}
                    multiline
                    rows={10}
                    helperText={errors.notes === null ? '' : errors.notes}
                    error={errors.notes? true : false}
                />
                {editing ?
                <FormControlLabel
                    onChange={() => {setValues({...values, is_complete: !values.is_complete})}}
                    control={<Switch checked={values.is_complete} color="primary" />}
                    id="is_complete"
                    name="is_complete"
                    label="Complete"
                    value={values.is_complete}
                /> 
                : ''}
                {subtask.is_complete?
                <DialogContent sx={{ typography: 'caption', mb:0, pb: 0, mt:0, pt:0}}>
                    Completed <br/>{moment(subtask.completed).calendar()}
                </DialogContent> : ''}
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
