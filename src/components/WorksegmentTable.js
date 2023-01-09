import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WorksegmentDataService from '../services/Worksegment.services';
import moment from 'moment';
import Loading from './Loading';
import WeekPicker from './WeekPicker';
import { v4 as uuidv4 } from 'uuid';

function createData(name, regular, overtime, travel, total_duration, summary) {
    return {
        name,
        regular,
        overtime,
        travel,
        total_duration,
        summary
    };
    }

function Row(props) {
    const { row, isoWeek } = props;
    const [ open, setOpen ] = React.useState(false);
    
    return (
        <React.Fragment>
            <TableRow  hover onClick={() => setOpen(!open)}>
                <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                {row.name}
                </TableCell>
                <TableCell align="left">{row.regular}</TableCell>
                <TableCell align="left">{row.overtime}</TableCell>
                <TableCell align="left">{row.travel}</TableCell>
                <TableCell align="left">{row.total_duration}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: 0 }} colSpan={9}>
                <Collapse in={open} timeout="auto" unmountOnExit >
                    <Box component={Paper} elevation={1} sx={{ margin: 1, padding: 2 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        {`${isoWeek} Summary`}
                    </Typography>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                        <TableRow>
                        <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Project</TableCell>
                            <TableCell align="left">Type</TableCell>
                            <TableCell align="left">Start Time</TableCell>
                            <TableCell align="left">End Time</TableCell>
                            <TableCell align="left">Travel</TableCell>
                            <TableCell align="left">Lunch</TableCell>
                            <TableCell align="left">Total Hours</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {row.summary.map((summaryRow) => (
                            <TableRow hover key={uuidv4()} >
                            <TableCell component="th" scope="row">
                                {summaryRow.approved}
                            </TableCell>
                            <TableCell align="left">{summaryRow.date}</TableCell>
                            <TableCell align="left">{summaryRow.project}</TableCell>
                            <TableCell align="left">{summaryRow.type}</TableCell>
                            <TableCell align="left">{summaryRow.start_time}</TableCell>
                            <TableCell align="left">{summaryRow.end_time}</TableCell>
                            <TableCell align="left">{summaryRow.travel}</TableCell>
                            <TableCell align="left">{summaryRow.lunch}</TableCell>
                            <TableCell align="left">{summaryRow.total}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default function WorksegmentTable(props) {
    const { user, token, handleOpenSnackbar} = props
    const [ isLoading, setIsLoading ] = React.useState(true);
    const [ totals, setTotals ] = React.useState([]);
    const [ worksegments, setWorksegments ] = React.useState([]);
    const [ isoWeek, setIsoWeek ] = React.useState(moment(new Date()).format('GGGG[W]WW'));
    const didMount = React.useRef(false);

    React.useEffect(() => {
        // if (didMount.current) {
            retrieveWorksegments();
        // } else {
        //     didMount.current = true;
        // }
    },[isoWeek]);

    React.useEffect(() => {
        if (didMount.current) {
            recieveTotals();
        } else {
            didMount.current = true;
        }
    },[worksegments]);

    const recieveTotals = () => {
        // get total hours for all users in isoweek.
        const isAdmin = user.is_staff ? true : false;
        setIsLoading(true);
        WorksegmentDataService.getTotals(token, isoWeek)
            .then(response => {
                    const data = response.data
                    const rows = []
                if(isAdmin){
                    data.map((d) => {
                        rows.push(createData(d['user_name'], d['regular'], d['overtime'], d['travel'], d['total_duration'], []))
                    })
                }else{
                    data.map((d) => {
                        if(d.user_id == user.id){
                            rows.push(createData(d['user_name'], d['regular'], d['overtime'], d['travel'], d['total_duration'], []))
                        }
                    })
                }
                    rows.map((r) => {
                        worksegments.map((w) => {
                            if(`${w.user.first_name} ${w.user.last_name}` === r.name){
                                let number =''
                                if(w.project){number = w.project.number}
                                if(w.service){number = w.service.number}
                                if(w.hse){number = w.hse.number}
                                if(w.quote){number = w.quote.number}
                                r.summary.push({
                                    approved: w.is_approved? 'Approved' : 'Pending',
                                    date: moment(w.date).format('dddd'),
                                    project: number,
                                    type: w.segment_type.name.charAt(0).toUpperCase() + w.segment_type.name.slice(1),
                                    start_time: moment(getDateFromHours(w.start_time)).format('LT'),
                                    end_time: moment(getDateFromHours(w.end_time)).format('LT'),
                                    travel: w.travel_duration,
                                    lunch: w.lunch? 'Yes' : 'No',
                                    total: w.duration
                                });
                            };
                        }); 
                    });
                    setTotals(rows);
            })
            .catch(e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const retrieveWorksegments = () => {
        // get segments from API
        const isAdmin = user.is_staff ? true : false;
        if(isAdmin){
            setIsLoading(true);
            WorksegmentDataService.adminGetWeek(props.token, isoWeek)
                .then(response => {
                    setWorksegments(response.data);
                })
                .catch( e => {
                    console.log(e);
                    handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }else{
            setIsLoading(true);
            WorksegmentDataService.getWeek(props.token, isoWeek)
                .then(response => {
                    setWorksegments(response.data);
                })
                .catch( e => {
                    console.log(e);
                    handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    };

    function getDateFromHours(time) {
        time = time.split(':');
        let now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
    };
    
    const getIsoWeek = (week) => {
        setIsoWeek(week)
    };
    return (
        <div style={{width: '100%', marginTop: '20px'}}>
            <WeekPicker
                getIsoWeek={getIsoWeek}
            />
        <TableContainer component={Box} sx={{mt:3}}>
        <Table stickyHeader size="small" aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell align="left">Employee</TableCell>
                <TableCell align="left">Regular</TableCell>
                <TableCell align="left">Overtime</TableCell>
                <TableCell align="left">Travel</TableCell>
                <TableCell align="left">Total Hours</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            
            {totals.map((row) => (
                <Row 
                    key={uuidv4()} 
                    row={row} 
                    isoWeek={isoWeek}
                />
            ))}
            </TableBody>
        </Table>
        <Loading
            open={isLoading}
        />
        </TableContainer>
        </div>
    );
};