import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DNCDialog from './DCNDialog';
import DeleteDCNModal from './DeleteDCNModal';
import Divider from '@mui/material/Divider';

import { styled, alpha } from '@mui/material/styles';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
        }}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
        }}
        {...props}
    />
    ))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
        padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
            fontSize: '1.25rem',
            // color: theme.palette.text.secondary,
            marginRight: theme.spacing(1.5),
        },
        '&:active': {
            backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
            ),
        },
        },
    },
}));

const columns = [
    { id: 'number', label: 'DCN Number', minWidth: 150 },
    { id: 'project', label: 'Project', minWidth: 125},
    { id: 'rev', label: 'Rev'},
    { id: 'created', label: 'Date'},
    { id: 'created_by', label: 'Created By', minWidth: 125},
    { id: 'is_external', label: 'External'},
];

function createData(number, project, rev, created, created_by, is_external ) {
    return { number, project, rev, created,created_by, is_external };
}


export default function DCNList(props) {
    const { DCNs, DCN, setDCN  } = props;
    const { openForm, setOpenForm  } = props;
    const { setEditing, deleteDCN } = props;
    const [ page, setPage ] = React.useState(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(10);
    const [ openDCNDialog, setOpenDCNDialog ] = React.useState(false);
    const [ openDelete, setOpenDelete ] = React.useState(false);
    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const openMenu = Boolean(anchorEl);

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        
        return `${month}/${day}/${year}`;
    }

    const updatedList = [];

        DCNs.length > 0 && DCNs.map(DCN => {
            let project =
                DCN.project !== null
                    ? DCN.project
                    : DCN.service !== null
                    ? DCN.service
                    : DCN.hse !== null
                    ? DCN.hse
                    : DCN.quote;
            // Push an object with the desired properties
            //!! need to fix this so I can access id's in edit
            updatedList.push({
                id: DCN.id,
                number: DCN.number,
                project: project.number,
                rev: DCN.rev,
                created: formatDate(DCN.created),
                comments: DCN.comments,
                created_by: `${DCN.created_by.first_name} ${DCN.created_by.last_name}`,
                is_external: DCN.is_external
            });
        });

    const rows = updatedList.map((DCN) => {
        const is_external = DCN.is_external === false? 'No' : 'Yes'
        return createData(
                    DCN.number, 
                    DCN.project, 
                    DCN.rev, 
                    DCN.created, 
                    DCN.created_by, 
                    is_external )
    })

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenPreview = () => {
        setOpenDCNDialog(!openDCNDialog)
    };

    const handleOpenDelete= () => {
        setOpenDelete(!openDelete);
    };

    const handleOpenForm = () => {
        setEditing(true);
        setOpenForm(!openForm);
    };

    const handleMenuClick = (event, number) => {
        setAnchorEl(event.currentTarget);
        const item = DCNs.find((DCN) => DCN.number === number)
        setDCN(item)
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden', border: 1, borderRadius:2, borderColor: "#1C88B0 !important" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, rowIndex) => {
                        return (
                        <TableRow 
                            hover 
                            role="checkbox" 
                            tabIndex={-1} 
                            key={row.number}
                        >
                            {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <React.Fragment key={`${row.number}-${column.id}`}>
                                    <StyledMenu
                                        key={row.number}
                                        id="demo-customized-menu"
                                        MenuListProps={{
                                        'aria-labelledby': 'demo-customized-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={openMenu}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem 
                                            sx={{color: 'primary.main'}} 
                                            onClick={() => {
                                                handleOpenPreview();
                                                handleMenuClose();
                                            }} 
                                            disableRipple
                                        >
                                            <PreviewIcon />
                                            Preview
                                        </MenuItem>
                                        <MenuItem 
                                            sx={{color: 'primary.main'}} 
                                            onClick={() => {
                                                handleOpenForm();
                                                handleMenuClose();
                                            }} 
                                            disableRipple
                                        >
                                            <EditIcon />
                                            Edit
                                        </MenuItem>
                                        <Divider sx={{ my: 0.5 }} />
                                        <MenuItem 
                                            sx={{color: 'error.dark', mt:2}} 
                                            onClick={() => {
                                                handleMenuClose();
                                                handleOpenDelete();
                                            }} 
                                            disableRipple
                                        >
                                        <DeleteIcon/>
                                            Delete
                                        </MenuItem>
                                    </StyledMenu>
                                <TableCell 
                                    key={column.id} 
                                    align={column.align}
                                    onClick={(e) => {
                                        // use event to set task 
                                        handleMenuClick(e, row.number);
                                    }}
                                >
                                {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                                </React.Fragment>
                            );
                            })}
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>
            <DNCDialog
                openDCNDialog={openDCNDialog}
                setOpenDCNDialog={setOpenDCNDialog}
                formatDate={formatDate}
                DCN={DCN}
            />
            <DeleteDCNModal
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
                DCN={DCN}
                deleteDCN={deleteDCN}
            />
        </>
    );
};