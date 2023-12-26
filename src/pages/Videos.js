import * as React from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { Container } from '@mui/material';
import VideoPlayer from '../components/VideoPlayer'
import "../../node_modules/video-react/dist/video-react.css"; // import css
import VideoServices from '../services/Video.services';
import VideoPicker from '../components/VideoPicker';

function Media(props) {
    const { isLoading, videos } = props;
    const [showSkeleton, setShowSkeleton] = React.useState(isLoading || !videos);

    React.useEffect(() => {
        setShowSkeleton(isLoading || !videos)
    },[isLoading, videos])

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
        >
            {(showSkeleton ? Array.from(new Array(3)) : videos).map((item, index) => (
                <Box key={index} sx={{ width: 300, marginRight: 2, my: 2 }}>
                    {item && !isLoading ? (
                        <VideoPlayer
                            src={item.document}
                            thumbnail={item.thumbnail.document}
                        />
                    ) : (
                        <Skeleton variant="rectangular" width={300} height={118} />
                    )}

                    {item? (
                        <Box sx={{ pr: 2, mt: 1 }}>
                            <Typography variant="body2">
                                {item.title}
                            </Typography>
                            <Typography display="block" variant="caption" color="text.secondary">
                                {item.category.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {`${formatDate(item.created_at)}`}
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    )}
                </Box>
            ))}
        </Grid>
    );
}

// Function to format the date
const formatDate = (date) => {
    const momentDate = moment(date); // If using moment library
    // Example: "3 days ago", "2 months ago", "1 year ago"
    return momentDate.fromNow();
};


export default function Videos(props) {
    const { token, handleOpenSnackbar } = props;
    const [allVideos, setAllVideos] = React.useState(null);
    const [videos, setVideos] = React.useState(null);
    const [categories, setCategories] = React.useState(null);
    const [category, setCategory] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useLayoutEffect(() => {
        retrieveVideos();
    }, [])

    React.useEffect(() => {
        if (allVideos && category) {
            setVideos(allVideos.filter((v) => v.category.id === category.id))
        }

    }, [category])

    const retrieveVideos = () => {
        setIsLoading(true);
        VideoServices.getAll(token)
            .then(response => {
                const data = response.data;
                setAllVideos(data);
                const categorySet = new Set(data.map(item => JSON.stringify(item.category)));
                const uniqueCategories = Array.from(categorySet).map(jsonString => JSON.parse(jsonString));
                setCategories(uniqueCategories);
            })
            .catch(e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            });
    };


    return (
        <Container
            component="span"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100%',
                marginTop: '40px'
            }}
        >
            <Box sx={{ width: '100%' }}>
                {categories && <VideoPicker categories={categories} setCategory={setCategory} />}
            </Box>
            <Box sx={{ overflow: 'hidden' }}>
                {
                    <Media
                        isLoading={isLoading}
                        videos={videos}
                    />
                }
            </Box>
        </Container>
    );
};