import React, { useState, useEffect } from 'react';
import WorksegmentDataService from '../services/Worksegment.services'
import { Container, Typography, CardActions, Button, Card, CardContent, Chip } from '@mui/material';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CheckIcon from '@mui/icons-material/Check';
import WeekPicker from '../components/WeekPicker'
// import { Link } from 'react-router-dom';
// import Card from 'react-bootstrap/Card';
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
// import Alert from 'react-bootstrap/Alert';
import moment from 'moment';


function WorksegmentList(props) {
    const [ worksegments, setWorksegments ] = useState([]);
    const [isoWeek, setIsoWeek] = React.useState(moment(new Date()).format('GGGG[W]WW'));

    useEffect(() => {
        retrieveWorksegments();
    }, [props.token]);

    const retrieveWorksegments = () => {
        WorksegmentDataService.getAll(props.token)
        .then(response => {
            setWorksegments(response.data);
        })
        .catch( e => {
            console.log(e)
        })
    };

    const deleteWorksegment = (segmentId) => {
        WorksegmentDataService.deleteWorksegment(segmentId, props.token)
        .then(response => {
            retrieveWorksegments();
        })
        .catch( e => {
            console.log(e)
        });
    };

    const approveWorksegment = (segmentId) => {
        WorksegmentDataService.approveWorksegment(segmentId, props.token)
        .then(response => {
            retrieveWorksegments();
            console.log("approve segment", segmentId)
        })
        .catch( e => {
            console.log(e)
        });
    };

    const getIsoWeek = (week) => {
        setIsoWeek(week)
    }


    return ( 
        <Container>
            <div  style={{marginBottom: '20px', marginTop: '20px' }}>
            <WeekPicker 
                getIsoWeek={getIsoWeek}
            />
            <h1>{isoWeek}</h1>
            </div>
            {worksegments.map((segment) => {
                return (
                    <Card 
                        key={segment.id}
                        variant='outlined'
                        sx={{ minWidth: 275, marginBottom: '20px' }}
                    >                    
                        <CardContent>
                            <Chip 
                                color={`${segment.is_approved ? 'success' : 'primary'}`}
                                sx={{marginBottom: '10px'}}
                                icon={segment.is_approved ? <CheckIcon /> : <QueryBuilderIcon/>} 
                                label={`${segment.duration} ${segment.duration > 1 ? 'Hrs' : 'Hr'}`} 
                                variant="outlined" 
                            />
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Date: {moment(segment.date).format("ddd, MMMM Do YYYY")}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {moment(new Date(segment.date + ' ' + segment.start_time)).format('LT')} -  
                            {moment(new Date(segment.date + ' ' + segment.end_time)).format('LT')}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Project Number: {segment.project}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Travel: {segment.travel_duration}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Status: {segment.is_approved ? 'Approved' : 'Pending'}
                            </Typography>
                        </CardContent>
                        {!segment.is_approved ? 
                        <CardActions>
                            <Button size="small" variant='outlined'>Edit</Button>
                            <Button 
                                size="small" 
                                color='error' 
                                variant='outlined'
                                onClick={() => {deleteWorksegment(segment.id)}}
                            >Delete</Button>
                        </CardActions>
                        : ''}
                    </Card>
                    )
            })}
        </Container>

        // <Container>
        //     {props.token == null || props.token === '' ? (
        //     <Alert variant='warning'>
        //         You are not logged in. Please 
        //         <Link to={'/login'}> Login </Link>
        //         to see your todos.
        //     </Alert>
        //     ) : (
        //     <div>
        //         <Link to={"/todos/create"}>
        //             <Button variant='outline-info' className="mb-3">
        //                 Add Todo
        //             </Button>

        //         </Link>
        //     {todos.map((todo) => {
        //         return (
        //             <Card key={todo.id} className="mb-3">
        //                 <Card.Body>
        //                     <div className={`${todo.completed ? "text-decoration-line-through" : ''}`}>
        //                         <Card.Title>{todo.title}</Card.Title>
        //                         <Card.Text><b>Memo:</b> {todo.memo}</Card.Text>
        //                         <Card.Text className='mb-4'>Date created: {moment(todo.created).format("Do MMMM YYYY")}</Card.Text>
        //                     </div>
        //                     {!todo.commpleted && 
        //                         <Link to={{
        //                             pathname: '/todos/' + 'todo.id',
        //                             state: {
        //                                 currentTodo: todo
        //                             }
        //                         }}>
        //                             <Button variant='outline-info' className='me-2'>
        //                                 Edit
        //                             </Button>
        //                         </Link>
        //                     }
        //                     <Button variant='outline-danger' onClick={() => deleteTodo(todo.id)}
        //                     className="me-2">
        //                         Delete
        //                     </Button>
        //                     <Button variant="outline-success" onClick={() => completeTodo(todo.id)}>
        //                         Complete
        //                     </Button>
        //                 </Card.Body>
        //             </Card>
        //         )
        //     })}
        //     </div>
        //     )}
        // </Container>
    );
}

export default WorksegmentList;