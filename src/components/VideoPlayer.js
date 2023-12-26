import React from 'react';
import { Player} from 'video-react';

export default function VideoPlayer (props) {
    const { src, thumbnail } = props;
    return (
        <Player
            playsInline
            poster={thumbnail}
            src={src}
        />
    );
};