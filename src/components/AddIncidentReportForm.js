import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { Stack, IconButton } from '@mui/material';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Transition from './DialogTransistion';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddAttachments from './AddAttachments';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ProjectPicker from './ProjectPicker';
import QuotePicker from './QuotePicker';
import ServicePicker from './ServicePicker';
import HSEPicker from './HSEPicker';
import ProjectTypeDropdown from './ProjectTypeDropdown';
import ReportServices from '../services/Report.services';
import { parseISO } from 'date-fns';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const CHOICES = ['Shop',
    'Field',
    'Office',
];

export default function AddIncidentReportForm(props) {
    const { user, token, handleOpenSnackbar } = props;
    const { open, handleClose, editing, project, retrieveReports, report } = props;
    const { setIsLoading } = props;
    const [ openDelete, setOpenDelete ] = React.useState(false);

    const initialFormValues = {
        created_by: user.id,
        project: project ? project : {},
        comments: '',
        category: CHOICES[0],
        location: '',
        participants: '',
        witnesses: '',
        date: new Date(),
        attachments: [],
        is_active: true
    };

    const editFormValues = {
        id: report.id,
        created_by: report.created_by,
        project: report.project,
        service: report.service,
        hse: report.hse,
        comments: report.comments,
        date: parseISO(report.date),
        category: report.category,
        location: report.location,
        participants: report.participants,
        witnesses: report.witnesses,
        attachments: report.attachments,
        is_active: true
    }

    const [menuOptions, setMenuOptions] = React.useState(['Projects', 'Services', "HSE's"]);
    const [menuSelection, setMenuSelection] = React.useState(0);

    const [values, setValues] = React.useState({});
    const [isValid, setIsValid] = React.useState(true);
    const [errors, setErrors] = React.useState({});

    React.useLayoutEffect(() => {
        if (open && !editing) {
            setValues(initialFormValues);
            setMenuSelection(0)
        } else if (editing) {
            setValues(editFormValues)
        }
    }, [open]);

    React.useEffect(() => {
        if (user.groups.filter(group => (group.name === 'SALES')).length > 0) {
            setMenuOptions(['Projects', 'Services', "HSE's", 'Quotes']);
        }
    }, []);

    React.useEffect(() => {
        if (editing) {
            if (report.service !== null) {
                setMenuSelection(1)
            }
            if (report.hse !== null) {
                setMenuSelection(2)
            }
            if (report.quote !== null) {
                setMenuSelection(3)
            }
            if (report.project !== null) {
                setMenuSelection(0)
            }
        }
    }, [props]);

    React.useEffect(() => {
        // if picker changes clear project value
        if (!editing)
            setValues({
                ...values,
                hse: '',
                project: '',
                service: '',
                quote: ''
            });
    }, [menuSelection]);


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

        // Check if data.service is an object
        if (typeof data.service === 'object' && data.service !== null) {
            data.service = data.service.id; // Get id property if it exists
        }

        // Check if data.project is an object
        if (typeof data.hse === 'object' && data.hse !== null) {
            data.hse = data.hse.id; // Get id property if it exists
        }

        data.attachments = data.attachments.length > 0 ? data.attachments.map((a) => a.id) : []
        setIsLoading(true);

        if (editing) {
            ReportServices.updateIncidentReport(data.id, data, token)
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
            ReportServices.createIncidentReport(data, token)
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
        ReportServices.deleteIncidentReport(values.id, token)
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

        if (values.comments.length > 6000) {
            setErrors({ ...errors, comments: '6000 character max.' });
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({ ...errors, comments: null });
            }, 3000);
        }
        else if (values.comments.length < 1) {
            setErrors({ ...errors, comments: 'Required field' });
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({ ...errors, comments: null });
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

    const handleChangeProject = (newValue) => {
        switch (menuSelection) {
            case 1:
                //Service
                if (newValue) {
                    setValues({
                        ...values,
                        service: newValue.id,
                        project: null,
                        hse: null,
                        quote: null
                    });
                };
                break;
            case 2:
                //HSE
                if (newValue) {
                    setValues({
                        ...values,
                        hse: newValue.id,
                        project: null,
                        service: null,
                        quote: null
                    });
                };
                break;
            case 3:
                //Quote
                if (newValue) {
                    setValues({
                        ...values,
                        quote: newValue.id,
                        project: null,
                        hse: null,
                        service: null
                    });
                };
                break;
            default:
                //Project 
                if (newValue) {
                    setValues({
                        ...values,
                        project: newValue.id,
                        service: null,
                        hse: null,
                        quote: null
                    });
                };
        };
    };

    let picker = <div></div>

    switch (menuSelection) {
        case 1:
            picker =
                <ServicePicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={values}
                    errors={errors}
                // editProject={values.service}
                />
            break;
        case 2:
            picker =
                <HSEPicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={values}
                    errors={errors}
                // editProject={values.hse}
                />
            break;
        case 3:
            picker =
                <QuotePicker
                    token={token}
                    handleChangeQuote={handleChangeProject}
                    errors={errors}
                    editing={editing}
                    editObject={values}
                // editProject={values.project}
                />
            break;
        default:
            picker =
                <ProjectPicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={values}
                    errors={errors}
                // editProject={values.project}
                />
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
                            {`${editing ? 'Edit' : 'Add'} Incident Report`}
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
                        {project ? `${project.number} ${project.name}` : ''}
                    </DialogContentText>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack direction="column" spacing={2}>
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
                        <Stack direction="row" spacing={1}>
                            {picker}
                            <ProjectTypeDropdown
                                user={user}
                                menuOptions={menuOptions}
                                menuSelection={menuSelection}
                                setMenuSelection={setMenuSelection}
                            />
                        </Stack>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.category}
                                name='category'
                                label="Category"
                                onChange={handleInputValue}
                            >
                                {CHOICES.map((c) => (
                                    <MenuItem key={c} value={c}>{c}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            autoFocus={false}
                            id="location"
                            name="location"
                            label="Address of Incident"
                            onChange={handleInputValue}
                            value={values.location}
                            multiline
                            rows={3}
                            helperText={errors.location === null ? '' : errors.location}
                            error={errors.location ? true : false}
                        />
                        <TextField
                            autoFocus={false}
                            id="participants"
                            name="participants"
                            label="Participants involved"
                            onChange={handleInputValue}
                            value={values.participants}
                            multiline
                            rows={3}
                            helperText={errors.participants === null ? '' : errors.participants}
                            error={errors.participants ? true : false}
                        />

                        <TextField
                            autoFocus={false}
                            id="witnesses"
                            name='witnesses'
                            label="Witnesses"
                            onChange={handleInputValue}
                            value={values.witnesses}
                            type="text"
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={3}
                        />
                        <TextField
                            autoFocus={false}
                            id="comments"
                            name="comments"
                            label="Description of Incident "
                            onChange={handleInputValue}
                            value={values.comments}
                            multiline
                            rows={15}
                            helperText={errors.comments === null ? '' : errors.comments}
                            error={errors.comments ? true : false}
                        />
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
                    {editing && <Button variant='outlined' color='error' onClick={() => setOpenDelete(true)} >Delete</Button>}
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