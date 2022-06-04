import React from 'react';
import { Container } from '@mui/material';
import MonthPicker from '../components/MonthPicker'
import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function Expenses(props) {
    // const { user } = props
    return ( 
        <div style={{paddingTop: '1rem'}}> 
            <Container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection:'column',
                        height: '100%'
                    }}>
                    <div  style={{width: '100%', maxWidth: '500px' }}>
                    <Stack style={{marginBottom: '0.75rem', marginTop: '1.5rem',}}direction="row" spacing={2}>
                            <MonthPicker/>
                            <div style={{width: '50%'}}>
                            <Button
                                sx={{ height: '100%'}}
                                fullWidth
                                size="large"
                                variant='contained' 
                                color='success'
                                endIcon={<AddIcon />}
                                // onClick={handleClickOpen}
                            >Add</Button>
                            </div>
                        </Stack>
                    </div>
            </Container>
        </div>
    );
}

export default Expenses;