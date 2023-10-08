import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, IconButton } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import  Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Transition from './DialogTransistion';
import ProjectPicker from './ProjectPicker';
import QuotePicker from './QuotePicker';
import ServicePicker from './ServicePicker';
import HSEPicker from './HSEPicker';
import ProjectTypeDropdown from './ProjectTypeDropdown';

export default function AddDCNForm(props) {
    
    const { 
            user,
            token,
            nextDCN,
            editing, 
            setEditing,
            createDCN, 
            updateDCN,
            DCN,
            DCNs,
            open,
            setOpen,
            } = props;

    const initialFormValues = {
        number: nextDCN,
        project: '',
        service: '',
        hse: '',
        quote: '',
        rev: '',
        created: new Date(),
        comments: '',
        created_by: user.id,
        is_external: true

    };



    const [ menuOptions, setMenuOptions ] = React.useState(['Projects', 'Services', "HSE's"]);
    const [ menuSelection, setMenuSelection ] = React.useState(0);
    const [ values, setValues ] = React.useState(initialFormValues);
    const didMount = React.useRef(false);
    const [ errors, setErrors ] = React.useState({
        comments: null,
        project: null,
        service: null,
        hse: null,
        quote: null,
    });

    React.useEffect(() => {
        if(user.groups.filter(group => (group.name === 'SALES')).length > 0){
            setMenuOptions(['Projects', 'Services', "HSE's", 'Quotes']);
        }
    },[]);

    React.useLayoutEffect(() => {
        //! need to fix retrieveDCNs so this works
        if(editing){
            const item = DCNs.find((i) => i.number === DCN.number);
            const editFormValues = {
                id: item.id,
                number: item.number,
                project: item.project,
                service: item.service,
                hse: item.hse,
                quote: item.quote,
                rev: item.rev,
                created: item.created,
                comments: item.comments,
                created_by: item.created_by.id,
                is_external: item.is_external
            };
            setValues(editFormValues)
        }
        
    },[open]);

    React.useEffect(() => {
        if (didMount.current) {
            if(editing){
                if(DCN.service !== null){
                    setMenuSelection(1)
                }
                if(DCN.hse !== null){
                    setMenuSelection(2)
                }
                if(DCN.quote !== null){
                    setMenuSelection(3)
                }
                if(DCN.project !== null){
                    setMenuSelection(0)
                }
            }
        } else {
            didMount.current = true;
        }
    },[props]);


    const handleSubmit = () => {
        const data = {
            number: values.number,
            project: values.project,
            service: values.service,
            hse: values.hse,
            quote: values.quote,
            rev: values.rev,
            created: values.created,
            comments: values.comments,
            created_by: values.created_by,
            is_external: values.is_external
        };

        console.log(data)

        if(editing){
            updateDCN(DCN.id, data);
            handleClose();
        }
        else {
            createDCN(data);
            handleClose();
        };
    };

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        if (name === "rev") {
            setValues({
                ...values,
                [name]: value.toUpperCase()
            });
        }else{
            setValues({
                ...values,
                [name]: value
                });
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
        else if(values.comments.length > 1000){
            setErrors({...errors, memo: '1000 character max.'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, memo: null});
            }, 3000);
        }
        else{
            setErrors({
                title: null,
                memo: null,
            });
            formIsValid = true;
        }
    return formIsValid ? handleSubmit() : null
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

    let picker = <div></div>

    switch(menuSelection) {
        case 1:
            picker = 
                <ServicePicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={DCN}
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
                    editObject={DCN}
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
                    editObject={DCN}
                    // editProject={values.project}
                />
        break;
        default:
            picker = 
                <ProjectPicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={DCN}
                    errors={errors}
                    editProject={values.project}
                />  
    };

    const handleClose = () => {
        setOpen(!open);
        setValues(initialFormValues);
        setEditing(false);
    };

    return (
        <div>
            <Dialog 
                TransitionComponent={Transition}
                fullWidth 
                fullScreen
                open={open} 
                onClose={handleClose}
                scroll={'body'}
                // PaperProps={{
                //     style: {
                //         minHeight: '100%', // Set a minimum height to the Dialog
                //         display: 'flex',
                //         flexDirection: 'column',
                //     },
                // }}
            >
                <DialogTitle>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            {`${editing ? 'Edit' : 'Add'} DCN# ${editing ? DCN.number : nextDCN}`}
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
                    <Stack direction="row" spacing={1}>
                        {picker}
                        <ProjectTypeDropdown
                            user={user}
                            menuOptions={menuOptions}
                            menuSelection={menuSelection}
                            setMenuSelection={setMenuSelection}
                        />
                    </Stack>
                    <TextField
                        autoFocus={false}
                        margin="dense"
                        id="rev"
                        name='rev'
                        label="Rev"
                        onChange={handleInputValue}
                        value={values.rev}
                        type="text"
                        fullWidth
                        variant="outlined"
                        inputProps={{ maxLength: 2 }}
                    />
                    <TextField
                        autoFocus={false}
                        id="comments"
                        name="comments"
                        label="Comments"
                        onChange={handleInputValue}
                        value={values.comments}
                        multiline
                        rows={5}
                        helperText={errors.comments === null ? '' : errors.comments}
                        error={errors.comments? true : false}
                    />
                    <FormControlLabel
                        onChange={() => {setValues({...values, is_external: !values.is_external})}}
                        control={<Switch checked={values.is_external} color="primary" />}
                        id="is_external"
                        name="is_external"
                        label="Is External"
                        value={values.is_external}
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
