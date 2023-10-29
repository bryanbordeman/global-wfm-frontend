import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { Stack, IconButton } from '@mui/material';
import  Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Transition from './DialogTransistion';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddAttachments from './AddAttachments';

export default function AddProjectReportForm(props) {
    const { user, token, handleOpenSnackbar, darkState} = props;
    const { open, handleClose, editing, project } = props;
    const { setIsLoading } = props;

    const initialFormValues = {
        project: project? project : {},
        comments: '',
        date: new Date(),
        attachments: [],
        is_active: true
    };

    const editFormValues ={
        project: project? project : {},
        comments: 'testing',
        date: new Date(),
        attachments: [
        {
            id: '243',
            title: "14036 Rev C",
            document :"https://globalshielding.s3.amazonaws.com/08c47c99-e57.png",
            created_at:"2023-10-20T15:00:54.724416-04:00",
            updated_at:"2023-10-20T15:00:54.724447-04:00",
        }
        ],
        is_active: true
    }

    const [ values, setValues ] = React.useState({});
    const [ isValid, setIsValid ] = React.useState(true);
    const [ errors, setErrors ] = React.useState({});

    React.useLayoutEffect(() => {
        if(open && !editing){
            setValues(initialFormValues);
        } else if (editing) {
            setValues(editFormValues)
        }
    },[open]);
    

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value
        });
    };

    const handleSubmit = () => {
        console.log(values)
    };

    const handleValidation = () => {
        let formIsValid = true;

        if(values.comments.length > 6000){
            setErrors({...errors, comments: '6000 character max.'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, comments: null});
            }, 3000);
        }
        else if(values.comments.length < 1){
            setErrors({...errors, comments: 'Required field'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, comments: null});
            }, 3000);
        } else{ 
            setErrors({
                comments: null,
            });
            formIsValid = true;
        }
        setIsValid(formIsValid)
        setTimeout(() => {
            setIsValid(true);
        }, 3000);
    return formIsValid ? handleSubmit() : null
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
                        <div>
                            {`${editing ? 'Edit' : 'Add'} Project Report`}
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
                    <DialogContentText>
                        {project? `${project.number} ${project.name}` : ''}
                    </DialogContentText>
                </DialogTitle>
                <Divider/>
                <DialogContent>
                <Stack direction="column" spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date"
                            id="date"
                            name="date"
                            value={values.date}
                            onChange={(date) => {setValues({...values, date: date})}}
                            renderInput={(params) => <TextField {...params} helperText={errors.date === null ? '' : errors.date}
                            error={errors.date? true : false} />}
                            fullWidth
                        />
                    </LocalizationProvider>
                    <TextField
                        autoFocus={false}
                        id="comments"
                        name="comments"
                        label="Comments"
                        onChange={handleInputValue}
                        value={values.comments}
                        multiline
                        rows={15}
                        helperText={errors.comments === null ? '' : errors.comments}
                        error={errors.comments? true : false}
                    />
                    <Divider/>
                    <AddAttachments
                        setIsLoading={setIsLoading}
                        token={token}
                        handleOpenSnackbar={handleOpenSnackbar}
                        values={values}
                        setValues={setValues}
                        editing={editing}
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