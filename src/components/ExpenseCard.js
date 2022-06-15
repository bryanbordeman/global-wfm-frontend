import React from 'react';
import { Button, Chip } from '@mui/material';
import { Paper, Grid, ListItem, IconButton, ListItemAvatar, ListItemText, Stack, Divider, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import moment from 'moment';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

function ExpenseCard(props) {
    const { user } = props
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
                    {/* <img src={} alt="GPS Logo"/> */}
                </Grid>
                </Grid>
            </Paper>
    );
};

export default ExpenseCard;

const expense = 
{
    "id": 1,
    "receipt_pic": "http://192.168.1.10:8000/receipt_pic/kodex_RA_logo_rlkDGoJ.jpg",
    "merchant": "Walmart",
    "price": 15.00,
    "notes": "",
    "is_reimbursable": true,
    "is_approved": false,
    "date_purchased": "2022-06-04",
    "date_created": "2022-06-04",
    "user": {
        "id": 1,
        "password": "pbkdf2_sha256$320000$hQCF672CjQ5VgfmQcwA02z$/TQXapw74utdBKGLIl1+JJ+AoYMncLTEhun4Z5TasXE=",
        "last_login": "2022-06-12T05:09:21.006256-04:00",
        "is_superuser": true,
        "username": "bryanbordeman",
        "first_name": "Bryan",
        "last_name": "Bordeman",
        "email": "bryanbordeman@hotmail.com",
        "is_staff": true,
        "is_active": true,
        "date_joined": "2022-05-11T18:39:43-04:00",
        "groups": [
            2
        ],
        "user_permissions": []
    },
    "project": {
        "id": 1,
        "is_active": true,
        "number": "12345",
        "name": "Testing First Project from DB",
        "prevailing_rate": true,
        "travel_job": true,
        "notes": "sdcdscdscdsc",
        "project_category": 1,
        "project_type": 1,
        "address": 1,
        "customer_company": 1,
        "contact": [
            1,
            2
        ]
    }
}
