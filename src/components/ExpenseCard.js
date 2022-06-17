import React from 'react';
import { Paper, Grid, ListItem, IconButton, ListItemAvatar, ListItemText, Stack, Divider, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import moment from 'moment';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function ImageDialog(props) {
    const { open, setOpen, expense } = props
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Dialog
            fullScreen={fullScreen}
            open={open}
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
    const { user, expense } = props
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        setOpen(!open);
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
                                    // onClick={ () => {
                                    //     handleClickOpenEdit(expense)}}
                                    >
                                    <Edit/>
                                </IconButton>
                                <Divider />
                                <IconButton 
                                    edge="end" 
                                    color="error"
                                    aria-label="delete"
                                    // onClick={ () => {
                                    //     handleClickOpenDelete(expense)}}
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
                            {/* <Chip 
                                sx={{ 
                                    marginTop: '1.5rem',
                                    marginBottom: '1.5rem',
                                }}
                                color={`${expense.is_approved ? 'success' : 'primary'}`}
                                icon={expense.is_approved ? <CheckIcon /> : <ReceiptLongOutlinedIcon/>} 
                                label={`$${expense.price}`} 
                                // variant="outlined" 
                            /> */}
                            <Button 
                                sx={{ 
                                    marginRight: '0.5rem',
                                    marginLeft: '0.5rem',
                                    marginTop: '1.5rem',
                                    marginBottom: '1.5rem',
                                }}
                                variant='contained' 
                                color='primary' 
                                size='small' 
                                startIcon={<ReceiptLongOutlinedIcon />}
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
                                        // onClick={() => {approveWorksegment(expense.id)}}
                                        >Approved</Button> : 
                                    <Button 
                                        variant='outlined' 
                                        color='inherit'
                                        size='small'
                                        // onClick={() => {approveWorksegment(expense.id)}}
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
                                {/* {user.is_staff? <Chip sx={{mb:1}}label={`${expense.user.first_name} ${expense.user.last_name}`} />:''} */}
                                {user.is_staff? `${expense.user.first_name} ${expense.user.last_name}` :''}
                                {user.is_staff? <br/> :''}
                                Project: {expense.project.number}
                                <br/>
                                Merchant: {expense.merchant}
                                {/* <br/>
                                {expense.receipt_pic ? 
                                    <IconButton size="small" aria-label="notes">
                                        <ReceiptLongOutlinedIcon />
                                    </IconButton>
                                    : ''} */}
                            </>
                            }
                        />
                    </ListItem>
                    <ImageDialog
                        open={open}
                        setOpen={setOpen}
                        expense={expense}
                    />
                    {/* <img src={} alt="GPS Logo"/> */}
                </Grid>
                </Grid>
            </Paper>
    );
};


