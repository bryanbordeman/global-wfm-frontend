import * as React from 'react';
import ExpenseDataService from '../services/Expense.services'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ExpenseCard from '../components/ExpenseCard';
import ExpenseSummary from '../components/ExpenseSummary';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import { makeStyles } from '@mui/styles';
import { SERVER } from "../services/SERVER";

const useStyles = makeStyles({
    tabpanel: {
        // position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)'
        // width: '50%',
        // minWidth: '300px',
        // padding: 'auto',
        // margin: 'auto',
        // textAlign: 'center'
    }
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 0, pt: 3, mb:0, pb:0}}>
            {children}
            </Box>
        )}
        </div>
    );
    }

    TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    };

export default function ExpaneseTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [ expenses, setExpenses ] = React.useState(initialExpenses)
    const { month, user, token, handleOpenSnackbar } = props

    React.useEffect(() => {
        retrieveExpenses()
    },[])

    const retrieveExpenses = () => {
        ExpenseDataService.getAll(token)
        .then(response => {
            setExpenses(response.data);
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                >   
                    <Tab sx={{width: '50%'}} icon={<CreditCardIcon />} label="Company Card" />
                    <Tab sx={{width: '50%'}} icon={<PaidOutlinedIcon />}label="Reimbursable" />
                    <Tab sx={{width: '50%'}} icon={<DirectionsCarFilledOutlinedIcon />}label="Miles" />
                </Tabs>
            </Box>
                <TabPanel value={value} index={0} className={ classes.tabpanel }>
                    <ExpenseSummary
                        month={month}
                        value={'Company Card'}/>
                    {expenses.map(expense => (
                        <ExpenseCard 
                            expense={expense}
                            user={user}
                            value={'Company Card'}/>
                    ))}
                </TabPanel>
                <TabPanel value={value} index={1} className={ classes.tabpanel }>
                    <ExpenseSummary
                        month={month}
                        value={'Reimbursable'}/>
                    {expenses.map(expense => (
                        <ExpenseCard 
                            expense={expense}
                            user={user}
                            value={'Company Card'}/>
                    ))}
                </TabPanel>
                <TabPanel value={value} index={2} className={ classes.tabpanel }>
                    <ExpenseSummary
                        month={month}
                        value={'Miles'}/>
                    {expenses.map(expense => (
                        <ExpenseCard 
                            expense={expense}
                            user={user}
                            value={'Company Card'}/>
                    ))}
                </TabPanel>
        </Box>
    );
}

const initialExpenses = [
    {
        "id": 1,
        "receipt_pic": `${SERVER}/media/None/6756741_14304158430497_rId5.jpeg`,
        "merchant": "Lowes",
        "price": 63.51,
        "notes": "",
        "is_reimbursable": false,
        "is_approved": false,
        "date_purchased": "2022-06-17",
        "date_created": "2022-06-17",
        "user": {
            "id": 1,
            "password": "pbkdf2_sha256$320000$hQCF672CjQ5VgfmQcwA02z$/TQXapw74utdBKGLIl1+JJ+AoYMncLTEhun4Z5TasXE=",
            "last_login": "2022-06-17T04:16:01.346839-04:00",
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
            "id": 2,
            "is_active": true,
            "number": "77777",
            "name": "Test Project",
            "prevailing_rate": true,
            "travel_job": false,
            "notes": "",
            "project_category": 1,
            "project_type": 1,
            "address": 1,
            "customer_company": 1,
            "contact": [
                2,
                3
            ]
        }
    },
    {
        "id": 2,
        "receipt_pic": `${SERVER}/media/None/sample-receipt.jpg`,
        "merchant": "Home Deport",
        "price": 15.01,
        "notes": "",
        "is_reimbursable": false,
        "is_approved": false,
        "date_purchased": "2022-06-17",
        "date_created": "2022-06-17",
        "user": {
            "id": 1,
            "password": "pbkdf2_sha256$320000$hQCF672CjQ5VgfmQcwA02z$/TQXapw74utdBKGLIl1+JJ+AoYMncLTEhun4Z5TasXE=",
            "last_login": "2022-06-17T04:16:01.346839-04:00",
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
            "id": 17,
            "is_active": false,
            "number": "44445",
            "name": "dscdsc",
            "prevailing_rate": true,
            "travel_job": false,
            "notes": "",
            "project_category": 1,
            "project_type": 1,
            "address": 1,
            "customer_company": 1,
            "contact": [
                2
            ]
        }
    }
]