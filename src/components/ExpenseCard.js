import React from 'react';
import { Paper, Grid, ListItem, IconButton, ListItemAvatar, ListItemText, Stack, Divider, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import moment from 'moment';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import SpeakerNotesTwoToneIcon from '@mui/icons-material/SpeakerNotesTwoTone';

function DeleteExpenseModal(props) {

    const { deleteExpense, expense , openDelete, setOpenDelete  } = props

    const handleClose = () => {
        setOpenDelete(false);
    };

    const handleDelete = () => {
        deleteExpense(expense.id);
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
            <Alert severity="error">Permanently delete this expense?</Alert>
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {moment(expense.date_purchased).format("ddd, MMMM Do YYYY")}
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
    }

function ImageDialog(props) {
    const { openImage, setOpenImage, expense } = props
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setOpenImage(false);
    };

    return (
        <div>
        <Dialog
            fullScreen={fullScreen}
            open={openImage}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
            Expense id: {expense.id}
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                <img 
                    src={expense.receipt_pic} 
                    alt="receipt"
                    style={{width: '100%'}}
                    />
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button 
                variant='contained'
                color='primary'
                onClick={handleClose} 
                autoFocus
            >
                Close
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}


export default function ExpenseCard(props) {
    const { user } = props
    const { expense } = props
    const { approveExpense, deleteExpense, setEditExpense, setEditing, setOpen } = props
    const [ openImage, setOpenImage ] = React.useState(false);
    const [ openDelete, setOpenDelete ] = React.useState(false);
    
    const handleClickOpen = () => {
        setOpenImage(!openImage);
    };

    const handleClickOpenDelete = () => {
        setOpenDelete(true)
    };

    const handleClickOpenEdit = (expense) => {
        setEditExpense(expense)
        setEditing(true)
        setOpen(true)
    };

    return (  
            <Paper
                sx={{
                my: 2,
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
                            <Button 
                                sx={{ 
                                    marginRight: '0.5rem',
                                    marginLeft: '0.5rem',
                                    marginTop: '1.5rem',
                                    marginBottom: '1.5rem',
                                }}
                                variant='contained' 
                                size='small' 
                                color={`${expense.is_approved ? 'success' : 'primary'}`}
                                startIcon={expense.is_approved ? <CheckIcon /> : <ReceiptLongOutlinedIcon/>} 
                                onClick={handleClickOpen}
                                >
                                {`$${parseFloat(expense.price).toFixed(2)}`} 
                            </Button>
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
                                        onClick={() => {approveExpense(expense.id)}}
                                        >Approved</Button> : 
                                    <Button 
                                        variant='outlined' 
                                        color='inherit'
                                        size='small'
                                        onClick={() => {approveExpense(expense.id)}}
                                        >Approve</Button> : 
                                    `${expense.is_approved ? 'Approved' : 'Pending'}`
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
                                Merchant: {expense.merchant}
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
                    <ImageDialog
                        openImage={openImage}
                        setOpenImage={setOpenImage}
                        expense={expense}
                    />
                    <DeleteExpenseModal
                        expense={expense}
                        openDelete={openDelete}
                        setOpenDelete={setOpenDelete}
                        deleteExpense={deleteExpense}
                    />
                </Grid>
                </Grid>
            </Paper>
    );
};


