import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const DocIframe = ({ source }) => {
    const [loading, setLoading] = useState(true);
    const [showIframe, setShowIframe] = useState(false);
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    useEffect(() => {
        const delay = 1000;  // Simulate a delay of 1 seconds
        const timeout = setTimeout(() => {
            setLoading(false);
            setShowIframe(true);
        }, delay);

        return () => clearTimeout(timeout);
    }, []);

    const handleIframeLoad = () => {
        setIsContentLoaded(true);
    };

    if (loading && !isContentLoaded) {
        return (
        <div
            style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            }}
        >
            <CircularProgress />
            <Typography variant="h6" gutterBottom>
            Loading...
            </Typography>
        </div>
        );
    }

    if (!showIframe) {
        return null; // Don't render the iframe until the delay is complete
    }

    const src = encodeURIComponent(source);

    return (
        <div style={{ overflow: "auto!important", WebkitOverflowScrolling: "touch!important", width: "100%", height: "100%" }}>
            <iframe
                src={`https://docs.google.com/viewerng/viewer?url=${src}&embedded=true`}
                title="file"
                width="100%"
                height="100%"
                loading="eager"
                onLoad={handleIframeLoad}
            >
            </iframe>
        </div>
        );
    };

export default DocIframe;


