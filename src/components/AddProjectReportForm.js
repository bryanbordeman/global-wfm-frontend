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
import ReportServices from '../services/Report.services';
import { parseISO } from 'date-fns';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export default function AddProjectReportForm(props) {
    const { user, token, handleOpenSnackbar} = props;
    const { open, handleClose, editing, project, retrieveReports, report } = props;
    const { setIsLoading } = props;
    const [ openDelete, setOpenDelete ] = React.useState(false);

    const initialFormValues = {
        created_by: user.id,
        project: project? project : {},
        comments: '',
        date: new Date(),
        attachments: [],
        is_active: true
    };

    const editFormValues ={
        id: report.id,
        created_by: report.created_by,
        project: report.project,
        comments: report.comments,
        date: parseISO(report.date),
        attachments: report.attachments,
        is_active: report.is_active
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
        // sanitize data
        const data = values
        if (typeof data.created_by === 'object' && data.created_by !== null) {
            data.created_by = data.created_by.id; // Get id property if it exists
        }
        
        // Check if data.project is an object
        if (typeof data.project === 'object' && data.project !== null) {
            data.project = data.project.id; // Get id property if it exists
        }
        data.attachments = data.attachments.length > 0 ? data.attachments.map((a) => a.id) : []
        setIsLoading(true);

        if(editing){
            ReportServices.updateProjectReport(data.id, data, token)
            .then(response => {
                retrieveReports();
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
                handleClose();
            });
        }else{
            // console.log(data)
            ReportServices.createProjectReport(data, token)
                .then(response => {
                    retrieveReports();
                })
                .catch(e => {
                    console.log(e);
                })
                .finally(() => {
                    setIsLoading(false);
                    handleClose();
                });
        }
    };

    const handleDelete = () => {
        // console.log(values)
        ReportServices.deleteProjectReport(values.id, token)
            .then(response => {
                retrieveReports();
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
                handleClose();
            });
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
                {editing && <Button variant='outlined' color='error' onClick={() => setOpenDelete(true)}>Delete</Button>}
                <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                <Button 
                    variant='contained' 
                    onClick={handleValidation}
                    color={`${isValid? 'primary' : 'error'}`}
                >
                    {editing ? 'Update' : 'Submit'}
                </Button>
                </DialogActions>
            </Dialog>
            <DeleteConfirmationModal
                deleteAction={handleDelete}
                message={editing? {
                    title: 'Delete Report',
                    content: `Delete Report ${report.number}?`
                } : ''}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
            />
        </div>
    );
};