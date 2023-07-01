import React from "react";

const DocIframe = ({ source }) => {

if (!source) {
    return <div>Loading...</div>;
};

const src = source;

return (
    <div 
        style={{overflow: "auto!important",
                WebkitOverflowScrolling: "touch!important",
                width: '100%',
                height: '100%'
                }}>
        <iframe
            src={`https://docs.google.com/viewerng/viewer?url=${encodeURIComponent(src)}&embedded=true`}
            title="file"
            width="100%"
            height="100%"
        ></iframe>


    </div>
    );
};

export default DocIframe;