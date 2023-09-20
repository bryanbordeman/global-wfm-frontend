import React from 'react';
import UploaderServices from '../services/Uploader.services'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, TextField, Divider, IconButton, Typography} from '@mui/material';
import AssigneePicker from './AssigneePicker';
import ProjectPicker from '../components/ProjectPicker';
import QuotePicker from '../components/QuotePicker';
import ServicePicker from '../components/ServicePicker';
import HSEPicker from '../components/HSEPicker';
import ProjectTypeDropdown from '../components/ProjectTypeDropdown';
import TaskListPicker from './TaskListPicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment-timezone';
import Transition from './DialogTransistion';
import ImageUploading from 'react-images-uploading';
import ImageDialog from './ImageDialog';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {  CardActionArea, CardActions } from '@mui/material';

export default function AddTaskForm(props) {
    const { user, token } = props;
    const { handleOpenSnackbar } = props;
    const { employees } = props;
    const { open, setOpen } = props;
    const { editing, task, setEditing } = props;
    const { createTask } = props;
    const { updateTask } = props;
    const { setIsLoading } = props;
    const [ isValid, setIsValid ] = React.useState(true);
    const [ errors, setErrors ] = React.useState({});

    const [ images, setImages ] = React.useState([]);
    const [ image, setImage ] = React.useState(null);
    const [ imageIndex, setImageIndex ] = React.useState(null);
    const [ openImageDialog, setOpenImageDialog] = React.useState(false);

    const [ menuOptions, setMenuOptions ] = React.useState(['Projects', 'Services', "HSE's"]);
    const [ menuSelection, setMenuSelection ] = React.useState(0);
    const didMount = React.useRef(false);

    React.useEffect(() => {
        if(user.groups.filter(group => (group.name === 'SALES')).length > 0){
            setMenuOptions(['Projects', 'Services', "HSE's", 'Quotes']);
        }
    },[]);


    React.useEffect(() => {
        // if picker changes clear project value
        if(!editing)
            setValues({
                ...values,
                hse: '',
                project: '',
                service: '',
                quote: ''
            });
    },[menuSelection]);

    const initialFormValues = {
        created_by: user.id,
        assignee:'',
        tasklist: '',
        title:'',
        notes:'',
        due: new Date(),
        subtasks:[],
        project:'',
        service: '',
        hse: '',
        quote:'',
        created: new Date(),
        is_complete: false,
        is_deleted: false,
        is_read: false,
        completed: new Date(),
        updated: new Date(),
        attachments: []
    };

    const editFormValues = {
        created_by: task.created_by,
        assignee: task.assignee,
        tasklist: task.tasklist,
        title: task.title,
        notes: task.notes,
        due: editing && task.due !== undefined? new Date(task.due.replace('-', '/').replace('-', '/')) : new Date(),
        subtasks:task.subtasks,
        quote: editing && task.quote != null ? task.quote.id : task.quote,
        project: editing && task.project != null ? task.project.id : task.project,
        service: editing && task.service != null? task.service.id : task.service,
        hse: editing && task.hse != null ? task.hse.id : task.hse,
        created: new Date(),
        is_complete: task.is_complete,
        is_deleted: false,
        is_read: false,
        completed: new Date(),
        updated: new Date(),
        attachments: task.attachments
    };

    const [ values, setValues ] = React.useState(initialFormValues);

    React.useLayoutEffect(() => {
        // if (didMount.current) {
            if(editing){
                if(task.service !== null){
                    setMenuSelection(1)
                }
                if(task.hse !== null){
                    setMenuSelection(2)
                }
                if(task.quote !== null){
                    setMenuSelection(3)
                }
                if(task.project !== null){
                    setMenuSelection(0)
                }
            }
        // } else {
        //     didMount.current = true;
        // }
    },[props]);

    React.useLayoutEffect(() => {
        // if (didMount.current) {
            if(editing){
                setValues(editFormValues)
                if (task && task.attachments) {
                    const newImages = task.attachments.map((i) => i.document);
                    setImages((prevImages) => {
                        if (Array.isArray(prevImages)) {
                            return [...prevImages, ...newImages];
                        } else {
                            return [...newImages];
                        }
                    });
                };
            }
        // } else {
        //     didMount.current = true;
        // }
    },[open]);

    const onChange = (imageList, addUpdateIndex) => {
        // Create a copy of the current images state for comparison
        const prevImages = [...images];
    
        // Initialize arrays to store added, deleted, and edited images
        let addedImage = '';
        let editedImage = '';
        const deletedImages = [];        

        if (prevImages.length < imageList.length){
            //* this works
            addedImage = imageList[addUpdateIndex]
        } else {
            //* this works
            editedImage = imageList[addUpdateIndex]
        }
        if (addUpdateIndex === undefined) {
            //* this works
            prevImages.forEach((prevImage) => {
                if (!imageList.includes(prevImage)) {
                    deletedImages.push(prevImage);
                }
            });
        }
        if (addedImage) {
            console.log("Images added:", addedImage);
            createDropbox(addedImage);
        }
    
        if (deletedImages.length > 0 || addUpdateIndex === undefined) {
            const isAll = deletedImages.length > 1;
            console.log(isAll)
            deletedImages.map((img) => {
                values.attachments.map((attachment) => {
                    if(attachment.document === img) {
                        deleteDropbox(attachment.id, isAll);
                    }})
            })
            if (isAll) {
                const updatedValues = {
                    ...values,
                    attachments: []
                };
                setValues(updatedValues);
            }
        }
        if (editedImage) {
            let oldImage = prevImages[addUpdateIndex]
            values.attachments.map((attachment) => {
                if(attachment.document === oldImage) {
                    oldImage = attachment;
                }})
            updateDropbox(oldImage, editedImage)
        }
        // Update the images state
        setImages(imageList);
    };
    
    const removeFileExtension = (fileName) => {
        // Split the fileName by the dot (.) character
        const parts = fileName.split('.');
        // Check if there is more than one part (i.e., there is an extension)
        if (parts.length > 1) {
          // Remove the last part (the extension) and join the rest
            parts.pop();
            return parts.join('.');
        } else {
          // No extension found, return the original fileName
            return fileName;
        }
    };

    const createDropbox = (data) => {
        setIsLoading(true);
        const cleanData = {title: '', document: ''}

        //* this is title var
        cleanData.title = removeFileExtension(data.file.name)

        //*this is document
        cleanData.document = data.data_url
        
        UploaderServices.createDropbox(cleanData, token)
            .then(response => {
                const newImage = response.data
                const updatedValues = {
                    ...values,
                    attachments: [newImage, ...values.attachments]
                };
                setValues(updatedValues);
                handleOpenSnackbar('success', 'Attachment added to the database');
            })
            .catch(e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something went wrong. Please try again.');
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const deleteDropbox = (id, isAll) => {
        setIsLoading(true);    
        UploaderServices.deleteDropbox(id, token)
            .then(response => {
                if (isAll) {
                    const updatedValues = {
                        ...values,
                        attachments: []
                    };
                    setValues(updatedValues);
                } else {
                    // Filter out the attachment with the specified id
                    const updatedAttachments = values.attachments.filter(attachment => attachment.id !== id);
            
                    const updatedValues = {
                        ...values,
                        attachments: updatedAttachments,
                    };
                    
                    setValues(updatedValues);
                };
                handleOpenSnackbar('warning', 'Attachment deleted from the database');
            })
            .catch(e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something went wrong. Please try again.');
            })
            .finally(() => {
                setIsLoading(false);
            });
        };
        

    const updateDropbox = (oldImage, newImage) => {
        setIsLoading(true);
        const cleanData = {title: '', document: ''}

        //* this is title var
        cleanData.title = removeFileExtension(newImage.file.name)

        //*this is document
        cleanData.document = newImage.data_url

        UploaderServices.updateDropbox(oldImage.id, cleanData, token)
            .then(response => {
                const updatedImage = response.data;
                // Update the attachments array with the updated image
                const updatedAttachments = values.attachments.map((attachment) => {
                    if (attachment.id === oldImage.id) {
                    return updatedImage;
                    } else {
                    return attachment;
                    }
                });

                const updatedValues = {
                    ...values,
                    attachments: updatedAttachments,
                };

                setValues(updatedValues);
                handleOpenSnackbar('success', 'Attachment updated in the database');
            })
            .catch(e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something went wrong. Please try again.');
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    
    const handleOpenImageDialog = (image, index) => {
        setImage(image);
        setImageIndex(index + 1);
        setOpenImageDialog(true);
    };

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value
        });
    };

    const handleChangeProject = (newValue) => {
        switch(menuSelection) {
            case 1:
                //Service
                if(newValue){
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
                if(newValue){
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
                if(newValue){
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
                if(newValue){
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

    const handleChangeAssignee = (newValue) => {
        if(newValue){
            setValues({
            ...values,
            assignee: newValue.id
            });
        }
    };

    const handleChangeList = (newValue) => {
        if(newValue){
            setValues({
            ...values,
            tasklist: newValue.id
            });
        }
    };

    const handleValidation = () => {
        let formIsValid = true;

        if(values.project === '' && values.service === '' && values.hse === '' && values.quote === ''){
            setErrors({...errors, project: 'Required field'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, project: null});
            }, 3000);
        }
        
        else if(values.tasklist === ''){
            setErrors({...errors, tasklist: 'Required field'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, tasklist: null});
            }, 3000);
        }
        else if(values.assignee === ''){
            setErrors({...errors, assignee: 'Required field'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, assignee: null});
            }, 3000);
        }

        else if(values.title.length > 100){
            setErrors({...errors, title: '100 character max.'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, title: null});
            }, 3000);
        }
        else if(values.title.length < 1){
            setErrors({...errors, title: 'Required field'});
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
                project: null,
                assignee: null,
                quote: null,
                title: null,
                notes: null,
            });
            formIsValid = true;
        }
        setIsValid(formIsValid)
        setTimeout(() => {
            setIsValid(true);
        }, 3000);
    return formIsValid ? handleSubmit() : null
    };

    const handleClose = () => {
        setOpen(!open);
        setEditing(false);
        setValues(initialFormValues);
        setImages([])
    };

    const handleSubmit = () => {
        if(editing){
            const data = values
            data.created_by = values.created_by.id;
            data.due = moment.tz(data.due, "America/New_York")._d;
            data.assignee = values.assignee.id === undefined? values.assignee : values.assignee.id;
            data.tasklist = values.tasklist.id === undefined? values.tasklist : values.tasklist.id;
            data.subtasks = values.subtasks.map(subT => (subT.id));
            data.updated= moment.tz(data.updated, "America/New_York")._d.toISOString();
            const tempAttachments = []
            if (values.attachments.length > 0) {
                values.attachments.forEach((a) => {
                    if (a.id) {
                        tempAttachments.push(a.id);
                    }
                });
            data.attachments = tempAttachments
            }
            updateTask(task.id, data);
            setValues(initialFormValues);
        }else{
            const data = values
            const tempAttachments = []
            if (values.attachments.length > 0) {
                values.attachments.forEach((a) => {
                    if (a.id) {
                        tempAttachments.push(a.id);
                    }
                });
            data.attachments = tempAttachments
            }
            createTask(data);
            setValues(initialFormValues);
        }
        handleClose();
        
    };

    let picker = <div></div>

    switch(menuSelection) {
        case 1:
            picker = 
                <ServicePicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={task}
                    errors={errors}
                    editProject={values.project}
                />
        break;
        case 2:
            picker = 
                <HSEPicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={task}
                    errors={errors}
                    editProject={values.project}
                />
        break;
        case 3:
            picker = 
                <QuotePicker
                    token={token}
                    handleChangeQuote={handleChangeProject}
                    errors={errors}
                    editing={editing}
                    editObject={task}
                    // editProject={values.project}
                />
        break;
        default:
            picker = 
                <ProjectPicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={task}
                    errors={errors}
                    editProject={values.project}
                />  
    };

    const assignee = values.assignee ? typeof values.assignee == 'number'? values.assignee : values.assignee.id : ''

    return (
        <div>
            <Dialog
                TransitionComponent={Transition}
                fullWidth
                fullScreen
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            {`${editing ? 'Edit' : 'Add'} Task`}
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
                        <TaskListPicker
                            editing={editing}
                            task={task}
                            errors={errors}
                            token={token}
                            handleOpenSnackbar={handleOpenSnackbar}
                            handleChangeList={handleChangeList}
                        />
                        <AssigneePicker
                            employees={employees}
                            editing={editing}
                            task={task}
                            errors={errors}
                            user={user}
                            token={token}
                            handleChangeAssignee={handleChangeAssignee}
                            handleOpenSnackbar={handleOpenSnackbar}
                        />
                        <Stack direction="row" spacing={1}>
                            {picker}
                            <ProjectTypeDropdown
                                user={user}
                                menuOptions={menuOptions}
                                menuSelection={menuSelection}
                                setMenuSelection={setMenuSelection}
                            />
                        </Stack>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Due Date"
                                id="due"
                                name="due"
                                value={values.due}
                                onChange={(date) => {setValues({...values, due: date})}}
                                renderInput={(params) => <TextField {...params} helperText={errors.due === null ? '' : errors.due}
                                error={errors.due? true : false} />}
                                fullWidth
                            />
                        </LocalizationProvider>
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
                            label="Task"
                            onChange={handleInputValue}
                            value={values.notes}
                            multiline
                            rows={4}
                            helperText={errors.notes === null ? '' : errors.notes}
                            error={errors.notes? true : false}
                        />
                        <Divider/>
                        <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            dataURLKey="data_url"
                        >
                            {({
                            imageList,
                            onImageRemoveAll,
                            onImageUpload,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                            }) => (
                            // write your building UI
                            <div>
                                <Stack 
                                    // direction="row" 
                                    spacing={2}
                                >   
                                    <Button 
                                        fullWidth
                                        variant="contained" 
                                        disableElevation
                                        style={isDragging ? { color: 'red' } : undefined}
                                        color='primary'
                                        onClick={onImageUpload}
                                        {...dragProps}
                                        startIcon={<PhotoCamera />}
                                        >
                                    Attach Images
                                    </Button>
                                    <Button 
                                        fullWidth
                                        variant="outlined" 
                                        color='error'
                                        onClick={() => {
                                            onImageRemoveAll();
                                        }}
                                        startIcon={<DeleteIcon />}
                                    >Remove all images
                                    </Button>
                                </Stack>
                                {imageList.map((image, index) => (
                                    <Card key={index} sx={{ marginTop: '20px', width: 143 }}>
                                        <CardActionArea 
                                            onClick={() => handleOpenImageDialog (image['data_url']? image['data_url'] : image, index)}
                                        >
                                            <CardMedia
                                            component="img"
                                            image={image['data_url']? image['data_url'] : image}
                                            alt=""
                                            name='preview_image'
                                            />
                                        </CardActionArea>
                                        <CardActions>
                                        <Stack direction="row" spacing={2}> 
                                                <IconButton 
                                                    variant='outlined'
                                                    color='primary' 
                                                    aria-label="delete"
                                                    onClick={() => onImageUpdate(index)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <Divider orientation="vertical" variant="middle" flexItem />
                                                <IconButton 
                                                    color='error' 
                                                    aria-label="delete"
                                                    onClick={() => {
                                                        onImageRemove(index);
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                        </CardActions>
                                        </Card>
                                    ))}
                            </div>
                            )}
                        </ImageUploading>

                        {editing && user.id === assignee?
                        <FormControlLabel
                            onChange={() => {setValues({...values, is_complete: !values.is_complete})}}
                            control={<Switch checked={values.is_complete} color="primary" />}
                            id="is_complete"
                            name="is_complete"
                            label="Complete"
                            value={values.is_complete}
                        /> 
                        : ''}
                    </Stack>
                </DialogContent>
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
                    {editing ? 'Update' : 'Submit'}
                </Button>
                </DialogActions>
            </Dialog>
            <ImageDialog
                image={image}
                id={imageIndex}
                open={openImageDialog}
                setOpen={setOpenImageDialog}
            />
        </div>
    );
};