import * as React from 'react';
import ExpenseDataService from '../services/Expense.services';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, TextField, FormControlLabel, Switch, Divider, Typography } from '@mui/material';
import EmployeePicker from './EmployeePicker';
import ProjectPicker from './ProjectPicker';
import QuotePicker from './QuotePicker';
import ServicePicker from './ServicePicker';
import HSEPicker from './HSEPicker';
import ProjectTypeDropdown from './ProjectTypeDropdown';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ImageUploading from 'react-images-uploading';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment-timezone';
import Transition from './DialogTransistion'

export default function AddExpenseForm(props) {
    const { user, token, handleOpenSnackbar } = props
    const { employees } = props; 
    const { open, setOpen } = props
    const { editing, expense } = props
    const { employee, handleChangeEmployee } = props
    const { createExpense, updateExpense } = props
    const [ images, setImages ] = React.useState([]);
    const [ isValid, setIsValid ] = React.useState(true);
    const [ menuOptions, setMenuOptions ] = React.useState(['Projects', 'Services', "HSE's"]);
    const [ menuSelection, setMenuSelection ] = React.useState(0);
    const didMount = React.useRef(false);
    const today = new Date();

    React.useEffect(() => {
        if(user.groups.filter(group => (group.name === 'SALES')).length > 0){
            setMenuOptions(['Projects', 'Services', "HSE's", 'Quotes']);
        }
    },[])

    React.useEffect(() => {
        if (didMount.current) {
            if(editing){
                if(expense.service !== null){
                    setMenuSelection(1)
                }
                if(expense.hse !== null){
                    setMenuSelection(2)
                }
                if(expense.quote !== null){
                    setMenuSelection(3)
                }
                if(expense.project !== null){
                    setMenuSelection(0)
                }
            }
        } else {
            didMount.current = true;
        }
    },[props]);
    
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
    },[menuSelection])

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
        service: '',
        hse: '',
        quote:'',
        receipt_pic: null,
        merchant: '',
        price: '',
        is_reimbursable: false,
        is_approved: false,
        date_purchased: today,
        notes: ''
    };

    const editFormValues = {
        quote: editing && expense.quote != null ? expense.quote.id : expense.quote,
        project: editing && expense.project != null ? expense.project.id : expense.project,
        service: editing && expense.service != null? expense.service.id : expense.service,
        hse: editing && expense.hse != null ? expense.hse.id : expense.hse,
        receipt_pic: editing && expense.receipt_pic? expense.receipt_pic : '',
        merchant: expense.merchant,
        price: expense.price,
        is_reimbursable: expense.is_reimbursable,
        is_approved: expense.is_approved,
        date_purchased: editing ? new Date(expense.date_purchased.replace('-', '/').replace('-', '/')) : new Date(),
        notes: expense.notes
    };

    const [ values, setValues ] = React.useState(initialFormValues);
    const [ errors, setErrors ] = React.useState({
        project: null,
        receipt_pic: null,
        merchant: null,
        price: null,
        date_purchased: null,
        employee: null
    });
    
    React.useLayoutEffect(() => {
        setValues(editing ? editFormValues : initialFormValues)
    },[open]);

    React.useLayoutEffect(() => {
        if(editing === true){
            setImages([expense.receipt_pic]);
            // onChange(expense.receipt_pic);
        };
    },[open]);
    
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

    const handleSubmit = () => {
        //!! value is not consistant. need to figure out solution.
        // console.log(values.receipt_pic)

        const date = moment.tz(values.date_purchased, "America/New_York")._d
        const data = {
            quote: values.quote,
            project: values.project, 
            service: values.service, 
            hse: values.hse, 
            receipt_pic: values.receipt_pic,
            merchant: values.merchant,
            price: values.price,
            is_reimbursable: values.is_reimbursable,
            is_approved: false,
            date_purchased: String(values.date_purchased)? date : date.toISOString().split('T')[0],
            notes: values.notes
        };
        if(editing){
            if(expense.receipt_pic === values.receipt_pic){
                delete data.receipt_pic
            }
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

        if(values.project === '' && values.service === '' && values.hse === '' && values.quote === ''){
            setErrors({...errors, project: 'Required field'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, project: null});
            }, 3000);
        }
        else if(values.date_purchased > today){
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

    let picker = <div></div>

    switch(menuSelection) {
        case 1:
            picker = 
                <ServicePicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={expense}
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
                    editObject={expense}
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
                    editObject={expense}
                    // editProject={values.project}
                />
        break;
        default:
            picker = 
                <ProjectPicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={expense}
                    errors={errors}
                    editProject={values.project}
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
        >
            <DialogTitle>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        {`${editing ? 'Edit' : 'Add'} Expense`}
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
                {user.is_staff ?
                <EmployeePicker
                    editing={editing}
                    editObject={expense}
                    employee={employee}
                    errors={errors}
                    user={user}
                    token={token}
                    handleChangeEmployee={handleChangeEmployee}
                    employees={employees}
                />
                : ''}     
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
                        label="Date Purchased"
                        id="date_purchased"
                        name="date_purchased"
                        value={values.date_purchased}
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
                                <img name='preview_image' src={values.receipt_pic} alt="" width="100" />
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