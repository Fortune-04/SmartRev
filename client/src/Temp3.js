// Temp3 for MainTeacher.js
// In progress

import React, {useState, useEffect} from 'react';
import QuizFinder from './apis/QuizFinder';
import { useHistory } from 'react-router';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

const Temp3 = ({id}) => {

    let history = useHistory();
    const [quizes, setQuizes] = useState([]);

    const createQuiz = () => {
        history.push(`/quiz/create`)
    }
    
    useEffect(() => {
        
        const fetchQuiz = async () => {
            try {
                const response = await QuizFinder.get(`/display/${id}`)
                setQuizes(response.data.data.quiz)
                console.log(response)
              } catch (err) {
                console.log(err)
            }
        }

        if(id){
            fetchQuiz();
        }
        
    },[id])

    console.log(quizes)
    console.log(id)

    return ( 
        <Container size="sm">
            <Typography
                variant="h6" 
                color="textSecondary"
                component="h2"
                gutterBottom
            >
                Quiz List
            </Typography>
            <Divider />
            <Grid container sx={{mt:1}} spacing={2}>
            {quizes && quizes.map(quiz => (
                // <Grid item xs={12} md={6} lg={3} sx={{mt:2}} key={quiz.quizid} >
                <Grid item lg={3} md={3} xs={3}>
                    <Link href={`http://localhost:3000/quiz/edit/${quiz.quizid}`} key={quiz.quizid} underline="none">
                        <Card elevation={3} >
                            <CardMedia
                                component="img"
                                height="200"
                                image="math-card-background.jpg"
                                alt="mathematics"
                            />
                            <CardContent>
                                <Typography variant="body" color="textSecondary">
                                    {quiz.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                
            ))}
            </Grid>
            <Button
                color="secondary" 
                variant="contained"
                onClick={createQuiz}
                sx={{ mt: 2 }}
                >
                Create Quiz
            </Button>
        </Container>
    );
}
 
export default Temp3;