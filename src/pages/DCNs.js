import React, { useEffect } from 'react';
import EngineeringServices from '../services/Engineering.services';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Loading from '../components/Loading';
import DCNList from '../components/DCNList';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import AddDCNForm from '../components/AddDCNForm';

const currentYear = new Date().getFullYear();

export default function DCNs(props) {
    const { user, token, handleOpenSnackbar } = props;
    const [ isLoading, setIsLoading ] = React.useState(false); // wait until API returns promise
    const [ DCNs, setDCNs ] = React.useState([]);
    const [ DCN, setDCN ] = React.useState('');
    const [ nextDCN, setNextDCN ] = React.useState('');
    const [ editing, setEditing ] = React.useState(false);
    const [ openDCNForm, setOpenDCNForm ] = React.useState(false);

    useEffect(() => {
        retrieveDCNs();
    },[])

    // const formatDate = (inputDate) => {
    //     const date = new Date(inputDate);
    //     const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const year = date.getFullYear();
        
    //     return `${month}/${day}/${year}`;
    // }

    const retrieveDCNs = () => {
        setIsLoading(true);
        EngineeringServices.getAllDCNs(currentYear, token)
        .then(response => {
            let list = response.data;
            // const updatedList = [];

            // list.length > 0 && list.map(DCN => {
            //     let project =
            //         DCN.project !== null
            //             ? DCN.project
            //             : DCN.service !== null
            //             ? DCN.service
            //             : DCN.hse !== null
            //             ? DCN.hse
            //             : DCN.quote;
            //     // Push an object with the desired properties
            //     //!! need to fix this so I can access id's in edit
            //     updatedList.push({
            //         id: DCN.id,
            //         number: DCN.number,
            //         project: project.number,
            //         rev: DCN.rev,
            //         created: formatDate(DCN.created),
            //         comments: DCN.comments,
            //         created_by: `${DCN.created_by.first_name} ${DCN.created_by.last_name}`,
            //         is_external: DCN.is_external
            //     });
            // });
            if(list.length > 0){
                let nextNumber = Number(list[0].number.slice(5, 8)) + 1
                if (nextNumber < 10) {
                    nextNumber = `${currentYear}-00${nextNumber}`;
                } else if (nextNumber < 100) {
                    nextNumber = `${currentYear}-0${nextNumber}`;
                } else {
                    nextNumber = `${currentYear}-${nextNumber}`;
                }
                setNextDCN(nextNumber);
                // setDCNs(updatedList);
                setDCNs(list)
            } else {
                let nextNumber = `${currentYear}-001`;
                setNextDCN(nextNumber);
            }
        })
        .catch( e => {
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
        .catch( e => {
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
        .catch( e => {
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
                        flexDirection:'column',
                        height: '100%',
                        textAlign: 'center', 
                    }}
                variant="h5" 
                gutterBottom
            >
                DRAWING CHANGE ORDERS (DCN)
            </Typography>
            <Divider sx={{mb:3}}/>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button
                    sx={{mb:3}}
                    size="large"
                    variant='contained' 
                    color='success'
                    endIcon={<AddIcon />}
                    onClick={handleOpenForm}
                >
                    Add DCN {nextDCN}
                </Button>
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