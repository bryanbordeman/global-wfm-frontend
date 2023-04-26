import React from 'react';
import { Paper, Grid, ListItem, IconButton, ListItemAvatar, ListItemText, Stack, Divider, Chip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckIcon from '@mui/icons-material/Check';
import moment from 'moment';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import SpeakerNotesTwoToneIcon from '@mui/icons-material/SpeakerNotesTwoTone';


function DeleteExpenseModal(props) {
    const { deleteMile, expense , openDelete, setOpenDelete  } = props
    
    const handleClose = () => {
        setOpenDelete(false);
    };

    const handleDelete = () => {
        deleteMile(expense.id);
        setOpenDelete(false);
    };

    return (
        <div>
        <Dialog
            open={openDelete}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Alert severity="error">Permanently delete these miles?</Alert>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Date: {moment(expense.date_purchased).format("ddd, MMMM Do YYYY")} 
                    <br/>
                    {expense.quote?
                    `Quote: ${expense.quote.number}`
                    : ''}
                    {expense.project?
                    `Project: ${expense.project.number}`
                    : ''}
                    {expense.service?
                    `Service: ${expense.service.number}`
                    : ''}
                    {expense.hse?
                    `HSE: ${expense.hse.number}`
                    : ''}
                    <br/>
                    Miles: {expense.miles}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={handleClose}>Close</Button>
                <Button color='error' variant="contained" onClick={handleDelete} startIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
};


export default function MileCard(props) {
    const { user, expense, approveMile, deleteMile, setOpenMiles, setEditExpense, setEditing} = props
    const [ openDelete, setOpenDelete ] = React.useState(false);
    
    const handleClickOpenDelete = () => {
        setOpenDelete(true)
    };

    const handleClickOpenEdit = (expense) => {
        setEditExpense(expense)
        setEditing(true)
        setOpenMiles(true)
    };
    
    return (  
            <Paper
                sx={{
                my: 1,
                width: '100%',
                maxWidth: '500px',
                border: 0.5,
                borderColor: 'primary.main',
                borderRadius: '16px',
                }}
                variant="outlined"
                key={expense.id}
            >
                <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs zeroMinWidth>
                    <ListItem 
                        key={expense.id}
                        secondaryAction={
                            !expense.is_approved ?
                            <Stack spacing={2}>
                                <IconButton
                                    color='primary'
                                    onClick={ () => {
                                        handleClickOpenEdit(expense)}}
                                    >
                                    <Edit/>
                                </IconButton>
                                <Divider />
                                <IconButton 
                                    edge="end" 
                                    color="error"
                                    aria-label="delete"
                                    onClick={ () => {
                                        handleClickOpenDelete(expense)}}
                                        >
                                    <DeleteIcon />
                                </IconButton>
                            </Stack> : ''
                        }
                    >
                        <ListItemAvatar
                        sx={{ 
                            marginRight: '1rem', 
                            marginBottom: '1rem',
                        }}
                        >
                            <Chip 
                                sx={{ 
                                    marginTop: '1.5rem',
                                    marginBottom: '1.5rem',
                                }}
                                color={`${expense.is_approved ? 'success' : 'primary'}`}
                                icon={expense.is_approved ? <CheckIcon /> : <DirectionsCarFilledOutlinedIcon/>} 
                                label={`$${parseFloat(expense.price).toFixed(2)}`}
                            />
                            
                            <Divider/>
                            <ListItemText
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: '1rem',
                                }}
                                key={expense.id}
                                primary={user.is_staff ? 
                                    expense.is_approved ? 
                                    <Button 
                                        variant='outlined' 
                                        startIcon={<CheckBoxIcon />} 
                                        color='success'
                                        size='small'
                                        onClick={() => {approveMile(expense.id)}}
                                        >Paid</Button> : 
                                    <Button 
                                        variant='outlined' 
                                        color='inherit'
                                        size='small'
                                        onClick={() => {approveMile(expense.id)}}
                                        >Pay</Button> : 
                                    `${expense.is_approved ? 'Paid' : user.is_staff? 'Pay' : 'Pending'}`
                                    }
                            />
                        </ListItemAvatar>
                        <ListItemText
                            key={expense.id}
                            primary={
                            <div style={{fontWeight: '700', marginBottom: '.25rem'}}>
                                {moment(expense.date_purchased).format("ddd, MMMM Do YYYY")}
                            </div>
                            }
                            secondary={
                            <>  
                                {/* {user.is_staff? <Chip sx={{mb:1}}label={`${expense.user.first_name} ${expense.user.last_name}`} />:''} */}
                                {user.is_staff? `${expense.user.first_name} ${expense.user.last_name}` :''}
                                {user.is_staff? <br/> :''}
                                {expense.quote?
                                    `Quote: ${expense.quote.number}`
                                    : ''}
                                    {expense.project?
                                    `Project: ${expense.project.number}`
                                    : ''}
                                    {expense.service?
                                    `Service: ${expense.service.number}`
                                    : ''}
                                    {expense.hse?
                                    `HSE: ${expense.hse.number}`
                                    : ''}
                                <br/>
                                Mile Rate: {`$${parseFloat(expense.rate.rate).toFixed(2)}`}
                                <br/>
                                Miles: {expense.miles}
                                {expense.notes ? 
                                <> 
                                    <br/> 
                                        <Tooltip title={expense.notes} enterTouchDelay={0}>
                                            <IconButton size="small" aria-label="notes">
                                                <SpeakerNotesTwoToneIcon />
                                            </IconButton>
                                        </Tooltip> 
                                </> 
                                : ''}
                            </>
                            }
                        />
                    </ListItem>
                </Grid>
                </Grid>
                <DeleteExpenseModal
                        expense={expense}
                        openDelete={openDelete}
                        setOpenDelete={setOpenDelete}
                        deleteMile={deleteMile}
                    />
            </Paper>
    );
};


