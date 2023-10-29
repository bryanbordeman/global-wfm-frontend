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
import moment from 'moment';
import WeekPicker from './WeekPicker';
import { v4 as uuidv4 } from 'uuid';

// Define a global style object
const cellOverflowStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  };

function createData(name, regular, overtime, travel, sick, vacation, holiday, total_duration, summary) {
    return {
        name,
        regular,
        overtime,
        travel,
        sick,
        vacation,
        holiday,
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
                <TableCell component="th" scope="row" style={cellOverflowStyle}>
                {row.name}
                </TableCell>
                <TableCell align="left" style={cellOverflowStyle}>{row.regular}</TableCell>
                <TableCell align="left" style={cellOverflowStyle}>{row.overtime}</TableCell>
                <TableCell align="left" style={cellOverflowStyle}>{row.travel}</TableCell>
                <TableCell align="left" style={cellOverflowStyle}>{row.sick}</TableCell>
                <TableCell align="left" style={cellOverflowStyle}>{row.vacation}</TableCell>
                <TableCell align="left" style={cellOverflowStyle}>{row.holiday}</TableCell>
                <TableCell align="left" style={cellOverflowStyle}>{row.total_duration}</TableCell>
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
                        <TableCell align="left" style={cellOverflowStyle}>Status</TableCell>
                            <TableCell align="left" style={cellOverflowStyle}>Date</TableCell>
                            <TableCell align="left" style={cellOverflowStyle}>Project</TableCell>
                            <TableCell align="left" style={cellOverflowStyle}>Type</TableCell>
                            <TableCell align="left" style={cellOverflowStyle}>Start Time</TableCell>
                            <TableCell align="left" style={cellOverflowStyle}>End Time</TableCell>
                            <TableCell align="left" style={cellOverflowStyle}>Travel</TableCell>
                            <TableCell align="left" style={cellOverflowStyle}>Lunch</TableCell>
                            <TableCell align="left" style={cellOverflowStyle}>Total Hours</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {row.summary.map((summaryRow) => (
                            <TableRow hover key={uuidv4()} >
                            <TableCell component="th" scope="row" style={cellOverflowStyle}>{summaryRow.approved}</TableCell>
                            <TableCell align="left" style={cellOverflowStyle}>{summaryRow.date}</TableCell>
                            <TableCell align="left" style={cellOverflowStyle}>{summaryRow.project}</TableCell>
                            <TableCell align="left" style={cellOverflowStyle}>{summaryRow.type}</TableCell>
                            <TableCell align="left" style={cellOverflowStyle}>{summaryRow.start_time}</TableCell>
                            <TableCell align="left" style={cellOverflowStyle}>{summaryRow.end_time}</TableCell>
                            <TableCell align="left" style={cellOverflowStyle}>{summaryRow.travel}</TableCell>
                            <TableCell align="left" style={cellOverflowStyle}>{summaryRow.lunch}</TableCell>
                            <TableCell align="left" style={cellOverflowStyle}>{summaryRow.total}</TableCell>
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
    const { user} = props;

    const { worksegments } = props
    const { PTOsegments } = props;
    const { totals } = props
    const { isoWeek, setIsoWeek } = props

    const [ tableRows, setTableRows ] = React.useState([]); 

    React.useLayoutEffect(() => {
        setTableRows([])
        if(totals && worksegments && isoWeek){
            updateTable();
        }
    },[totals, worksegments, isoWeek, PTOsegments])

    const updateTable = () => {
        // get total hours for all users in isoweek.
        const isAdmin = user.is_staff ? true : false;
        const rows = []
        if(isAdmin){
            totals.map((d) => {
                rows.push(createData(d['user_name'], d['regular'], d['overtime'], d['travel'], d['sick'],d['vacation'],d['holiday'],d['total_duration'], []))
            })
        }else{
            totals.map((d) => {
                if(d.user_id == user.id){
                    rows.push(createData(d['user_name'], d['regular'], d['overtime'], d['travel'], d['sick'],d['vacation'],d['holiday'],d['total_duration'], []))
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
            PTOsegments.map((p) => {
                if(`${p.user.first_name} ${p.user.last_name}` === r.name){
                    r.summary.push({
                        approved: p.is_approved? 'Approved' : 'Pending',
                        date: moment(p.date).format('dddd'),
                        project: '----',
                        type: p.is_paid? p.PTO_type : 'Unpaid',
                        start_time: '----',
                        end_time: '----',
                        travel: '----',
                        lunch: '----',
                        total: p.duration
                    })
                }
            }) 
        });
        setTableRows(rows);
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
        {/* {Object.keys(worksegments).length > 0 || Object.keys(PTOsegments).length > 0?  */}
        <TableContainer component={Box} sx={{mt:3}}>
        <Table stickyHeader size="small" aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell align="left" style={cellOverflowStyle}>Employee</TableCell>
                <TableCell align="left" style={cellOverflowStyle}>Regular</TableCell>
                <TableCell align="left" style={cellOverflowStyle}>Overtime</TableCell>
                <TableCell align="left" style={cellOverflowStyle}>Travel</TableCell>
                <TableCell align="left" style={cellOverflowStyle}>Sick</TableCell>
                <TableCell align="left" style={cellOverflowStyle}>Vacation</TableCell>
                <TableCell align="left" style={cellOverflowStyle}>Holiday</TableCell>
                <TableCell align="left" style={cellOverflowStyle}>Total Hours</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            
            {tableRows.map((row) => (
                <Row 
                    key={uuidv4()} 
                    row={row} 
                    isoWeek={isoWeek}
                />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
    );
};