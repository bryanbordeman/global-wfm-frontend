import React from 'react';
import UploaderServices from '../services/Uploader.services'
import ImageUploading from 'react-images-uploading';
import ImageDialog from './ImageDialog';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {  CardActionArea, CardActions } from '@mui/material';
import { Stack, IconButton } from '@mui/material';
import  Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

export default function AddAttachments(props){
    const { setIsLoading, token, handleOpenSnackbar } = props;
    const { editing } = props;
    const { values, setValues } = props;
    const [ images, setImages ] = React.useState([]);
    const [ image, setImage ] = React.useState(null);
    const [ imageIndex, setImageIndex ] = React.useState(null);
    const [ openImageDialog, setOpenImageDialog] = React.useState(false);

    React.useLayoutEffect(() => {
        if (editing) {
            if (values && values.attachments) {
                const newImages = values.attachments.map((i) => i.document);
                setImages((prevImages) => {
                    if (Array.isArray(prevImages)) {
                        // Use a Set to track unique images
                        const uniqueImages = new Set([...prevImages, ...newImages]);
                        return [...uniqueImages];
                    } else {
                        // Initialize with a Set if prevImages is not an array
                        return [...newImages];
                    }
                });
            }
        }
    }, [editing]);
    
    
    const handleOpenImageDialog = (image, index) => {
        setImage(image);
        setImageIndex(index + 1);
        setOpenImageDialog(true);
    };

    const onChange = (imageList, addUpdateIndex) => {
        // Create a copy of the current images state for comparison
        const prevImages = [...images];
    
        // Initialize arrays to store added, deleted, and edited images
        let addedImage = '';
        let editedImage = '';
        const deletedImages = [];        

        if (prevImages.length < imageList.length){
            //* this works
            addedImage = imageList[addUpdateIndex]
        } else {
            //* this works
            editedImage = imageList[addUpdateIndex]
        }
        if (addUpdateIndex === undefined) {
            //* this works
            prevImages.forEach((prevImage) => {
                if (!imageList.includes(prevImage)) {
                    deletedImages.push(prevImage);
                }
            });
        }
        if (addedImage) {
            // console.log("Images added:", addedImage);
            createDropbox(addedImage);
        }
        if (deletedImages.length > 0 || addUpdateIndex === undefined) {
            const isAll = deletedImages.length > 1;
            deletedImages.map((img) => {
                values.attachments.map((attachment) => {
                    if(attachment.title === removeFileExtension(img.file.name)) {
                        deleteDropbox(attachment.id, isAll);
                    }})
            })
            if (isAll) {
                const updatedValues = {
                    ...values,
                    attachments: []
                };
                setValues(updatedValues);
            }
        }
        if (editedImage) {
            let oldImage = prevImages[addUpdateIndex]
            values.attachments.map((attachment) => {
                if(attachment.document === oldImage) {
                    oldImage = attachment;
                }})
            updateDropbox(oldImage, editedImage)
        }
        // Update the images state
        setImages(imageList);
    };
    
    const removeFileExtension = (fileName) => {
        // Split the fileName by the dot (.) character
        const parts = fileName.split('.');
        // Check if there is more than one part (i.e., there is an extension)
        if (parts.length > 1) {
          // Remove the last part (the extension) and join the rest
            parts.pop();
            return parts.join('.');
        } else {
          // No extension found, return the original fileName
            return fileName;
        }
    };
    const createDropbox = (data) => {
        setIsLoading(true);
        const cleanData = {title: '', document: ''}

        //* this is title var
        cleanData.title = removeFileExtension(data.file.name)

        //*this is document
        cleanData.document = data.data_url
        
        UploaderServices.createDropbox(cleanData, token)
            .then(response => {
                const newImage = response.data
                const updatedValues = {
                    ...values,
                    attachments: [newImage, ...values.attachments]
                };
                setValues(updatedValues);
                handleOpenSnackbar('success', 'Attachment added to the database');
            })
            .catch(e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something went wrong. Please try again.');
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const deleteDropbox = (id, isAll) => {
        setIsLoading(true);    
        UploaderServices.deleteDropbox(id, token)
            .then(response => {
                if (isAll) {
                    const updatedValues = {
                        ...values,
                        attachments: []
                    };
                    setValues(updatedValues);
                } else {
                    // Filter out the attachment with the specified id
                    const updatedAttachments = values.attachments.filter(attachment => attachment.id !== id);
            
                    const updatedValues = {
                        ...values,
                        attachments: updatedAttachments,
                    };
                    
                    setValues(updatedValues);
                };
                handleOpenSnackbar('warning', 'Attachment deleted from the database');
            })
            .catch(e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something went wrong. Please try again.');
            })
            .finally(() => {
                setIsLoading(false);
            });
        };
        

    const updateDropbox = (oldImage, newImage) => {
        setIsLoading(true);
        const cleanData = {title: '', document: ''}

        //* this is title var
        cleanData.title = removeFileExtension(newImage.file.name)

        //*this is document
        cleanData.document = newImage.data_url

        UploaderServices.updateDropbox(oldImage.id, cleanData, token)
            .then(response => {
                const updatedImage = response.data;
                // Update the attachments array with the updated image
                const updatedAttachments = values.attachments.map((attachment) => {
                    if (attachment.id === oldImage.id) {
                    return updatedImage;
                    } else {
                    return attachment;
                    }
                });

                const updatedValues = {
                    ...values,
                    attachments: updatedAttachments,
                };

                setValues(updatedValues);
                handleOpenSnackbar('success', 'Attachment updated in the database');
            })
            .catch(e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something went wrong. Please try again.');
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <div>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                dataURLKey="data_url"
            >
                {({
                imageList,
                onImageRemoveAll,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
                }) => (
                <div>
                    <Stack 
                        spacing={2}
                    >   
                        <Button 
                            fullWidth
                            variant="contained" 
                            disableElevation
                            style={isDragging ? { color: 'red' } : undefined}
                            color='primary'
                            onClick={onImageUpload}
                            {...dragProps}
                            startIcon={<PhotoCamera />}
                            >
                        Attach Images
                        </Button>
                        <Button 
                            fullWidth
                            variant="outlined" 
                            color='error'
                            onClick={() => {
                                onImageRemoveAll();
                            }}
                            startIcon={<DeleteIcon />}
                        >Remove all images
                        </Button>
                    </Stack>
                    {imageList.map((image, index) => (
                        <Card key={index} sx={{ marginTop: '20px', width: 143 }}>
                            <CardActionArea 
                                onClick={() => handleOpenImageDialog (image['data_url']? image['data_url'] : image, index)}
                            >
                                <CardMedia
                                component="img"
                                image={image['data_url']? image['data_url'] : image}
                                alt=""
                                name='preview_image'
                                />
                            </CardActionArea>
                            <CardActions>
                            <Stack direction="row" spacing={2}> 
                                    <IconButton 
                                        variant='outlined'
                                        color='primary' 
                                        aria-label="delete"
                                        onClick={() => onImageUpdate(index)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <Divider orientation="vertical" variant="middle" flexItem />
                                    <IconButton 
                                        color='error' 
                                        aria-label="delete"
                                        onClick={() => {
                                            onImageRemove(index);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            </CardActions>
                            </Card>
                        ))}
                </div>
                )}
            </ImageUploading>
            <ImageDialog
                image={image}
                id={imageIndex}
                open={openImageDialog}
                setOpen={setOpenImageDialog}
            />
        </div>
    );
};