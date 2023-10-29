import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, Typography, IconButton } from '@mui/material';
import  Divider from '@mui/material/Divider';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import Transition from './DialogTransistion'

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {  CardActionArea } from '@mui/material';
import ImageDialog from './ImageDialog';


export default function TaskDialog(props) {
    const { task } = props;
    const { setOpenDelete } = props;
    const { created_by } = props.task;
    const { editing, setEditing, handleOpenTaskForm } = props;
    const { setOpenTaskDialog, openTaskDialog } = props;

    const [createdBy, setCreatedBy] = React.useState();
    
    const [ images, setImages ] = React.useState([]);
    const [ image, setImage ] = React.useState(null);
    const [ imageIndex, setImageIndex ] = React.useState(null);
    const [ openImageDialog, setOpenImageDialog] = React.useState(false);

    React.useLayoutEffect(()=>{
        if(created_by)
        {setCreatedBy(`${created_by.first_name} ${created_by.last_name}`)
        }else{
            setCreatedBy(`${props.user.first_name} ${props.user.last_name}`)
        }
    },[task]);

    React.useEffect(()=>{
        if (task && task.attachments && openTaskDialog) {
            const newImages = task.attachments.map((i) => i.document);
            setImages((prevImages) => {
                if (Array.isArray(prevImages)) {
                    return [...prevImages, ...newImages];
                } else {
                    return [...newImages];
                }
            });
        };
    },[openTaskDialog]);


    const handleClose = () => {
        setOpenTaskDialog(false);
        setEditing(false);
        setImages([]);
    };

    const handleDelete = () => {
        setOpenDelete(true);
        setOpenTaskDialog(false);
    };

    const handleOpenImageDialog = (image, index) => {
        setImage(image);
        setImageIndex(index + 1);
        setOpenImageDialog(true);
    };

    let number = ''
    let name = ''
    // set number based on type
    if(task.project){
        number = `Project: ${task.project.number}`
        name = `Project Name: ${task.project.name}`
    }
    if(task.service){
        number = `Service: ${task.service.number}`
        name = `Service Name: ${task.service.name}`
    }
    if(task.hse){
        number = `HSE: ${task.hse.number}`
        name = `HSE Name: ${task.hse.name}`
    }
    if(task.quote){
        number = `Quote: ${task.quote.number}`
        name = `Quote Name: ${task.quote.name}`
        
    }

    return (
        <div>
            <Dialog 
                TransitionComponent={Transition}
                fullWidth 
                fullScreen
                open={openTaskDialog} 
                onClose={handleClose}
                scroll={'paper'}
                
                >
            <DialogTitle>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    {`${task.title}`}
                </div>
                
                {editing ? 
                <div>
                <IconButton 
                    edge="end" 
                    color="primary"
                    aria-label="edit"
                    onClick={ () => {
                        setOpenTaskDialog(false);
                        handleOpenTaskForm();
                    }}
                        >
                    <EditIcon />
                </IconButton>
                </div> 
                :
                <div>
                <IconButton 
                    edge="end" 
                    color="error"
                    aria-label="delete"
                    onClick={ () => {
                        handleDelete()}}
                        >
                    <DeleteOutlineIcon />
                </IconButton>
                </div> 
                }
                </div>
            </DialogTitle>
                <Divider/>
                <DialogContent>
                    <Typography variant="body1" style={{whiteSpace: 'pre-line'}}>
                        {`${task.notes}`}
                    </Typography>
                    {images.length > 0 && <Divider style={{marginTop: '20px'}}/>}
                    {images && images.map((image, index) => (
                        <Card key={index} sx={{ marginTop: '20px', width: 143 }}>
                            <CardActionArea 
                                onClick={() => handleOpenImageDialog (image, index)}
                            >
                                <CardMedia
                                component="img"
                                image={image}
                                alt=""
                                name='preview_image'
                                />
                            </CardActionArea>
                        </Card>
                        ))}
                </DialogContent>
                <Divider/>
                    <DialogActions>
                    <DialogContent sx={{pt:0, pb:0}}>
                    <Stack direction="column" spacing={0}>
                        <Typography variant="caption" color={'primary'}>
                            {number}
                        </Typography>
                        <Typography variant="caption" color={'primary'}>
                            {name}
                        </Typography>
                        <Typography variant="caption" color={'primary'}>
                            Created By: {createdBy}
                        </Typography>
                        {editing?
                        <Typography variant="caption" color={'error'}>
                            Last Updated: {moment(task.updated).calendar()}
                        </Typography>
                        :
                        <Typography variant="caption" color={'error'}>
                            Completed: {moment(task.completed).calendar()}
                        </Typography>
                        }
                    </Stack>
                    </DialogContent>
                    </DialogActions>
                    <Divider/>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </DialogActions>
            </Dialog>
            <ImageDialog
                image={image}
                id={imageIndex}
                open={openImageDialog}
                setOpen={setOpenImageDialog}
            />
        </div>
    );
};