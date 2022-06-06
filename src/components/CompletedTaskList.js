import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, ListItemButton } from '@mui/material';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function SimpleAccordion() {
    return (
        <div style={{marginRight: '8px', marginLeft: '8px', marginTop:0}}>
        <Divider />
        <Accordion  elevation={0}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography>Completed Task (45)</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{p:0}}>
                <List sx={{ width: '100%', m: 0, p: 0}}>
                    
                    <ListItem 
                        sx={{ m: 0, p: 0}}
                        secondaryAction={
                            <IconButton
                                edge="end" 
                                color='error'
                                >
                                <DeleteOutlineIcon/>
                            </IconButton>
                            }
                            disablePadding>
                        <ListItemButton>
                            <IconButton aria-label="delete">
                                <CheckIcon />
                            </IconButton>
                            <ListItemText sx={{textDecoration: "line-through",}}
                                primary={`12222 | Drawing`}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
            </AccordionDetails>
        </Accordion>
        </div>
    );
    }
