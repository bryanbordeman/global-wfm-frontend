import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, Stack, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from '@mui/material/Link';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '325px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    };

export default function ContactModal(props) {
    const { open, setOpen, company, contact, setContact, phones, isLoading } = props

    const handleClose = () => {
        setContact('');
        setOpen(!open);
    };

    return (
        <div>
            {contact && !isLoading?
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="contact-name"
                aria-describedby="contact-information"
            >
                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                        >
                        <CloseIcon />
                    </IconButton>
                    <Stack direction="row" spacing={1}>
                        <Avatar 
                            alt={`${contact.name}`}
                            src="/broken-image.jpg"
                            />
                        <Stack>
                            <Typography style={{ wordWrap: "break-word", maxWidth:'200px' }} id="contact-name" variant="h5" component="h5">
                                {contact.name}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: 14 }} color="text.secondary">
                                {contact.job_title}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Divider sx={{mt:1}}/>
                    <Typography id="contact-information" variant="subtitle1" sx={{ mt: 1 }}>
                        <>
                        {company? <> {company.name} <br/></> : ''}
                        </>
                    </Typography>
                    <Divider sx={{mt:1}}/>
                    <Typography id="contact-information" variant="body2" sx={{ mt: 2 }}>
                        <>
                        {phones ? phones.map((phone, key) => (<React.Fragment key={key}> <Link href={`tel:${phone.phone_number}`}>{phone.phone_number}</Link>{` ${phone.phone_type}`}<br/></React.Fragment>)) : ''}
                        </>
                    </Typography>
                    <Typography id="contact-information" variant="body2" sx={{ mt: 2 }}>
                        <>
                        {contact.email ? <Link href={`mailto:${contact.email}`}>{contact.email}</Link>: ''}
                        </>
                    </Typography>
                </Box>
            </Modal> 
            : ''}
        </div>
    );
};
