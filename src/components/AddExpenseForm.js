import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, Typography,TextField, FormControlLabel, Switch, Divider } from '@mui/material';
import EmployeePicker from './EmployeePicker';
import ProjectPicker from './ProjectPicker'
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useRef } from 'react';
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
    const { editing } = props
    const { employee, handleChangeEmployee } = props
    const { createExpense, updateExpense } = props
    const [images, setImages] = React.useState([]);
    

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        // console.log(imageList[0].data_url);
        setValues({
                ...values,
                receipt_pic: imageList[0]
                });
        setImages(imageList);
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

    const [ values, setValues ] = React.useState(initialFormValues);
    const [ errors, setErrors ] = React.useState({
        project: null,
        receipt_pic: null,
        merchant: null,
        price: null,
        date_purchased: null,
        employee: null
    })

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

    const handleImageUpload = (e) => {
        // console.log(e.target.files)
        const files = Array.from(e.target.files);
        const [file] = files;
        const name = e.target.name
        console.log(file.webkitRelativePath)
        // setValues({
        //     ...values,
        //     [name]: file
        //     });
        
    }

    const handleSubmit = () => {
        const data = {
            project: values.project, 
            receipt_pic: values.receipt_pic,
            merchant: values.merchant,
            price: values.price,
            is_reimbursable: values.is_reimbursable,
            is_approved: false,
            date_purchased: values.date_purchased.toISOString().split('T')[0],
            notes: ''
        };

        createExpense(data);
        setOpen(false);
    };

    const handleValidation = () => {
        let formIsValid = true;
        return formIsValid ? handleSubmit() : null
    }

    const handleClose = () => {
        setOpen(false);
    };

    const Input = styled('input')({
        display: 'none',
    });

    const uploadInputRef = useRef(null);

    return (
        <div>
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
        >
            <DialogTitle id="expense-title">
            Add Expense
            </DialogTitle>
            <Divider/>
            <DialogContent>
                <Stack direction="column" spacing={2}>
                <EmployeePicker
                    employee={employee}
                    errors={errors}
                    user={user}
                    token={token}
                    handleChangeEmployee={handleChangeEmployee}
                />
                <ProjectPicker
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
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                        }) => (
                        // write your building UI
                        <div>
                            <Stack direction="row" spacing={2}>   
                                {/* <Button
                                variant='contained'
                                color='success'
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                                >
                                Click or Drop here
                                </Button> */}
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
                {/* <label htmlFor="contained-button-file">
                    <Input 
                        ref={uploadInputRef}
                        accept="image/*"
                        id="contained-button-file" 
                        multiple 
                        type="file"
                        name="receipt_pic"
                        onChange={handleImageUpload}
                    />
                    <Button 
                        variant="contained" 
                        component="span" 
                        startIcon={<PhotoCamera />}
                        onClick={() => uploadInputRef.current}
                        >
                    Receipt
                    </Button> 
                </label> */}
                {/* <Typography
                    sx={{pt:1}}
                    variant="body1" 
                    color="text.secondary" 
                    gutterBottom
                >
                    {values.receipt_pic.name}
                </Typography> */}
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
