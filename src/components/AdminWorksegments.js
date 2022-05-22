import * as React from 'react';
import WorksegmentDataService from '../services/Worksegment.services'
import moment from 'moment';
import { Button } from '@mui/material';


function AdminWorksegments(props){
    const { user, token } = props

    const [ worksegments, setWorksegments ] = React.useState([]);
    const [ isoWeek, setIsoWeek ] = React.useState(moment(new Date()).format('GGGG[W]WW'));
    const [ error, setError ] = React.useState(false)

    const retrieveWorksegments = () => {
        WorksegmentDataService.adminGetWeek(token, isoWeek)
        .then(response => {
            setWorksegments(response.data);
            console.log(response.data)
        })
        .catch( e => {
            console.log(e);
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000);
        })
    };

    return (
        <div>
            Admin Dashboard
            <Button variant='outlined' onClick={retrieveWorksegments}>Get Segments</Button>
        </div>
    )
};

export default AdminWorksegments;