import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, Stack, Divider } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '250px',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    };

    export default function ContactModal(props) {

    const { open, handleContactOpen } = props
    const { project, contact } = props
    const [ phone, setPhone ] = React.useState([])
    const [ company, setCompany ] = React.useState('')

    // console.log(contact.phone.map(number =>(number.phone_number, number.phone_type)))
    React.useEffect(() => {
        if(contact.phone){
            setPhone(contact.phone.map(number =>([number.phone_number, number.phone_type])))
        }else{
            setPhone([])
        }
    },[contact])

    React.useEffect(() => {
        if(contact.company){
            setCompany(contact.company.name)
        }else{
            setCompany('')
        }
    },[contact])


    const handleClose = () => handleContactOpen(false);

    return (
        <div>
            {project.number ?
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="contact-name"
                aria-describedby="contact-information"
            >
                <Box sx={style}>
                    <Stack direction="row" spacing={1}>
                        <Avatar 
                            alt={`${contact.name}`}
                            src="/broken-image.jpg"
                            />
                        <Typography id="contact-name" variant="h5" component="h2">
                            {contact.name}
                        </Typography>
                    </Stack>
                    <Divider sx={{mt:1}}/>
                    <Typography id="contact-information" variant="body2" sx={{ mt: 1 }}>
                        <>
                        {company? <> {company} <br/></> : ''}
                        {phone ? phone.map((number, key) => (<React.Fragment key={key}> <a href={`tel:${number[0]}`}>{number[0]}</a>{' '}{number[1]}<br/></React.Fragment>)) : ''}
                        {contact.fax ? <>{`${contact.fax} Fax`}<br/></> : ''}
                        {contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a>: ''}
                        </>
                    </Typography>
                </Box>
            </Modal> 
            : ''}
        </div>
    );
}
