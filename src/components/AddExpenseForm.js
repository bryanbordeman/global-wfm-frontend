import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, TextField, FormControlLabel, Switch, Divider } from '@mui/material';
import EmployeePicker from './EmployeePicker';
import ProjectPicker from './ProjectPicker'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ImageUploading from 'react-images-uploading';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function AddExpenseForm(props) {
    const { user, token } = props
    const { open, setOpen } = props
    const { editing, expense } = props
    const { employee, handleChangeEmployee } = props
    const { createExpense, updateExpense } = props
    const [ images, setImages ] = React.useState([]);
    const [ editImage, setEditImage ] = React.useState({})
    

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const onChange = (imageList) => {
        setImages(imageList);
        if(imageList.length > 0){ 
            setValues({
                ...values,
                receipt_pic: imageList[0].data_url
                });}
    };
    
    const initialFormValues = {
        project: '',
        receipt_pic: new FileReader(),
        merchant: '',
        price: '',
        is_reimbursable: false,
        is_approved: false,
        date_purchased: new Date(),
        notes: ''
    }


    const editFormValues = {
        project: editing ? expense.project.id : expense.project,
        receipt_pic: editImage,
        // receipt_pic: getBase64Image(expense.receipt_pic),
        merchant: expense.merchant,
        price: expense.price,
        is_reimbursable: expense.is_reimbursable,
        is_approved: expense.is_approved,
        date_purchased: editing ? new Date(expense.date_purchased.replace('-', '/').replace('-', '/')) : new Date(),
        notes: expense.notes
    }


    const [ values, setValues ] = React.useState(initialFormValues);
    const [ errors, setErrors ] = React.useState({
        project: null,
        receipt_pic: null,
        merchant: null,
        price: null,
        date_purchased: null,
        employee: null
    })
    
    React.useEffect(() => {
        setValues(editing ? editFormValues : initialFormValues)
    },[open]);

    React.useEffect(() => {
        if(editing === true){
        const url = expense.receipt_pic;
        const fileName = 'myFile.jpg';
        let editImage = []

        fetch(url)
        .then(async response => {
            const contentType = response.headers.get('content-type')
            const blob = await response.blob()
            const file = new File([blob], fileName, { contentType })
            setEditImage(file)
            getBase64(file)
                .then(
                    data => {
                    editImage = [{data_url: data, file: file}]
                    setImages(editImage)
                    setValues({
                        project: editing ? expense.project.id : expense.project,
                        receipt_pic: editImage[0].data_url,
                        merchant: expense.merchant,
                        price: expense.price,
                        is_reimbursable: expense.is_reimbursable,
                        is_approved: expense.is_approved,
                        date_purchased: editing ? new Date(expense.date_purchased.replace('-', '/').replace('-', '/')) : new Date(),
                        notes: expense.notes
                        })

                    })
        })} else {
            setImages([])
        }
    },[open])

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value
        });
    };

    const handleChangeProject = (newValue) => {
        if(newValue){
            setValues({
            ...values,
            project: newValue.id
            });
        }
    }

    const handleSubmit = () => {
        const data = {
            project: values.project, 
            receipt_pic: values.receipt_pic,
            merchant: values.merchant,
            price: values.price,
            is_reimbursable: values.is_reimbursable,
            is_approved: false,
            date_purchased: String(values.date_purchased)? values.date_purchased : values.date_purchased.toISOString().split('T')[0],
            notes: ''
        };

        if(editing){
            updateExpense(expense.id, data);
            setOpen(false);
            setImages([])

        }
        else {
            createExpense(data);
            setOpen(false);
            setImages([])
        };

    };

    const handleValidation = () => {
        let formIsValid = true;
        return formIsValid ? handleSubmit() : null
    }

    const handleClose = () => {
        setOpen(false);
        setImages([])
    };

    return (
        <div>
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{`${editing ? 'Edit' : 'Add'} Expense`}</DialogTitle>
            <Divider/>
            <DialogContent>
                <Stack direction="column" spacing={2}>
                {user.is_staff ?
                <div>
                {editing ?
                    <TextField
                        autoFocus={false}
                        margin="dense"
                        disabled
                        id="employee"
                        name='employee'
                        label="Employee"
                        value={`${expense.user.first_name} ${expense.user.last_name}`}
                        type="text"
                        fullWidth
                        variant="outlined"
                    /> 
                    :
                <EmployeePicker
                    employee={employee}
                    errors={errors}
                    user={user}
                    token={token}
                    handleChangeEmployee={handleChangeEmployee}
                />
                }
                </div> : ''}     
                {editing ?
                <TextField
                    autoFocus={false}
                    margin="dense"
                    disabled
                    id="project"
                    name='project'
                    label="Project"
                    value={expense.project.number}
                    type="text"
                    fullWidth
                    variant="outlined"
                /> 
                :
                <ProjectPicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    errors={errors}
                    editProject={values.project}
                />
                }
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Date Purchased"
                        id="date_purchased"
                        name="date_purchased"
                        value={values.date}
                        onChange={(date) => {setValues({...values, date_purchased: date})}}
                        renderInput={(params) => <TextField {...params} helperText={errors.date_purchased === null ? '' : errors.date_purchased}
                        error={errors.date_purchased? true : false} />}
                        fullWidth
                    />
                </LocalizationProvider>
                    <ImageUploading
                        value={images}
                        onChange={onChange}
                        dataURLKey="data_url"
                    >
                        {({
                        imageList,
                        onImageUpload,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                        }) => (
                        // write your building UI
                        <div>
                            <Stack direction="row" spacing={2}>   
                                <Button 
                                    variant="contained" 
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    startIcon={<PhotoCamera />}
                                    >
                                Receipt
                                </Button>
                            </Stack>
                            {imageList.map((image, index) => (
                            <div style={{marginTop: '0.5rem'}} key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                <Stack direction="row" spacing={2}> 
                                <IconButton 
                                    color='primary' 
                                    aria-label="delete"
                                    onClick={() => onImageUpdate(index)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton 
                                    color='error' 
                                    aria-label="delete"
                                    onClick={() => onImageRemove(index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                </Stack>
                                </div>
                            </div>
                            ))}
                            </div>
                        )}
                    </ImageUploading>
                <TextField
                    autoFocus={false}
                    margin="dense"
                    id="merchant"
                    name='merchant'
                    label="Merchant"
                    onChange={handleInputValue}
                    value={values.merchant}
                    type="text"
                    fullWidth
                    variant="outlined"
                    helperText={errors.merchant === null ? '' : errors.merchant}
                    error={errors.merchant? true : false}
                />
                <TextField
                    autoFocus={false}
                    onFocus={event => {
                        event.target.select();
                    }}
                    margin="dense"
                    id="price"
                    name="price"
                    onChange={handleInputValue}
                    value={values.price}
                    label="Price"
                    type="number"
                    fullWidth
                    variant="outlined"
                    helperText={errors.price === null ? '' : errors.price}
                    error={errors.price? true : false}
                />
                <FormControlLabel
                    onChange={() => {setValues({...values, is_reimbursable: !values.is_reimbursable})}}
                    control={<Switch checked={values.is_reimbursable} color="primary" />}
                    id="is_reimbursable"
                    name="is_reimbursable"
                    label="Reimbursable"
                    value={values.is_reimbursable}
                />
                <TextField
                    autoFocus={false}
                    id="notes"
                    name="notes"
                    label="Notes"
                    onChange={handleInputValue}
                    value={values.notes}
                    multiline
                    rows={4}
                />
                </Stack>
            </DialogContent>
            <DialogActions>
            <Button variant='outlined' onClick={handleClose}>Cancel</Button>
            <Button variant='contained' onClick={handleValidation}>{editing ? 'Update' : 'Submit'}</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}


// const sampleImage = {
// data_url:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wgARCAR+Ao4DASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAUGAwQHAgEI/8QAGQEBAQADAQAAAAAAAAAAAAAAAAEDBAUC/9oADAMBAAIQAxAAAAGT03JuV0utOSfdnB1pyQdbclHWnJR1pyT6daclHWnJfh1tyUdaclHWnJfh1tyUdaclHWnJB1tyQdbckHW3JB1tyT6daclHWnJR1pyUdaclHWnJR1pyUdackHW3JB1tyQdbckHW3JB1tyQdbckHW..."
// ,
// file:
// {arrayBuffer: ƒ arrayBuffer() {}, lastModified: 165…},
// name:"Sample.jpeg",
// lastModified:1655646665789
// lastModifiedDate: 'Sun Jun 19 2022 09:51:05 GMT-0400 (Eastern Daylight Time)',
// webkitRelativePath: "",
// size: 120435
// type : "image/jpeg",
// arrayBuffer: ƒ arrayBuffer() {},
// slice: ƒ slice() {},
// stream: ƒ stream() {},
// text:ƒ text() {},
// }