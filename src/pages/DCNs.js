import React, { useEffect, useState } from 'react';
import EngineeringServices from '../services/Engineering.services';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Loading from '../components/Loading';
import DCNList from '../components/DCNList';
import AddIcon from '@mui/icons-material/Add';
import { Button, Stack } from '@mui/material';
import AddDCNForm from '../components/AddDCNForm';

const currentYear = new Date().getFullYear();

export default function DCNs(props) {
    const { user, token, handleOpenSnackbar } = props;
    const [isLoading, setIsLoading] = React.useState(false); // wait until API returns promise
    const [DCNs, setDCNs] = React.useState([]);
    const [DCN, setDCN] = React.useState('');
    const [nextDCN, setNextDCN] = React.useState('');
    const [editing, setEditing] = React.useState(false);
    const [openDCNForm, setOpenDCNForm] = React.useState(false);
    const [ year, setYear ] = useState(new Date().getFullYear());

    const today = new Date();

    const handleUpdateDate = (date) => {
        setYear(String(date.getFullYear()))
    }

    useEffect(() => {
        retrieveDCNs();
    }, [year])

    const retrieveDCNs = () => {
        setIsLoading(true);
        EngineeringServices.getAllDCNs(year, token)
            .then(response => {
                let list = response.data;
                if (list.length > 0) {
                    let nextNumber = Number(list[0].number.slice(5, 8)) + 1
                    if (nextNumber < 10) {
                        nextNumber = `${currentYear}-00${nextNumber}`;
                    } else if (nextNumber < 100) {
                        nextNumber = `${currentYear}-0${nextNumber}`;
                    } else {
                        nextNumber = `${currentYear}-${nextNumber}`;
                    }
                    setNextDCN(nextNumber);
                    setDCNs(list)
                } else {
                    if(year == currentYear){
                        let nextNumber = `${currentYear}-001`;
                        setNextDCN(nextNumber);
                    }else{
                        setDCNs([])
                    }
                }
            })
            .catch(e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const createDCN = (data) => {
        setIsLoading(true);
        EngineeringServices.createDCN(data, token)
            .then(response => {
                window.scrollTo(0, 0);
                handleOpenSnackbar('success', 'Your DCN has been created')
                retrieveDCNs();
            })
            .catch(e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const updateDCN = (id, data) => {
        EngineeringServices.updateDCN(id, data, token)
            .then(response => {
                window.scrollTo(0, 0);
                retrieveDCNs();
                handleOpenSnackbar('info', 'Your DCN has been updated')
                setEditing(false);
            })
            .catch(e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            });
    };

    const deleteDCN = (id) => {
        EngineeringServices.deleteDCN(id, token)
            .then(response => {
                window.scrollTo(0, 0);
                retrieveDCNs();
                handleOpenSnackbar('warning', 'Your DCN has been deleted')
            })
            .catch(e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            });
    };

    const handleOpenForm = () => {
        setOpenDCNForm(!openDCNForm)
    };

    return (
        <div>
            <Typography
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    height: '100%',
                    textAlign: 'center',
                }}
                variant="h5"
                gutterBottom
            >
                DRAWING CHANGE ORDERS (DCN)
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 24}}>
            <Stack spacing={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Year"
                    id="year"
                    name="year"
                    views={['year']}
                    value={new Date().setYear(year)}
                    minDate={today.setFullYear(today.getFullYear() - 3)}
                    maxDate={today.setFullYear(today.getFullYear() + 3)}
                    onChange={(date) => { handleUpdateDate(date) }}
                    renderInput={(params) => < TextField {...params} variant="filled" />}
                />
            </LocalizationProvider>
                {year == currentYear &&
                <Button
                    sx={{ mb: 3 }}
                    size="large"
                    variant='contained'
                    color='success'
                    endIcon={<AddIcon />}
                    onClick={handleOpenForm}
                >
                    Add DCN {nextDCN}
                </Button>
            }
            </Stack>
            </div>
            <DCNList
                DCNs={DCNs}
                DCN={DCN}
                setDCN={setDCN}
                openForm={openDCNForm}
                setOpenForm={setOpenDCNForm}
                setEditing={setEditing}
                deleteDCN={deleteDCN}
            />
            <Loading
                open={isLoading}
            />
            <AddDCNForm
                user={user}
                token={token}
                DCN={DCN}
                DCNs={DCNs}
                createDCN={createDCN}
                updateDCN={updateDCN}
                nextDCN={nextDCN}
                editing={editing}
                setEditing={setEditing}
                open={openDCNForm}
                setOpen={setOpenDCNForm}
            />
        </div>
    );
};