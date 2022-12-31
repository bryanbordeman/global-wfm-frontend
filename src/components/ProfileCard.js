import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Divider } from '@mui/material';


export default function ProfileCard(props) {
    const { user } = props;

    function stringToColor(string) {
        let hash = 0;
        let i;
        
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        let color = '#';
        
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
            }
        /* eslint-enable no-bitwise */
        
            return color;
        };

    function stringAvatar(name) {
        return {
            sx: {
            bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
            };
        };

return (
    <Card 
        elevation={0}
        sx={{
            my: 1,
            width: '100%',
            maxWidth: '500px',
            border: 0.5,
            borderColor: 'primary.main',
            borderRadius: '16px',
            marginTop: '2rem'
        }}
        >
        <CardContent style={{ marginBottom: 0, paddingBottom: 0, display:'flex', justifyContent:'center' }}>
            <Avatar 
                style={{width: 56, height: 56}}
                {...stringAvatar(`${user.first_name} ${user.last_name}`)} 
            />
        </CardContent>
        <CardContent sx={{ marginTop: 0, paddingTop: 0, textAlign: 'center' }}>
            <Typography sx={{ mb: 1 }}variant="h5" component="div">
                {`${user.first_name} ${user.last_name}`}
            </Typography>
            <Divider sx={{ml: 6, mr: 6 }}/>
            <Typography sx={{ fontSize: 14, mb: 2, mt: 2 }} color="text.secondary" gutterBottom>
                User Name: {user.username}
                <br/>
                Email: {user.email}
                <br/>
            </Typography>
            <Divider sx={{ml: 6, mr: 6 }}/>
            <Typography sx={{ mb: 2, mt:2 }} color="text.primary">
                Permission level: {user.is_staff ? 'Admin' : 'Limited Access'}
            </Typography>
            {user.groups.length > 0?
            <>
            <Divider sx={{ml: 6, mr: 6 }}/>
            <Typography sx={{ mb: 2, mt:2 }} color="text.primary">
                Groups: [{user.groups.map((group, i) => (i < user.groups.length - 1? ` ${group.name},` : ` ${group.name} `))}]
            </Typography>
            </>
            : ''}
        </CardContent>
    </Card>
    );
};
