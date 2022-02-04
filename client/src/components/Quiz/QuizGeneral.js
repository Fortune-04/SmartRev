import React, {useState, useEffect} from 'react';
import QuizFinder from '../../apis/QuizFinder';

//Material UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

const QuizSubList = ({sub}) => {

    //Admin ID
    const id = 14

    //Output
    const [quizes, setQuizes] = useState([]);
    const [subject, setSubject] = useState('')
    
    useEffect(() => {
        
        const fetchQuiz = async () => {
            try {
                const response = await QuizFinder.get(`/display/${id}/${sub}`)
                setQuizes(response.data.data.quiz)
                setSubject(response.data.data.quiz[0].subject)
                console.log(response)
              } catch (err) {
                console.log(err)
            }
        }

        if(id && sub){
            fetchQuiz();
        }
        
    },[id, sub])

    return ( 
        <Container size="sm">
            <Typography
                variant="h6" 
                color="textSecondary"
                component="h2"
                gutterBottom
            >
                {subject.charAt(0).toUpperCase()+subject.slice(1)}
            </Typography>
            <Divider />
            <Grid container sx={{mt:1}} spacing={2}>
            {quizes && quizes.map(quiz => (
                // <Grid item xs={12} md={6} lg={3} sx={{mt:2}} key={quiz.quizid} >
                <Grid item lg={3} md={3} xs={3} key={quiz.quizid}>
                    <Link href={`http://localhost:3000/quiz/quizes4/${quiz.quizid}/${quiz.subject}`}  underline="none">
                        <Card elevation={3} >
                            <CardMedia
                                component="img"
                                height="200"
                                image="/math-card-background.jpg"
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
        </Container>
    );
}
 
export default QuizSubList;