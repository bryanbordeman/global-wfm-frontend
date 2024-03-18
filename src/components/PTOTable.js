import * as React from 'react';
import { useEffect, useState } from 'react';
import EmployeeServices from '../services/Employee.services';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(type, accrued, used, eligible) {
    return { type, accrued, used, eligible };
}

export default function PTOTable(props) {
    const { user, token, handleOpenSnackbar } = props;
    const [ employee, setEmployee ] = useState(null);
    const [ row, setRow ] = useState([]);

    useEffect(() => {
        receivePTO();
    },[user]);

    useEffect(() => {
        if(employee){
            setRow ([
                createData('Vacation', parseFloat(employee.vacation_accrualed), parseFloat(employee.vacation_hours), parseFloat(employee.eligible_vacation_hours) - parseFloat(employee.vacation_hours)),
                createData('Sick', parseFloat(employee.sick_accrualed), parseFloat(employee.sick_hours_year), parseFloat(employee.sick_hours) - parseFloat(employee.sick_hours_year)),
            ]);
        }
    }, [employee])

    const receivePTO = () => {
        EmployeeServices.getEmployee(user.id, token)
        .then(response => {
            setEmployee(response.data);
        })
        .catch(e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.');
        })
        .finally(() => {
            console.log('finished')
        })
    };

    return (
        <TableContainer 
            component={Paper} 
            elevation={0}
            sx={{
                my: 1,
                width: '100%',
                maxWidth: '500px',
                border: 0.5,
                borderColor: 'primary.main',
                borderRadius: '16px',
                marginTop: '10px',
                marginBottom: '20px'
            }}
        >
            <Table size="small" aria-label="PTO table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">PTO Type</TableCell>
                        <TableCell align="center">Accrued</TableCell>
                        <TableCell align="center">Used</TableCell>
                        <TableCell align="center">Balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {row.map((row) => (
                        <TableRow
                            key={row.type}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.type}
                            </TableCell>
                            <TableCell align="center">{row.accrued}</TableCell>
                            <TableCell align="center">{row.used}</TableCell>
                            <TableCell align="center">{row.eligible}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}