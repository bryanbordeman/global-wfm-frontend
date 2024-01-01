import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { Stack, IconButton, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Transition from './DialogTransistion';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddAttachments from './AddAttachments';
import TechnicianPicker from './TechnicianPicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { parseISO } from 'date-fns';
import DoorServices from '../services/Door.services';
import ReportServices from '../services/Report.services';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const STATUS_CHOICES = ['Complete',
    'Incomplete',
    'Pending',
    'Under Observation',
    'Working solution provided'
];

const SERVICE_TYPE_CHOICES = [
    "Scheduled Maintenance",
    "Emergency ",
    "Warranty",
]

export default function AddDoorServiceReportForm(props) {
    const { user, token, handleOpenSnackbar } = props;
    const { open, handleClose, editing, service, report, retrieveReports } = props;
    const { employees } = props;
    const { setIsLoading } = props;
    const [openDelete, setOpenDelete] = React.useState(false);

    const initialFormValues = {
        created_by: user.id,
        service: service ? service.id : {},
        comments: '',
        date: new Date(),
        technician: user,
        door: '',
        status: STATUS_CHOICES[0],
        service_type: SERVICE_TYPE_CHOICES[0],
        problem_reported: '',
        service_rendered: '',
        attachments: [],
        is_active: true
    };

    const editFormValues = {
        id: report.id,
        created_by: report.created_by,
        service: report.service,
        comments: report.comments,
        date: parseISO(report.date),
        technician: report.technician,
        door: report.door? report.door.id : report.door,
        status: report.status,
        service_type: report.service_type,
        problem_reported: report.problem_reported,
        service_rendered: report.service_rendered,
        attachments: report.attachments,
        is_active: true
    }

    const [values, setValues] = React.useState({});
    const [isValid, setIsValid] = React.useState(true);
    const [errors, setErrors] = React.useState({});
    const [doors, setDoors] = React.useState([]);

    React.useEffect(() => {
        if (service) {
            retrieveDoors();
        }
    }, [open])

    React.useLayoutEffect(() => {
        if (open && !editing) {
            setValues(initialFormValues);
        } else if (editing) {
            setValues(editFormValues)
        }
    }, [open]);

    const retrieveDoors = () => {
        setIsLoading(true);
        DoorServices.serviceDoor(service.id, token)
            .then(response => {
                 // Update part number for each door starting from 1
                const tempDoors = response.data
                const updatedDoors = tempDoors.map((d, index) => {
                    const partNumber = `${d.service.number}-${index + 1}-${d.id}`;
                    return { ...d, partNumber };
                });
                // Update the state with the new doors array
                setDoors(updatedDoors);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

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

        // Check if data.service is an object
        if (typeof data.service === 'object' && data.service !== null) {
            data.service = data.service.id; // Get id property if it exists
        }

        // Check if data.technician is an object
        if (typeof data.technician === 'object' && data.technician !== null) {
            data.technician = data.technician.id; // Get id property if it exists
        }

        data.attachments = data.attachments.length > 0 ? data.attachments.map((a) => a.id) : []

        if (editing) {
            ReportServices.updateDoorServiceReport(data.id, data, token)
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
        } else {
            ReportServices.createDoorServiceReport(data, token)
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
        ReportServices.deleteDoorServiceReport(values.id, token)
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

    const handleChangeTechnician = (newEmployee) => {
        setValues({
            ...values,
            technician: newEmployee
        });
    };

    const handleValidation = () => {
        let formIsValid = true;

        if (values.comments.length > 6000) {
            setErrors({ ...errors, comments: '6000 character max.' });
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({ ...errors, comments: null });
            }, 3000);
        }
        else if (values.service_rendered.length > 6000) {
            setErrors({ ...errors, service_rendered: '6000 character max.' });
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({ ...errors, service_rendered: null });
            }, 3000);
        }
        else if (values.service_rendered.length < 1) {
            setErrors({ ...errors, service_rendered: 'Required field' });
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({ ...errors, service_rendered: null });
            }, 3000);
        }
        else if (values.problem_reported.length > 6000) {
            setErrors({ ...errors, problem_reported: '6000 character max.' });
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({ ...errors, problem_reported: null });
            }, 3000);
        }
        else if (values.problem_reported.length < 1) {
            setErrors({ ...errors, problem_reported: 'Required field' });
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({ ...errors, problem_reported: null });
            }, 3000);
        }
        else if (values.technician === null) {
            setErrors({ ...errors, employee: 'Required field' });
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({ ...errors, employee: null });
            }, 3000);
        } else {
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
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            {`${editing ? 'Edit' : 'Add'} Door Service Report`}
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
                        {service ? `${service.number} ${service.name}` : ''}
                    </DialogContentText>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack direction="column" spacing={2}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Door</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.door}
                                name='door'
                                label="Door"
                                onChange={handleInputValue}
                            >
                                {doors.length === 0 ? (
                                    <MenuItem disabled value="">
                                        No doors available
                                    </MenuItem>
                                ) : (
                                    doors.map((d) => (
                                        <MenuItem key={d.id} value={d.id}>
                                            {`${d.door_type.description} ${Math.round(d.width)}" x ${Math.round(d.height)}" ${d.hand} ${d.swing} (SN: ${d.partNumber})`}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>

                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Service Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.service_type}
                                name='status'
                                label="Status after Service"
                                defaultValue={SERVICE_TYPE_CHOICES[0]}
                                onChange={handleInputValue}
                            >
                                {SERVICE_TYPE_CHOICES.map((c) => (
                                    <MenuItem key={c} value={c}>{c}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date"
                                id="date"
                                name="date"
                                value={values.date}
                                onChange={(date) => { setValues({ ...values, date: date }) }}
                                renderInput={(params) => <TextField {...params} helperText={errors.date === null ? '' : errors.date}
                                    error={errors.date ? true : false} />}
                                fullWidth
                            />
                        </LocalizationProvider>
                        <TechnicianPicker
                            editing={editing}
                            editObject={values}
                            employees={employees}
                            errors={errors}
                            user={user}
                            token={token}
                            handleChangeTechnician={handleChangeTechnician}
                        />
                    </Stack>
                    <Stack direction="column" spacing={1}>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{ marginTop: 3, marginBottom: 0 }}
                        >NATURE OF SERVICE</Typography>
                        <Divider color='primary' sx={{ borderWidth: '2px' }} />
                        <TextField
                            autoFocus={false}
                            id="problem_reported"
                            name="problem_reported"
                            label="Problem Reported"
                            onChange={handleInputValue}
                            value={values.problem_reported}
                            multiline
                            rows={10}
                            helperText={errors.problem_reported === null ? '' : errors.problem_reported}
                            error={errors.problem_reported ? true : false}
                        />
                    </Stack>
                    <Stack direction="column" spacing={2}>
                        <Stack direction="column" spacing={1}>
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                sx={{ marginTop: 3, marginBottom: 0 }}
                            >SERVICE DETAILS</Typography>
                            <Divider color='primary' sx={{ borderWidth: '2px' }} />
                            <TextField
                                autoFocus={false}
                                id="service_rendered"
                                name="service_rendered"
                                label="Service Rendered"
                                onChange={handleInputValue}
                                value={values.service_rendered}
                                multiline
                                rows={10}
                                helperText={errors.service_rendered === null ? '' : errors.service_rendered}
                                error={errors.service_rendered ? true : false}
                            />
                        </Stack>
                        <TextField
                            autoFocus={false}
                            id="comments"
                            name="comments"
                            label="Additional Notes"
                            onChange={handleInputValue}
                            value={values.comments}
                            multiline
                            rows={5}
                            helperText={errors.comments === null ? '' : errors.comments}
                            error={errors.comments ? true : false}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status after Service</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.status}
                                name='status'
                                label="Status after Service"
                                onChange={handleInputValue}
                            >
                                {STATUS_CHOICES.map((c) => (
                                    <MenuItem key={c} value={c}>{c}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Divider />
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
                <Divider />
                <DialogActions>
                    {editing && <Button variant='outlined' color='error' onClick={() => setOpenDelete(true)}>Delete</Button>}
                    <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                    <Button
                        variant='contained'
                        onClick={handleValidation}
                        color={`${isValid ? 'primary' : 'error'}`}
                    >
                        {editing ? 'Update' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
            <DeleteConfirmationModal
                deleteAction={handleDelete}
                message={editing ? {
                    title: 'Delete Report',
                    content: `Delete Report ${report.number}?`
                } : ''}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
            />
        </div>
    );
};