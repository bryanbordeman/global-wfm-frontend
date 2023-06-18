import React from "react";

const DocIframe = ({ source }) => {

if (!source) {
    return <div>Loading...</div>;
};

const src = source;

return (
    <div 
        style={{overflow: "auto!important",
                "-webkit-overflow-scrolling": "touch!important",
                width: '100%',
                height: '100%'
                }}>
        <iframe 
            src={"https://docs.google.com/viewer?url=" + src + "&embedded=true"}
            title="file"
            width="100%"
            height="100%"
        ></iframe>
    </div>
    );
};

export default DocIframe;