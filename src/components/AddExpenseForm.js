import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, TextField, FormControlLabel, Switch, Divider, Typography } from '@mui/material';
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
import moment from 'moment-timezone';

export default function AddExpenseForm(props) {
    const { user, token } = props
    const { open, setOpen } = props
    const { editing, expense } = props
    const { employee, handleChangeEmployee } = props
    const { createExpense, updateExpense } = props
    const [ images, setImages ] = React.useState([]);
    const [ editImage, setEditImage ] = React.useState({})
    const [ isValid, setIsValid ] = React.useState(true)
    

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
        receipt_pic: null,
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
    
    React.useLayoutEffect(() => {
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
        if(name === 'price'){
            if (value > -1) {
                setValues({
                    ...values,
                    [name]: value
                    });
            }
        } else {
        setValues({
        ...values,
        [name]: value
        });
    }
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
            date_purchased: String(values.date_purchased)? moment.tz(values.date_purchased, "America/New_York")._d : moment.tz(values.date_purchased, "America/New_York")._d.toISOString().split('T')[0],
            notes: values.notes
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

        if(values.project === ''){
            setErrors({...errors, project: 'Required field'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, project: null});
            }, 3000);
        }
        else if(values.date_purchased > new Date()){
            setErrors({...errors, date_purchased: 'Date cannot be in the future.'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, date_purchased: null});
            }, 3000);
        }
        else if(!values.price){
            setErrors({...errors, price: 'Enter valid Price'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, price: null});
            }, 3000);
        }
        else if(isNaN(values.price)){
            setErrors({...errors, price: 'Price needs to be a number'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, price: null});
            }, 3000);
        }
        else if(values.price <= 0){
            setErrors({...errors, price: 'Price needs to be greater then 0'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, price: null});
            }, 3000);
        }
        else if(!values.merchant){
            setErrors({...errors, merchant: 'Enter Merchant'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, merchant: null});
            }, 3000);
        }
        else if(!employee){
            setErrors({...errors, employee: 'Select Employee'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, employee: null});
            }, 3000);
        }
        else if(values.receipt_pic === null){
            setErrors({...errors, receipt_pic: 'Select Image'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, receipt_pic: null});
            }, 3000);
        }
        else{
            setErrors({
                project: null,
                receipt_pic: null,
                merchant: null,
                price: null,
                date_purchased: null,
                employee: null
            });
            formIsValid = true;
        }
        setIsValid(formIsValid)
        setTimeout(() => {
            setIsValid(true);
        }, 3000);
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
            fullScreen
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{`${editing ? 'Edit' : 'Add'} Expense`}</DialogTitle>
            <Divider/>
            <DialogContent>
                <Stack direction="column" spacing={2}>
                {user.is_staff ?
                <EmployeePicker
                    editing={editing}
                    editObject={expense}
                    employee={employee}
                    errors={errors}
                    user={user}
                    token={token}
                    handleChangeEmployee={handleChangeEmployee}
                />
                : ''}     
                <ProjectPicker
                    editing={editing}
                    editObject={expense}
                    token={token}
                    handleChangeProject={handleChangeProject}
                    errors={errors}
                    editProject={values.project}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Date Purchased"
                        id="date_purchased"
                        name="date_purchased"
                        value={values.date_purchased}
                        onChange={(date) => {setValues({...values, date_purchased: moment.tz(date, "America/New_York")._d})}}
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
                                <Stack>
                                <Button 
                                    variant="contained" 
                                    style={isDragging ? { color: 'red' } : undefined}
                                    color={`${errors.receipt_pic? 'error' : 'primary'}`}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    startIcon={<PhotoCamera />}
                                    >
                                Receipt
                                </Button>
                                <Typography variant="caption" sx={{color: '#B00020'}}>
                                    {errors.receipt_pic}
                                </Typography>
                                </Stack>
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
                                    onClick={() => {
                                        onImageRemove(index);
                                        setValues({
                                            ...values,
                                            receipt_pic: null
                                            });
                                    }}
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
            <Button 
                variant='contained' 
                onClick={handleValidation}
                color={`${isValid? 'primary' : 'error'}`}
            >
                {editing ? 'Update' : 'Submit'}
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
};