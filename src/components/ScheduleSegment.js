import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Divider, Stack } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    }));

    export default function RecipeReviewCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card elevation={0} sx={{ width: '100%', border: 1, borderColor: 'grey.600' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h6">
                    11222
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    Sample Project
                </Typography>
            </CardContent>
            <Divider sx={{ml:1, mr:1}}/>
        <CardHeader 
            sx={{mb:0,pb:0}}
            avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                BB
            </Avatar>
            }
            title="Bryan Bordeman"
        />
        <CardHeader 
            sx={{mb:0,pb:0}}
            avatar={
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                JC
            </Avatar>
            }
            title="John Coghlan"
        />
        <CardHeader 
            sx={{mb:0,pb:0}}
            avatar={
            <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                JB
            </Avatar>
            }
            title="Jeff Bryce"
        />
        <Divider sx={{ml:1, mr:1, mt:2}}/>
        <CardActions disableSpacing>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="title">
                    Details
                </Typography>
            </CardContent>
            <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Divider sx={{ml:1, mr:1}}/>
            <CardContent>
                <ListItemText 
                    primary='Vehicle'
                    secondary='Van'
                />
                <ListItemText 
                    primary='Start Time'
                    secondary="6:00 AM"
                />
                <ListItemText 
                    primary='Address'
                    secondary='5 Just Rd Fairfield, NJ 07004'
                />
            </CardContent>
        </Collapse>
        </Card>
    );
}
