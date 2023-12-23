import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import { Stack, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const DrawingDialog = (props) => {
    const { openDrawingDialog, setOpenDrawingDialog } = props;
    const { drawing } = props;

    const pdfData = drawing.document;

    const [loading, setLoading] = useState(true);
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);

    useEffect(() => {
        if(openDrawingDialog){
            // Simulate a delay of 1 second
            const timeout = setTimeout(() => {
                setLoading(false);
                setIsContentLoaded(true);
            }, 2000);

            return () => clearTimeout(timeout);
        }
        
    }, [openDrawingDialog]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);

        // Get dimensions of the first page
        const viewport = document.querySelector('.react-pdf__Page');
        if (viewport) {
            const { width, height } = viewport.getBoundingClientRect();

            // Calculate the scale to fit the page within the view
            const pageWidth = window.innerWidth - 40; // Adjust as needed
            const pageHeight = window.innerHeight - 40; // Adjust as needed
            const scaleToFitWidth = pageWidth / width;
            const scaleToFitHeight = pageHeight / height;
            const fitScale = Math.min(scaleToFitWidth, scaleToFitHeight, 1.0);
            setScale(fitScale);
        }
    };

    const handleNextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    const handleZoomIn = () => {
        setScale(scale + 0.2); // You can adjust the increment as needed
    };

    const handleZoomOut = () => {
        setScale(Math.max(scale - 0.2, 0.2)); // You can adjust the decrement as needed
    };

    const handleClose = () => {
        setOpenDrawingDialog(false);
        setLoading(true);
        setIsContentLoaded(false);
        setNumPages(null);
        setPageNumber(1);
    };

    const pdfUrl = pdfData;

    return (
        <div>
            <Dialog fullWidth fullScreen open={openDrawingDialog} onClose={handleClose} scroll={'paper'}>
                <DialogTitle>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Stack>
                            <Typography variant="h6">
                                {drawing.title}
                            </Typography>
                            <Typography variant="subtitle1">
                                Page {pageNumber} of {numPages}
                            </Typography>
                        </Stack>
                        <div>
                            <IconButton
                                edge="end"
                                aria-label="close"
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </div>
                </DialogTitle>
                <Divider />
                {loading && !isContentLoaded ?
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100vh',
                        }}
                    >
                        <CircularProgress />
                        <Typography variant="h6" gutterBottom>
                            Loading...
                        </Typography>
                    </div>
                    :
                    <DialogContent sx={{ m: 0, p: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                            <div style={{ overflow: 'auto', WebkitOverflowScrolling: 'touch', width: '100%', height: '80vh' }}>
                                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} loading={<CircularProgress />}>
                                    <Page pageNumber={pageNumber} scale={scale} />
                                </Document>
                            </div>
                        </div>
                    </DialogContent>
                }
                <DialogActions>
                    <div style={{ width: '100%' }}>
                        <Stack
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                            spacing={3}
                        >

                            <Stack direction="row" spacing={3}>
                                <IconButton
                                    style={{ border: '2px solid currentColor', borderRadius: '50%' }}
                                    size="medium"
                                    color="primary"
                                    disabled={pageNumber <= 1}
                                    edge="end"
                                    aria-label="back"
                                    onClick={handlePreviousPage}
                                >
                                    <ArrowBackIosNewIcon />
                                </IconButton>
                                <IconButton
                                    style={{ border: '2px solid currentColor', borderRadius: '50%' }}
                                    size="medium"
                                    color="primary"
                                    disabled={pageNumber === numPages}
                                    edge="end"
                                    aria-label="forward"
                                    onClick={handleNextPage}
                                >
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </Stack>
                            <Stack direction="row" spacing={3}>
                                <IconButton
                                    style={{ border: '2px solid currentColor', borderRadius: '50%' }}
                                    size="medium"
                                    color="primary"
                                    edge="end"
                                    aria-label="zoom-out"
                                    onClick={handleZoomOut}
                                >
                                    <ZoomOutIcon />
                                </IconButton>
                                <IconButton
                                    style={{ border: '2px solid currentColor', borderRadius: '50%' }}
                                    size="medium"
                                    color="primary"
                                    edge="end"
                                    aria-label="zoom-in"
                                    onClick={handleZoomIn}
                                >
                                    <ZoomInIcon />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DrawingDialog;
