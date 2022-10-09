import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    }));

    const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
    ))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));

export default function CompanyContactList(props) {
    const { customers, contacts, quote } = props
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            <Typography variant="body2" sx={{mt:2, mb:2}}>
                Customer(s):
            </Typography>
            {customers.map(customer => (
            <Accordion key={customer.id} expanded={expanded === customer.id} onChange={handleChange(customer.id)}>
                <AccordionSummary aria-controls={`${customer.id}-content`} id={`${customer.id}-header`}>
                <Typography>{customer.name}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{pb:0}}>
                {contacts.map((contact) => {
                    return contact.quotes.includes(quote.id) && contact.company === customer.id? 
                    <div key={contact.id}>
                        <Stack direction="row" spacing={1}>
                            <IconButton color="primary" sx={{mr:1, ml:0, mb:2}}>
                                <LaunchIcon />
                            </IconButton>
                        <div>
                            <Typography variant="body2">
                                {contact.name}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: 14 }} color="text.secondary">
                                {contact.job_title}
                            </Typography>
                        </div>
                        </Stack>
                    </div>
                    :
                    ''
                })}
                </AccordionDetails>
            </Accordion>
            ))}
        </div>
    );
    }
